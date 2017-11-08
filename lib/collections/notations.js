/**
 * Created by houpeng on 2017/10/13.
 */

import './tonals';
import './artists';

Notations = new orion.collection('notations', {
    singularName: '吉他谱',
    pluralName: '吉他谱',
    title: '吉他谱',
    link: {
        title: '吉他谱'
    },
    tabular: {
        columns:[
            {data: 'title', title: '歌曲'},
            {data: 'singers', title: '演唱'}
            //orion.attributeColumn('hasMany', 'artists.singers', '演唱')
        ]
    }
});

Notations.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: '曲名'
    },

    artists: {
        type: Object,
        label: '艺术家'
    },
    'artists.singers': orion.attribute('hasMany', {
        label: '演唱',
        optional: true
    }, {
        collection: Artists,
        titleField: 'name',
        publicationName: 'singers'
    }),
    'artists.composers': orion.attribute('hasMany', {
        label: '作曲',
        optional: true
    }, {
        collection: Artists,
        titleField: 'name',
        publicationName: 'composers'
    }),
    'artists.lyricses': orion.attribute('hasMany', {
        label: '作词',
        optional: true
    }, {
        collection: Artists,
        titleField: 'name',
        publicationName: 'lyricses'
    }),

    tab: {
        type: Object,
        label: '曲谱'
    },
    'tab.keyofs': {
        type: [Object],
        label: '原调 & 选调',
        minCount: 1,
        maxCount: 2
    },

    'tab.keyofs.$.tonal': {
        type: [String],
        label: '调',
        autoform: {
            type: 'select2',
            afFieldInput: {
                multiple: true,
                options: function () {
                    //订阅tonals
                    Meteor.subscribe('tonals');

                    var tonals = Tonals.find({}).fetch();

                    var arr = Utils.arrayToSelectOptions(tonals, 'title');

                    return arr;
                }
            }
        }
    },
    'tab.keyofs.$.capo': {
        type: Number,
        label: '变调夹',
        optional: true,
        autoform: {
            type: 'select2',
            afFieldInput: {
                options: function () {
                    var arr = Utils.arrayToSelectOptions(SVG.guitarTab.freds());

                    return arr;
                }
            }
        }
    },
    'tab.rhythm': {
        type: Object,
        label: '节奏'
    },
    'tab.rhythm.beatPerBar': {
        type: Number,
        label: '每小节有几拍',
        defaultValue: 4,
        autoform: {
            type: 'select2',
            afFieldInput: {
                options: function () {
                    return Utils.arrayToSelectOptions(SVG.guitarTab.beats());
                }
            }
        }
    },
    'tab.rhythm.notePerBeat': {
        type: Number,
        label: '几分音符为一拍',
        defaultValue: 8,
        autoform: {
            type: 'select2',
            afFieldInput: {
                options: function () {
                    return Utils.arrayToSelectOptions(SVG.guitarTab.notes());
                }
            }
        }
    },
    'tab.rhythm.tempo': {
        type: Number,
        label: '速度',
        optional: true
    },
    'tab.bars': {
        type: String,
        label: '谱',
        autoform: {
            type: 'textarea',
            rows: 30
        }
    },

    summary: {
        type: String,
        label: '摘要',
        optional: true,
        max: 500,
        autoform: {
            type: 'textarea',
            rows: 5
        }
    },
    source: {
        type: String,
        label: '来源',
        optional: true,
        max: 200
    },

    singers: {
        type: String,
        autoform: {
            omit: true
        },
        autoValue: function () {

            var idArray = this.field('artists.singers').value;
            var singers = '';

            idArray.forEach(function (id) {
                var name = Artists.find(id).fetch()[0].name;

                singers = singers + name + '、';
            });

            return singers.slice(0, singers.length - 1);
        }
    },

    createdAt: orion.attribute('createdAt'),
    createdBy: orion.attribute('createdBy'),
    updatedAt: orion.attribute('updatedAt'),
    updatedBy: orion.attribute('updatedBy')
}));

