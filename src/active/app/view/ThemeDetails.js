Ext.define('gsetrack.view.ThemeDetails', {
    extend: 'Ext.Panel',
    xtype: 'themeDetails',
    config: {
        styleHtmlContent: true,
        layout: 'fit',
        items: [{
            docked: 'top',
            xtype: 'titlebar',
            title: '',
            items: [{
                align: 'left',
                text: 'Retour',
                ui: 'back',
                action: 'backToMap',
            }],
        },{
            xtype: 'panel',
            html: '<p>Info Thème</p>',
            scrollable: true,
            styleHtmlContent: true,
        }],
    },
    
    initialize: function() {
        var data = this.config.data || { code: null, name: '', description: '' };
        var o = '<div class="gse-contenu">';
        o += '<h2>'+ data.name + '</h2>';
        o += '<img src="resources/icons/icon-theme-'+data.code+'.png" style="text-align: center;"/><hr />';
        o += data.description;
        o += '</div>';
        this.getItems().items[1].setHtml(o);
        
        // Remove title bar if needed; set the title otherwise
        if (typeof(this.config.showTitle) == "undefined" || this.config.showTitle == true) {
            this.getItems().items[0].setTitle(data.name);
        } else {
            this.removeAt(0);       // remove title bar
        }
    },
});

