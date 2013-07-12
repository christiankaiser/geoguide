Ext.define('gsetrack.view.ThemeList', {
    extend: 'Ext.navigation.View',
    xtype: 'themelist',
    id: 'themelist',
    config: {
        title: 'Thèmes',
        defaultBackButtonText: 'Retour',
        items: [{
            xtype: 'list',
            title: 'Thèmes',
            itemTpl: '<table><tr><td style="padding: 5px; padding-right: 10px;"><img src="resources/icons/icon-theme-{code}.png" height="70" width="100" /></td><td>{name}</td></tr></table>',
            store: 'Themes',
        }],
    }
});
