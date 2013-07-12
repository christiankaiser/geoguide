var data = {};      // global variable for data stores

Ext.define('gsetrack.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Map',
        'Ext.Carousel',
        'Ext.List',
        'gsetrack.view.TrackInfo',
        'gsetrack.view.PosteList',
        'gsetrack.view.ThemeList',
        'gsetrack.view.AutreList',
        'gsetrack.view.LeafletMap',
        'gsetrack.view.MapView',
        'gsetrack.view.PosteDetails',
        'gsetrack.view.ThemeDetails',
        'gsetrack.view.AutreDetails',
    ],
    config: {
        tabBarPosition: 'bottom',
        id: 'mainview',
        items: [
            {
                xtype: 'trackinfo',
            },
            {
                title: 'Parcours',
                iconCls: 'parcours',
                items: [{
                    xtype: 'mapview',
                    height: '100%',
                }]
            },
            {
                title: 'Postes',
                iconCls: 'postes',
                items: [{
                    xtype: 'postelist',
                    height: '100%',
                }]
            },
            {
                title: 'Thèmes',
                iconCls: 'themes',
                items: [{
                    xtype: 'themelist',
                    height: '100%',
                }]
            },
            {
                title: 'Autres',
                iconCls: 'more',
                items: [{
                    xtype: 'autrelist',
                    height: '100%',
                }],
            }
        ]
    },
    initialize: function() {
        this.callParent();
        var t1 = new Date();
        var startupTime = (t1.getTime() - t0.getTime()) / 1000;
        console.log('startup time: ' + startupTime + ' seconds');
    },
});
