listPostesViews = {};

Ext.define('gsetrack.view.PosteList', {
    extend: 'Ext.Panel',
    xtype: 'postelist',
    id: 'postelist',
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
        myPosteListView = this;
        //var myPosteListItems = [];
        if (typeof(data.postes) == 'undefined') data.postes = Ext.create('gsetrack.store.Postes');
        this.add({
            xtype: 'list',
            store: data.postes,
            itemTpl: '<table><tr><td style="padding: 5px; padding-right: 10px;"><img src="resources/icons/icon-poste-{no}.png" height="20" width="20" /></td><td>{lieu}<br /><span style="font-size: 14px;">{accroche}</span></td></tr></table>',
        });
        //for (var i=0; i < data.postes.data.all.length; i++) {
            //var posteData = data.postes.data.all[i].data;
            //myPosteListItems.push({
                //xtype: 'posteDetails',
                //data: posteData,
                //level: 0,
                //parentRef: myPosteListView,
            //});
            
            //// Adding the details
            //for (var j=0; j < posteData.contenu.length; j++) {
                //var lvl = j+1;
                //myPosteListItems.push({
                    //xtype: 'posteDetails',
                    //data: posteData,
                    //level: lvl,
                    //showNext: (lvl < posteData.contenu.length),
                    //parentRef: myPosteListView,
                //});
            //}
        //}
        
        //this.setItems(myPosteListItems);
    },
    
    createPosteView: function(posteId) {
        if (typeof(data.postes) == 'undefined') data.postes = Ext.create('gsetrack.store.Postes');
        var posteData = data.postes.poste(posteId);
        
        // check if view has already been created
        var viewId = posteData.no + '-0';
        if (typeof(listPostesViews[viewId]) != 'undefined') return;
        
        // add first the 0-level information
        this.add({
            xtype: 'posteDetails',
            data: posteData,
            level: 0,
            parentRef: myPosteListView,
        });
        // save position of view in the posteList items list
        listPostesViews[viewId] = myPosteListView.getItems().length - 1;
        
        // add the details
        for (var j=0; j < posteData.contenu.length; j++) {
            var lvl = j + 1;
            this.add({
                xtype: 'posteDetails',
                data: posteData,
                level: lvl,
                showNext: (lvl < posteData.contenu.length),
                parentRef: myPosteListView,
            });
            viewId = posteData.no + '-' + lvl;
            listPostesViews[viewId] = myPosteListView.getItems().length - 1;
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
        return listPostesViews[viewId];
    },
    
    setPosteView: function(viewId) {
        this.setActiveItem(listPostesViews[viewId]);
    },
    
});
