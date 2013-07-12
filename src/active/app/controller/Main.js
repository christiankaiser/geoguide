Ext.define('gsetrack.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            posteList: 'postelist',
            themeList: 'themelist',
            autreList: 'autrelist',
        },
        control: {
            'postelist list': {
                itemtap: 'showPoste',
            },
            'themelist list': {
                itemtap: 'showTheme',
            },
            'autrelist list': {
                itemtap: 'showAutre',
            },
            'button[action=previousLevel]': {
                tap: 'previousLevel',
            },
            'button[action=nextLevel]': {
                tap: 'nextLevel',
            },
        }
    },
    
    
    showPoste: function(list, index, element, record) {
        var viewId = (index+1) +'-0';
        if (typeof(listPostesViews[viewId]) == 'undefined') myPosteListView.createPosteView(index+1);
        myPosteListView.setPosteView(viewId);
    },
    
    showTheme: function(list, index, element, record) {
        this.getThemeList().push({
            xtype: 'themeDetails',
            data: record.data,
            title: '',
            showTitle: false,
        })
    },
    
    showAutre: function(list, index, element, record) {
        this.getAutreList().push({
            xtype: 'autreDetails',
            data: record.data,
            title: '',
            showTitle: false,
        })
    },
    
    previousLevel: function(me) {
        var currentViewId = me.parent.parent.parent.level.split('-');
        var posteNo = parseInt(currentViewId[0]);
        var level = parseInt(currentViewId[1]);
        var parentView = me.parent.parent.parent.getParent();
        var actItem = 0;
        if (level > 0) {
            var viewId = posteNo +'-'+ (level-1);
            actItem = parentView.getPosteView(viewId);
        }
        var anim = parentView.layout.getAnimation();
        anim.setDirection('right');
        parentView.setActiveItem(actItem);
        anim.setDirection('left');
    },
    
    nextLevel: function(me) {
        var currentViewId = me.parent.parent.parent.level.split('-');
        var posteNo = parseInt(currentViewId[0]);
        var level = parseInt(currentViewId[1]);
        var viewId = posteNo +'-'+ (level+1);
        var parentView = me.parent.parent.parent.getParent();
        parentView.setPosteView(viewId);
    },
    
});
