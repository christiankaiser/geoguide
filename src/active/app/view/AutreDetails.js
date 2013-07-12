Ext.define('gsetrack.view.AutreDetails', {
    extend: 'Ext.Panel',
    xtype: 'autreDetails',
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
            html: '<p>Info</p>',
            scrollable: true,
            styleHtmlContent: true,
        }],
    },
    
    initialize: function() {
        var data = this.config.data || { name: '', contenu: '' };
        this.title = data.name;
        this.getItems().items[1].setHtml('<div class="gse-contenu">'+data.contenu+'</div>');
        
        // Remove title bar if needed; set the title otherwise
        if (typeof(this.config.showTitle) == "undefined" || this.config.showTitle == true) {
            //this.getItems().items[0].setTitle(data.name);     // don't show title
        } else {
            this.removeAt(0);       // remove title bar
        }
    },
});

