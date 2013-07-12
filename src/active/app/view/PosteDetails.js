Ext.define('gsetrack.view.PosteDetails', {
    extend: 'Ext.Panel',
    xtype: 'posteDetails',
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
                action: 'previousLevel',
            },{
                align: 'right',
                text: 'Suivant',
                ui: 'forward',
                action: 'nextLevel',
                level: 55,
            },],
        },{
            xtype: 'panel',
            layout: 'vbox',
            scrollable: true,
            items: [{
                    xtype: 'panel',     // for title
                    defaults: {
                        styleHtmlContent: true,
                    },
                    html: 'Titre',
                },{
                    xtype: 'panel',     // for images
                    defaults: {
                        styleHtmlContent: true,
                    },
                },{
                    xtype: 'panel',     // for text information
                    defaults: {
                        styleHtmlContent: true,
                    },
                },{
                    xtype: 'panel',     // for buttons at the bottom of the view
                    defaults: {
                        styleHtmlContent: true,
                    },
                }
            ],
        },
        
        ],
    },
    
    initialize: function() {
        var data = this.config.data || { no: 0, lieu: '', photo_localisation: 'default.jpg', 
            info_localisation: '', theme: null, contenu: ['',]
        };
        var level = this.config.level || 0;
        THS = this;
        var outerViewId = this.config.parentRef.getId();
        var tbar = this.getComponent(0);
        tbar.setTitle('Poste '+data.no);
        
        // set the current level inside the back and next buttons
        var viewId = data.no +'-' + level;
        this.level = viewId;
        
        var nextViewId = data.no +'-' + (level+1);
        if (!Ext.getCmp(outerViewId).hasPosteView(nextViewId)) {
            // hide next level button if there is no more next level
            tbar.getComponent(2).getComponent(0).setHidden(true);
        }
        
        // set content for location
        if (level <= 0) {
            // Set location title
            var locinfo = '<div class="gse-top gse-contenu">';
            locinfo += '<h1>'+data.lieu+'</h1><hr />';
            if (data.theme) locinfo += '<table><tr><td style="width: 100px;"><img src="resources/icons/icon-theme-'+data.theme+'.png" /></td><td>'+themes[data.theme]+'</td></tr></table><hr />';
            locinfo += '</div>';
            this.getComponent(1).getComponent(0).setHtml(locinfo);
            
            // Set location image
            locinfo = '<div class="gse-contenu">';
            if (data.photo_localisation) {
                locinfo += '<img onclick="Ext.getCmp(\''+outerViewId+'\').setPosteView(\''+nextViewId+'\');" style="width: 100%; max-width: 700px;" src="resources/proj/'+ data.photo_localisation[0] +'" />';
                if (data.photo_localisation[1] != '') locinfo += '<p class="copy">' + data.photo_localisation[1] + '</p>';
            }
            locinfo += '</div>';
            this.getComponent(1).getComponent(1).setHtml(locinfo);
            
            // Set location explanations
            locinfo = '<div class="gse-contenu gse-bottom">';
            locinfo += data.info_localisation;
            locinfo += '</div>';
            this.getComponent(1).getComponent(2).setHtml(locinfo);
            
            // Add go next button
            var goNextBtn = new Ext.Button({
                text: 'La suite...',
                ui: 'confirm',
                handler: function() {
                    Ext.getCmp(outerViewId).setPosteView(nextViewId);
                },
                maxWidth: '300px',
                margin: '10px auto 30px auto',
                padding: '10px',
                fontSize: '16px',
            });
            this.getComponent(1).getComponent(3).add(goNextBtn);
        } else {
            var c = data.contenu[level-1];      // Set content for information levels
            
            // Set title
            this.getComponent(1).getComponent(0).setHtml('<div class="gse-top gse-contenu"><h2>' + c.title +'</h2></div>');
            
            // Set illustration(s)
            if (c.illustration) {
                if (c.illustration[0].length == 1) {
                    o = '<div class="gse-contenu" style="margin-bottom: 0px;">';
                    if (typeof(c.illustration[0][0]) != 'string') {    // video...
                        var video_url = 'resources/proj/' + c.illustration[0][0].file;
                        if (c.illustration[0][0].file.substr(0,7) == 'http://') video_url = c.illustration[0][0].file;
                        if (PLATFORM == 'android') {
                            o += '<a href="javascript:loadUrl(\''+video_url.substr(0, video_url.length-3)+'html\');"><img src="resources/proj/' + c.illustration[0][0].poster +'" style="width: 100%; max-width: '+c.illustration[0][0].size[0]+'px;" border="0" /></a>';
                            o += '<br /><a href="javascript:loadUrl(\''+video_url.substr(0, video_url.length-3)+'html\');">Regarder la vidéo</a>';
                        } else {
                            o += '<video id="video" poster="resources/proj/'+c.illustration[0][0].poster +'" autobuffer controls height="'+c.illustration[0][0].size[1]+'" width="'+c.illustration[0][0].size[0]+'"><source src="'+video_url+'"></video>';
                        }
                    } else {
                        o += '<img src="resources/proj/' +c.illustration[0][0]+'" style="width: 100%; max-width: 500px;"/>';
                    }
                    o += '</div>';
                    this.getComponent(1).getComponent(1).setHtml(o);
                } else {
                    o = '<div style="margin-left: 10px; height: 12px;"><span style="font-size: 10px;">' + c.illustration[0].length + " illustrations. Tirer l'image pour voir les autres.</span></div>";
                    this.getComponent(1).getComponent(1).setHtml(o);
                    var imgItems = [];
                    var w = Math.min(Math.min(Ext.Viewport.getWindowWidth() - 30, Ext.Viewport.getWindowHeight() - 30), 800);
                    h = w / 1.5;    // Fixed height / width ratio; don't know how to make this flexible
                    for (var i=0; i < c.illustration[0].length; i++) {
                        imgItems.push({
                            html: '<img src="resources/proj/' +c.illustration[0][i]+'" style="width: '+w+'px; height: '+h+'px;"/>',
                        });
                    }
                    this.getComponent(1).getComponent(1).add(new Ext.Carousel({
                        defaults: { 
                            styleHtmlContent: true,
                        },
                        height: h,
                        width: '100%',
                        items: imgItems,
                    }));
                }
            }

            o = '<div class="gse-contenu gse-bottom">';
            if (c.illustration && c.illustration[1] != '') o += '<p style="margin: 0px;" class="copy">' + c.illustration[1] + '</p>';
            if (c.legend) o += '<p class="legend">' + c.legend + '</p>';
            o += c.text + '</div>';
            this.getComponent(1).getComponent(2).setHtml(o);
        }
    },
    
});

