# leaflet-geojsonfromurl
Leaflet Plugin for loading GeoJSON data directly from a URL

### Usage example

        L.geoJSONFromURL({
            url : <URL>,
            async : true,
            callback : function (layer) {
                console.log(layer.getBounds());
            }
        },{
            // L.GeoJSON standard options
        }).addTo(map);
