
// Quite ugly, but don't know how to make a better fix straight now.
var geolocationSuccess = function(geo) {
    if (!LMAP) return;
    LMAP.onGeoUpdate(geo);
};

var geolocationError = function(geo) {
    if (!LMAP) return;
    LMAP.onGeoError();
};


Ext.define('gsetrack.view.LeafletMap', {
    extend: 'Ext.Container',
    xtype : 'leafletmap',
    requires: ['Ext.util.Geolocation'],

    isMap: true,
    config: {
        baseCls: Ext.baseCSSPrefix + 'map',
        useCurrentLocation: false,
        currentLocationMarker: null,
        currentAccuracyCircle: null,
        
        currentLocation: null,  // if current location is used, this contains the coordinates...
        currentAccuracy: null,  // ... and the locational accuracy
        map: null,              // the wrapped map
        geo: null,              // geolocation provider for the map
        mapOptions: {},
        layers: [               // list of default layers
            //L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {})
            L.tileLayer('resources/map/{z}/{x}/{y}.jpg', {})
        ],
        markers: null,
        listeners: {
             orientationchange: function(){ alert('orientation_change'); }
        },
    },

    constructor: function() {
        LMAP = this;
        this.callParent(arguments);
        if (!L) this.setHtml('Leaflet Maps API is required');
    },

    initialize: function() {
        this.callParent();
        this.on({
            painted: 'doResize',
            scope: this
        });
        this.innerElement.on('touchstart', 'onTouchStart', this);
    },

    getElementConfig: function() {
        return {
            reference: 'element',
            className: 'x-container',
            children: [{
                reference: 'innerElement',
                className: 'x-inner',
                children: [{
                    reference: 'mapContainer',
                    className: Ext.baseCSSPrefix + 'map-container'
                }]
            }]
        };
    },

    onTouchStart: function(e) {
        e.makeUnpreventable();
    },

    applyMapOptions: function(options) {
        return Ext.merge({}, this.options, options);
    },

    updateMapOptions: function(newOptions) {
        var me = this,
            map = this.getMap();

        if (L && map) {
            map.setOptions(newOptions);
        }
        if (newOptions.center && !me.isPainted()) {
            me.un('painted', 'setMapCenter', this);
            me.on('painted', 'setMapCenter', this, { delay: 150, single: true, args: [newOptions.center] });
        }
    },

    getMapOptions: function() {
        return Ext.merge({}, this.options || this.getInitialConfig('mapOptions'));
    },

    updateUseCurrentLocation: function(useCurrentLocation) {
        this.setGeo(useCurrentLocation);
        if (!useCurrentLocation) {
            this.setMapCenter();
        }
    },

    applyGeo: function(config) {
        if (Ext.os.is.Android) {
            navigator.geolocation.watchPosition(geolocationSuccess, geolocationError, {
                enableHighAccuracy: true,
                maximumAge: 10000,
                timeout: 5000,
            });
        } else {
            return Ext.factory(config, Ext.util.Geolocation, this.getGeo());
        }
    },

    updateGeo: function(newGeo, oldGeo) {
        var events = {
            locationupdate : 'onGeoUpdate',
            locationerror : 'onGeoError',
            scope : this
        };

        if (oldGeo) {
            oldGeo.un(events);
        }

        if (newGeo) {
            newGeo.on(events);
            newGeo.updateLocation();
        }
    },

    doResize: function() {
        var map = this.getMap();
        if (map) {
            map.invalidateSize();
        } else {
            var mapOptions = this.getMapOptions();
            if (!mapOptions.hasOwnProperty('center')) {
                mapOptions.center = [46.53, 6.6];
            }
            this.setMapCenter(mapOptions.center);
        }
    },

    // @private
    renderMap: function() {
        var me = this,
            element = me.mapContainer,
            mapOptions = me.getMapOptions(),
            map = me.getMap(),
            event;
        
        if (L) {
            mapOptions = Ext.merge({
                zoom: 12,
                center: [46.53, 6.6],
                layers: this.getLayers(),
                attributionControl: false,
            }, mapOptions);

            if (element.dom.firstChild) {
                Ext.fly(element.dom.firstChild).destroy();
            }

            me.setMap(new L.map(element.dom, mapOptions));
            map = me.getMap();
            
            // Add current location marker if required
            if (this.getCurrentLocation() && !this.getCurrentLocationMarker()) {
                this.setLocationMarker(this.getCurrentLocation(), this.getCurrentAccuracy());
            }
            
            if (this.config.onLoad) this.config.onLoad(map);
            me.fireEvent('maprender', me, map);
        }
    },

    // @private
    onGeoUpdate: function(geo) {
        // We need to differentiate if we get the position from  Sencha Touch Geolocation or 
        // from the navigator directly. It seems there is still a bug around with Sencha Touch
        // Geolocation on Android devices.
        var lat = null, lon = null, accuracy = null;
        if (typeof(geo.getAccuracy) == 'undefined') {
            // position comes from navigator directly.
            lat = geo.coords.latitude;
            lon = geo.coords.longitude;
            accuracy = geo.coords.accuracy;
        } else {
            if (!geo.getAllowHighAccuracy()) geo.setAllowHighAccuracy(true);
            lat = geo.getLatitude();
            lon = geo.getLongitude();
            accuracy = geo.getAccuracy();
        }
        this.setCurrentLocation([lat, lon]);
        this.setCurrentAccuracy(accuracy);
        if (lat && lon && accuracy) {
            this.setLocationMarker([lat, lon], accuracy);
        }
    },

    // @private
    onGeoError: Ext.emptyFn,

    setLocationMarker: function(coordinates, accuracy) {
        var map = this.getMap();
        if (L && map) {
            if (!this.getCurrentLocationMarker()) {
                var m = L.marker(coordinates, {
                    icon: L.icon({
                        iconUrl: 'resources/icons/icon-current-location.png',
                        iconRetinaUrl: 'resources/icons/icon-current-location.png',
                        iconSize: [16, 16],
                        iconAnchor: [8, 8],
                    }),
                });
                this.setCurrentLocationMarker(m);
                
                var c = L.circle(coordinates, accuracy);
                this.setCurrentAccuracyCircle(c);
                
                c.addTo(map);
                m.addTo(map);
            } else {
                this.getCurrentLocationMarker().setLatLng(coordinates);
                this.getCurrentAccuracyCircle().setLatLng(coordinates);
                this.getCurrentAccuracyCircle().setRadius(accuracy);
            }
        }
    },

    setMapCenter: function(coordinates) {
        var me = this,
            map = me.getMap();
        if (L) {
            if (!me.isPainted()) {
                me.un('painted', 'setMapCenter', this);
                me.on('painted', 'setMapCenter', this, { delay: 150, single: true, args: [coordinates] });
                return;
            }
            coordinates = coordinates || [46.53, 6.6];
            
            if (!map) {
                me.renderMap();
                map = me.getMap();
            }
            
            if (map) {
                map.panTo(coordinates);
            } else {
                this.options = Ext.apply(this.getMapOptions(), {
                    center: coordinates
                });
            }
        }
    },

    // @private
    onZoomChange : function() {
        console.log('onZoomChange...');
        var mapOptions = this.getMapOptions(),
            map = this.getMap(),
            zoom;

        zoom = (map && map.getZoom) ? map.getZoom() : mapOptions.zoom || 10;

        this.options = Ext.apply(mapOptions, {
            zoom: zoom
        });

        this.fireEvent('zoomchange', this, map, zoom);
    },

    // @private
    onTypeChange : function() {
        console.log('onTypeChange.');
        var mapOptions = this.getMapOptions(),
            map = this.getMap(),
            mapTypeId;

        this.fireEvent('typechange', this, map, mapTypeId);
    },

    // @private
    onCenterChange: function() {
        console.log('onCenterChange...');
        var mapOptions = this.getMapOptions(),
            map = this.getMap(),
            center;

        center = (map && map.getCenter) ? map.getCenter() : mapOptions.center;

        this.options = Ext.apply(mapOptions, {
            center: center
        });

        this.fireEvent('centerchange', this, map, center);

    },

    // @private
    destroy: function() {
        console.log('destroy.');
        Ext.destroy(this.getGeo());
        var map = this.getMap();

        this.callParent();
    }
}, function() {
    //<deprecated product=touch since=2.0>

    /**
     * @cfg {Boolean} maskMap
     * Masks the map
     * @removed 2.0.0 Please mask this components container instead.
     */

    /**
     * @cfg {String} maskMapCls
     * CSS class to add to the map when maskMap is set to true.
     * @removed 2.0.0 Please mask this components container instead.
     */

    /**
     * @method getState
     * Returns the state of the Map.
     * @deprecated 2.0.0 Please use {@link #getMapOptions} instead.
     * @return {Object} mapOptions
     */
    Ext.deprecateClassMethod(this, 'getState', 'getMapOptions');

    Ext.deprecateClassMethod(this, 'update', 'setMapCenter');

    //</deprecated>
});
