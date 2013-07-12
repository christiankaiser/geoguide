Ext.define('gsetrack.view.AutreList', {
    extend: 'Ext.navigation.View',
    xtype: 'autrelist',
    id: 'autrelist',
    config: {
        title: 'Autre',
        defaultBackButtonText: 'Retour',
        items: [{
            xtype: 'list',
            title: 'Autres',
            store: 'Autres',
            itemTpl: '<table style="height: 50px;"><tr><td style="width: 90px; text-align: center;"><img src="resources/icons/{icon}" /></td><td style="padding-left: 20px;">{name}</td></tr></table>',
        }],
    }
});

