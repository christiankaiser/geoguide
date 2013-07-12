Ext.define('gsetrack.store.Themes', {
    extend: 'Ext.data.Store',
    config: {
        model: 'gsetrack.model.Theme',
        data: [{
            code: 'AC', name: 'Eau et Climat &lt;-&gt; Relief et Géologie',
            description: "<p>Les formes du relief et les formations géologiques sont liées au rôle de l'eau et du climat. Leur histoire se déroule sur des temps longs, bien au-delà d'une génération humaine.</p><p>Découvrez ici comment les glaciers réagissent aux changements climatiques et comment s'est formé le relief si particulier de Lausanne.</p>",
        },{
            code: 'AB', name: 'Eau et Climat &lt;-&gt; Homme et Société',
            description: "<p>L'eau et l'air pur sont essentiels à la vie. Les activités humaines ne sont cependant pas sans conséquence sur ces précieuses ressources.</p><p>Peut-on lutter contre la pollution de l'air? Comment l'homme utilise-t-il et prend-il soin de l'eau en ville?</p>",
        },{
            code: 'BC', name: 'Homme et Société &lt;-&gt; Relief et Géologie',
            description: "<p>Les roches et les formes du relief accompagnent discrètement notre quotidien: dans les murs de nos maisons, dans les rues presque toujours en pente de Lausanne ou dans le paysage que l'on admire.</p><p>Voyez comment l'homme n'a de cesse d'aménager le relief naturel pour faciliter les transports et le développement de la ville.</p>",
        }]
    }
})