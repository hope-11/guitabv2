/**
 * Created by houpeng on 2017/9/29.
 */

let guitarTab = SVG.guitarTab;

SVG.GuitarNote = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {
        /**
         * 绘制x样式的击弦图形
         * @param x
         * @param y
         * @returns {SVG.GuitarNote}
         */
        pickX: function (x, y) {

            let height = guitarTab.pickHeight * 0.8;
            let lineStroke = guitarTab.lineStroke;

            //绘制两条交叉线
            this.line(x - height / 2, y - height / 2, x + height / 2, y + height / 2).stroke(lineStroke);
            this.line(x - height / 2, y + height / 2, x + height / 2, y - height / 2).stroke(lineStroke);

            return this;
        },

        /**
         * 绘制数字样式的击弦图形
         * @param x
         * @param y
         * @param num
         * @returns {SVG.GuitarNote}
         */
        pickNum: function (x, y, num) {

            let numFont = guitarTab.pickNumFont;

            //绘制文字，并将文字上移半个字高
            this.text(num + '')
                .font(numFont)
                .fill('#000')
                .move(x, y - numFont.size / 2);

            return this;
        },

        /**
         * 绘制击弦样式的击弦图形
         * @param x
         * @param y
         * @returns {SVG.GuitarNote}
         */
        pickSlap: function (x, y) {

            //外圈宽度
            let width = guitarTab.pickHeight * 0.8;
            //外圈高度
            let height = guitarTab.pickHeight * 2 * 0.8;
            let lineStroke = guitarTab.lineStroke;
            //外圈举行圆角半径
            let r = width / 2;

            //绘制外圈圆角矩形
            this.rect(width, height)
                .stroke(lineStroke)
                .fill({color: '#fff', opacity: 0})
                .radius(r)
                .move(x - width / 2,  y - height / 2);

            //绘制圈内交叉线
            this.line(x - width / 2, y - height / 2 + r, x + width / 2, y + height / 2 - r).stroke(lineStroke);
            this.line(x - width / 2, y + height / 2 - r, x + width / 2, y - height / 2 + r).stroke(lineStroke);

            return this;
        },

        /**
         * 扫弦样式
         * @param x
         * @param y
         * @param length 线长
         * @returns {SVG.GuitarNote}
         */
        sweepStyle: function (x, y, length) {

            let lineStroke = guitarTab.lineStroke;
            //绘制一条直线
            this.line(x, y, x, y + length).stroke(lineStroke);

            return this;
        },

        /**
         * 琶音样式
         * @param x
         * @param y
         * @param length 线长
         * @returns {SVG.GuitarNote}
         */
        rassStyle: function (x, y, length) {
            //曲线单边宽度
            let rassWidth = guitarTab.pickHeight / 6;
            //曲线每小节高度
            let rassHeight = guitarTab.pickHeight / 6;
            let lineStroke = guitarTab.lineStroke;

            //定义曲线路径数组
            let pathArray = [];
            //曲线起点
            pathArray.push('M', x, y);
            //二次贝塞尔曲线第一段
            pathArray.push('Q', x + rassWidth, y + rassHeight, x, y + rassHeight * 2);
            //重复二次贝塞尔曲线，直到达到定义高度
            for (let i = 4, n = length / rassHeight; i <= n; i+=2){
                pathArray.push('T', x, y + rassHeight * i);
            }

            //绘制此二次贝塞尔曲线
            this.path(pathArray)
                .fill('none')
                .stroke(lineStroke);

            return this;
        },

        /**
         * 箭头样式
         * @param x
         * @param y
         * @param length 线长
         * @param up Boolean类型，true为向上，false为向下
         * @returns {SVG.GuitarNote}
         */
        arrowStyle: function (x, y, length ,up) {
            //箭头单边宽度
            let arrowWidth = guitarTab.pickHeight / 4;
            //箭头高度
            let arrowHeight = guitarTab.pickHeight / 2;
            let lineStroke = guitarTab.lineStroke;

            if (up) {
                //绘制向上箭头
                this.line(x, y, x - arrowWidth, y + arrowHeight).stroke(lineStroke);
                this.line(x, y, x + arrowWidth, y + arrowHeight).stroke(lineStroke);
            } else {
                //绘制向下箭头
                this.line(x, y + length, x - arrowWidth, y + length - arrowHeight).stroke(lineStroke);
                this.line(x, y + length, x + arrowWidth, y + length - arrowHeight).stroke(lineStroke);
            }

            return this;
        },

        /**
         * 绘制扫弦图形
         * @param x
         * @param y
         * @param sweep 'sweep'为扫弦，'rass'为琶音，如果有其他值则默认为扫弦
         * @param step 跨step个弦位
         * @param up Boolean类型，true为向上，false为向下
         * @returns {SVG.GuitarNote}
         */
        pickSweep: function (x, y, sweep, step, up) {
            //线长
            let length = guitarTab.pickHeight * step;

            switch (sweep) {
                case 'rass':
                    //绘制琶音曲线
                    this.rassStyle(x, y, length);
                    break;
                default:
                    //默认绘制扫弦线
                    this.sweepStyle(x, y, length);
            }

            //绘制箭头，向下扫弦绘制向上箭头，向上扫弦绘制向下箭头
            this.arrowStyle(x, y, length, up);

            return this;
        },

        /**
         * 符杆
         * @param x
         * @param y
         * @returns {SVG.GuitarNote}
         */
        stem: function (x, y) {

            let lineHeight = guitarTab.pickHeight;
            let lineStroke = guitarTab.lineStroke;

            this.line(x, y - lineHeight / 2, x, y + lineHeight / 2).stroke(lineStroke);

            return this;
        },

        /**
         * 浮点
         * @param x
         * @param y
         * @returns {SVG.NotationLink}
         */
        dot: function (x, y) {

            //浮点半径
            let dottedRadius = guitarTab.dottedRadius;

            //绘制圆
            this.circle(dottedRadius * 2)
                .fill('#000')
                .move(x - dottedRadius, y - dottedRadius);

            return this;
        },

        /**
         * 绘制音符
         * @param picks 击弦数组
         * @returns {*}
         */
        drawGuitarNote: function (picks) {

            let height = guitarTab.guitarWireDistance;
            let picksNum = picks.length;

            //音符的x坐标
            let noteX = 0;

            //符杆绘制开关，默认关闭
            let hasStem = false;

            //遍历击弦数组
            for (let j = picksNum - 1; j >= 0; j--) {

                //该击弦图形在乐谱上的y坐标
                let noteY = (picksNum - j - 1) * height;

                //如果数据不存在，则返回原值，否则去除前后空格
                let pick = typeof(picks[j]) === 'undefined' ? picks[j] : picks[j].trim();

                //如果pick值不存在，为空
                if (typeof(pick) === 'undefined' || pick === ''){
                    //判断是否应该绘制符杆，当已经绘制了击弦图形之后才绘制柄
                    if (hasStem) {
                        //绘制符杆
                        this.stem(noteX, noteY);
                    }
                } else {
                    //如果pick值为'X'或'x'
                    if (pick.toUpperCase() === 'X') {

                        //绘制noteX击弦图形
                        this.pickX(noteX, noteY + 0.5);

                        //将音符的坐标挂在到此音符下
                        if (!hasStem) this.position = [noteX, noteY];

                        //关闭符杆绘制开关
                        hasStem = true;

                        //如果pick值为数字
                    } else if (!isNaN(pick)) {
                        //绘制数字图形
                        this.pickNum(noteX, noteY - 1, pick);
                        hasStem = true;

                        //如果pick值为'P'或'p'
                    } else if (pick.toUpperCase() === 'P') {
                        //绘制拍弦图形
                        this.pickSlap(noteX, noteY);
                        hasStem = true;
                        //调到下一根弦才开始绘制柄，否则柄会与拍弦图形交叠
                        j--;

                        //在遍历picks数据时首先遇到的扫弦值是'S'，则说明是向上扫弦，绘制向下箭头
                    } else if (pick === 'S') {
                        //保存当前弦位j为temp，从下一根弦开始继续遍历，寻找's'
                        //let temp = j;
                        for (let k = j - 1; k >= 0; k--) {

                            //找到值's'，即箭头结束位置
                            if (picks[k].trim() === 's') {
                                //绘制向上扫弦箭头，跨k-temp根弦距
                                this.pickSweep(noteX, noteY, 'sweep', j - k, false);
                                //从这里开始绘制符杆
                                j = k;
                                //开启柄绘制开关
                                hasStem = true;
                                //结束并跳出该循环
                                break;
                            }

                        }

                        //在遍历picks数据时首先遇到的扫弦值是's'，则说明是向下扫弦，绘制向上箭头
                    } else if (pick === 's') {
                        for (let k = j - 1; k >= 0; k--) {

                            if (picks[k].trim() === 'S') {
                                this.pickSweep(noteX, noteY, 'sweep', j - k, true);
                                j = k;
                                hasStem = true;
                                break;
                            }

                        }

                        //在遍历picks数据时首先遇到的扫弦值是'R'，则说明是向上琶音，绘制向下箭头
                    } else if (pick === 'R') {
                        for (let k = j - 1; k >= 0; k--) {

                            if (picks[k].trim() === 'r') {
                                this.pickSweep(noteX, noteY, 'rass', j - k, false);
                                j = k;
                                hasStem = true;
                                break;
                            }

                        }

                        //在遍历picks数据时首先遇到的扫弦值是'r'，则说明是向下琶音，绘制向上箭头
                    } else if (pick === 'r') {
                        for (let k = j - 1; k >= 0; k--) {

                            if (picks[k].trim() === 'R') {
                                this.pickSweep(noteX, noteY, 'rass', j - k, true);
                                j = k;
                                hasStem = true;
                                break;
                            }

                        }
                    }

                }

            }

            this.stem(noteX, height * 6);

            return this;
        },

        /**
         * 吉他音符符尾
         * @param x
         * @param y
         * @param length    符尾长度，0为曲线符尾，正值为向右画横线，负值为向左画横线
         * @param timer     音符时值，用来确定绘制几条符尾
         */
        drawGuitarNoteHook: function (x, y, length, timer) {

            //符尾数量
            let noteHookNum = guitarTab.noteHookNum(timer);

            if (length === 0) {
                //无连接线符尾


                //避免浮点绘制出错
                length = 1;
            } else {

                for (let j = 0; j < noteHookNum; j++) {
                    //符尾横线
                    this.line(x, y, x + length, y).stroke({width: guitarTab.guitarNoteHookWidth});
                    //Y坐标上移
                    y -= guitarTab.guitarNoteHookDistance;
                }

            }

            if (guitarTab.isDottedNote(timer)) {
                //浮点
                this.dot(x + guitarTab.dotDistance * length / Math.abs(length), y);
            }

            return this;
        }
    },
    construct: {
        guitarNote: function (picks) {
            return this.put(new SVG.GuitarNote).drawGuitarNote(picks);
        },
        guitarNoteHook: function (x, y, length, hookNum) {
            return this.put(new SVG.GuitarNote).drawGuitarNoteHook(x, y, length, hookNum);
        }
    }
});
