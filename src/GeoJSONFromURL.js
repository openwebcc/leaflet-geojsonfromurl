/*
 * 
 * load GeoJSON data directly from a url
 * 
 */

L.GeoJSONFromURL = L.GeoJSON.extend({
    // set defaults for plugin options
    myOpts: {
        url : null,
        async : true,
        callback : function(layer) {
            return undefined;
        },
    },

    callback: function(geojsondata) {
        // add GeoJSON data
        this.addData(geojsondata);

        // run optional callback
        this.myOpts.callback(this);
    },

    initialize: function(opts, options) {
        // assign plugin options
        for (var o in this.myOpts) {
            if (this.myOpts.hasOwnProperty(o) && opts.hasOwnProperty(o)) {
                this.myOpts[o] = opts[o];
            }
        }

        // call parents constructor
        L.GeoJSON.prototype.initialize.call(this, undefined, options);
    },

    loadURL: function() {
        // get GeoJSON data from given url with XMLHttpRequest
        var self = this;
        var request = new XMLHttpRequest();
        request.open("GET", this.myOpts.url, this.myOpts.async);
        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                self.callback(JSON.parse(this.responseText));
            }
        };
        request.send();
    },

    onAdd: function(map) {
        if (this.myOpts.url) {
            this.loadURL();
        }
    },
});

// add factory function
L.geoJSONFromURL = function(opts, options) {
    return new L.GeoJSONFromURL(opts, options);
};
