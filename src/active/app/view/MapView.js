
var iconSize = 26;
mapPostesViews = {};

Ext.define('gsetrack.view.MapView', {
    extend: 'Ext.Panel',
    xtype: 'mapview',
    id: 'mapview',
    requires: ['gsetrack.store.Postes'],
    config: {
        layout: {
            type: 'card',
            animation: {
                duration: 300,
                easing: 'ease-out',
                type: 'slide',
                direction: 'left',
            }
        },
    },
    
    initialize: function() {
        myMapView = this;
        var mapViewItems = [];
        mapViewItems.push({
            xtype: 'leafletmap',
            useCurrentLocation: true,
            width: '100%',
            height: '100%',
            mapOptions: {
                center: [46.524, 6.633],
                zoom: 12,
                minZoom: 11,
                maxZoom: 17,
                maxBounds: [[46.47, 6.53], [46.58, 6.71]],
            },
            onLoad: function(m){      // callback after creating the map
                var blackRectIcon = L.icon({
                    iconUrl: 'resources/icons/icon-black-rect-40px.png',
                    iconRetinaUrl: 'resources/icons/icon-black-rect-40px.png',
                    iconSize: [12, 12], iconAnchor: [6, 6],
                });
                var metroIcon = L.icon({
                    iconUrl: 'resources/icons/icon-metro.png',
                    iconRetinaUrl: 'resources/icons/icon-metro.png',
                    iconSize: [iconSize, iconSize], iconAnchor: [iconSize/2, iconSize/2],
                })
                
                // for adding the markers for the different posts
                var poste_marker_adder = function(marker, n) {     // closure...
                    marker.on('click', function(e){
                        var viewId = n + '-0';
                        if (typeof(mapPostesViews[viewId]) == 'undefined') {
                            myMapView.createPosteView(n);    // create the given view before display
                        }
                        Ext.getCmp('mapview').setPosteView(viewId);
                    });
                }
                
                for (var i=0; i < stops.length; i++) {
                    var marker = null;
                    if (stops[i].options.type == 'stop') {
                        var posteId = stops[i].options.fid;
                        marker = new L.Marker(stops[i].coords, {
                            icon: L.icon({
                                iconUrl: 'resources/icons/icon-poste-'+posteId+'.png',
                                iconRetinaUrl: 'resources/icons/icon-poste-'+posteId+'.png',
                                iconSize: [iconSize, iconSize],
                                iconAnchor: [iconSize/2, iconSize/2],
                            }),
                            zIndexOffset: stops[i].options.z,
                        });
                        poste_marker_adder(marker, parseInt(posteId));
                    } else if (stops[i].options.type == 'm1') {
                        marker = new L.Marker(stops[i].coords, {icon: metroIcon});
                    } else {
                        marker = new L.Marker(stops[i].coords, {icon: blackRectIcon});
                    }
                    if (marker) marker.addTo(m);
                }
                
                // Adding the track itself
                for (var i=0; i < track1.length; i++) {
                    var l = L.polyline(track1[i].coords, {color: 'red', opacity: 0.5, weight: 5})
                    l.addTo(m);
                }
                for (var i=0; i < track2.length; i++) {
                    var l = L.polyline(track2[i].coords, {color: 'red', opacity: 0.5, weight: 5});
                    l.addTo(m);
                }
                for (var i=0; i < metro_alternative.length; i++) {
                    var l = L.polyline(metro_alternative[i].coords, {color: 'red', opacity: 0.5, weight: 2, dashArray: '5, 3'});
                    l.addTo(m);
                }
                for (var i=0; i < metro.length; i++) {
                    var l = L.polyline(metro[i].coords, {color: '#ff007e'})
                    l.addTo(m);
                }
            }
        });
        this.setItems(mapViewItems);
    },
    
    
    createPosteView: function(posteId) {
        if (typeof(data.postes) == 'undefined') data.postes = Ext.create('gsetrack.store.Postes');
        var posteData = data.postes.poste(posteId);
        
        // check if view has already been created
        var viewId = posteData.no + '-0';
        if (typeof(mapPostesViews[viewId]) != 'undefined') return;
        
        // add first the 0-level information
        this.add({
            xtype: 'posteDetails',
            data: posteData,
            level: 0,
            parentRef: myMapView,
        });
        // save position of view in the mapview items list
        mapPostesViews[viewId] = myMapView.getItems().length - 1;
        
        // add the details
        for (var j=0; j < posteData.contenu.length; j++) {
            var lvl = j + 1;
            this.add({
                xtype: 'posteDetails',
                data: posteData,
                level: lvl,
                showNext: (lvl < posteData.contenu.length),
                parentRef: myMapView,
            });
            viewId = posteData.no + '-' + lvl;
            mapPostesViews[viewId] = myMapView.getItems().length - 1;
        }
    },
    
    hasPosteView: function(viewId) {
        var posteId = viewId.split('-')[0];
        var lvl = parseInt(viewId.split('-')[1]);
        var posteData = data.postes.poste(posteId);
        if (lvl <= posteData.contenu.length) return true;
        return false;
    },
    
    getPosteView: function(viewId) {
        return mapPostesViews[viewId];
    },
    
    setPosteView: function(viewId) {
        this.setActiveItem(mapPostesViews[viewId]);
    },
    
});
