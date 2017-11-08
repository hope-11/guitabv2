/**
 * Created by houpeng on 2017/10/14.
 */


Chords = new orion.collection('chords', {
    name: 'chords',
    singularName: '和弦',
    pluralName: '和弦',
    title: '和弦',
    link: {
        title: '和弦'
    },
    tabular: {
        columns: [
            {data: 'title', title: '名称'},
            //{data: 'symbol', title: '图形', orderable: false},
            orion.attributeColumn('createdAt', 'createdAt', '创建时间'),
            //orion.attributeColumn('createdBy', 'createdBy', '创建人')
        ]
    }
});

Chords.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: '名称',
        unique: true
    },
    startFred: {
        type: Number,
        label: '起始品位',
        defaultValue: 1,
        autoform: {
            type: 'select2',
            options: function () {
                var freds = [];
                for (var i = 1, n = 24; i <= n; i++) {
                    freds.push({label: i, value: i});
                }
                return freds;
            }
        }
    },
    fingers: {
        type: [Object],
        label: '手指',
        maxCount: 5
    },
    'fingers.$.sign': {
        type: Number,
        label: '手指标识',
        autoform: {
            type: 'select-radio-inline',
            options: function (){
                return [
                    {label: "食指（1）", value: 1},
                    {label: "中指（2）", value: 2},
                    {label: "无名指（3）", value: 3},
                    {label: "小指（4）", value: 4},
                    {label: "母指（5）", value: 5}
                ];
            }
        },
        custom: function () {
            //存放手指标识数组
            var signArr = [];

            //fingers域值
            var fingers = this.field('fingers').value;

            //遍历fingers域值
            for (var i = 0, n = fingers.length; i < n; i++) {
                //遍历手指标识数组
                for (var j = 0, m = signArr.length; j < m; j++){
                    //如果手指标识数组中有fingers域值数组中的值
                    if (fingers[i].sign === signArr[j]) {
                        //返回校验
                        return 'sameFingers';
                    }
                }
                //否则，将该值保存到手指标识数组
                signArr.push(fingers[i].sign);
            }
        }
    },
    'fingers.$.fred': {
        type: Number,
        label: '品位',
        autoform: {
            type: 'select-radio-inline',
            options: function (){
                return [
                    {label: "1品", value: 1},
                    {label: "2品", value: 2},
                    {label: "3品", value: 3},
                    {label: "4品", value: 4},
                    {label: "5品", value: 5}
                ];
            }
        }
    },
    'fingers.$.wires': {
        type: [Number],
        label: '弦',
        autoform: {
            type: 'select-checkbox-inline',
            options: function (){
                return [
                    {label: "6弦", value: 6},
                    {label: "5弦", value: 5},
                    {label: "4弦", value: 4},
                    {label: "3弦", value: 3},
                    {label: "2弦", value: 2},
                    {label: "1弦", value: 1}
                ];
            }
        },
        maxCount: 2
    },
    createdAt: orion.attribute('createdAt'),
    createdBy: orion.attribute('createdBy'),
    updatedAt: orion.attribute('updatedAt'),
    updatedBy: orion.attribute('updatedBy')
}));

SimpleSchema.messages({
    'sameFingers': '该手指已定义'
})