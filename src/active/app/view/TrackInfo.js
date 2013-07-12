Ext.define('gsetrack.view.TrackInfo', {
    extend: 'Ext.Panel',
    xtype: 'trackinfo',
    config: {
        title: 'Général',
        iconCls: 'ville',
        iconMask: true,
        styleHtmlContent: true,
        layout: 'fit',
        items: [{
            docked: 'top',
            xtype: 'titlebar',
            title: 'GéoGuide Lausanne',
        },{
            xtype: 'panel',
            scrollable: true,
            html: "<div class=\"x-innerhtml x-html\"><div class=\"gse-contenu\"><h2>Partez à la (re)découverte de Lausanne avec votre GéoGuide!</h2><p>La Faculté des géosciences et de l’environnement de l’Université de Lausanne partage ses sujets de recherche et vous propose de découvrir la ville avec un nouveau regard: les quartiers changent et se développent, les rivières disparues refont surface, le sous-sol des places révèle des mystères, le glacier du Rhône fait pousser des bananes, les toits de Lausanne se retrouvent dans l'eau du Léman...</p><p>L’itinéraire, des bois de Sauvabelin jusqu’à l’UNIL, peut être parcouru en une fois ou par petits tronçons, en fonction du temps à disposition et de vos intérêts. Une trentaine de postes illustrés vous révéleront les relations qui existent entre trois éléments: le climat, l’eau et l’atmosphère; les roches et le relief; la ville et les activités humaines.</p><p>Vous trouverez plus de détails pratiques et une aide à l’utilisation dans l’onglet &laquo;Autres&raquo;.</p><p>Bonne balade!</p></div></div>",
            flex: 1,
        }],
    }
});