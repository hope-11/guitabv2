/**
 * Created by houpeng on 2017/10/24.
 */

import './chords';

Tonals = new orion.collection('tonals', {
    name: 'tonals',
    singularName: '音调',
    pluralName: '音调',
    title: '音调',
    link: {
        title: '音调'
    },
    tabular: {
        columns: [
            {data: 'title', title: '名称'},
            orion.attributeColumn('hasMany', 'chords.title', '和弦')
        ]
    }
});

Tonals.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: '名称'
    },
    chords: orion.attribute('hasMany', {
        label: '和弦',
        optional: true
    }, {
        collection: Chords,
        titleField: 'title',
        publicationName: 'chords'
    })
}));