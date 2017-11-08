/**
 * Created by houpeng on 2017/10/25.
 */

Artists = new orion.collection('artists', {
    singularName: '艺术家',
    pluralName: '艺术家',
    title: '艺术家',
    link: {
        title: '艺术家'
    },
    tabular: {
        columns: [
            {data: 'name', title: '姓名'}
        ]
    }
});

Artists.attachSchema(new SimpleSchema({
    name: {
        type: String,
        label: '姓名'
    }
}));