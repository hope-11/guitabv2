/**
 * Created by houpeng on 2017/9/29.
 */

let guitarTab = SVG.guitarTab;

SVG.Wire = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {

        /**
         * 大括号顶端
         * @param x
         * @param y
         * @returns {SVG.Wire}
         */
        bracketTop: function (x, y) {

            let wireDistance = guitarTab.guitarWireDistance;

            //大括号顶端绘图路径数组
            let bracketTopPathArray = [];

            bracketTopPathArray.push('M', x, y);
            bracketTopPathArray.push('q', wireDistance * 2/3, - wireDistance / 6, wireDistance, - wireDistance / 3);
            bracketTopPathArray.push('q', - wireDistance / 2, wireDistance / 2, - wireDistance, wireDistance * 2/3);

            this.path(bracketTopPathArray);

            return this;

        },

        /**
         * 大括号底端
         * @param x
         * @param y
         * @returns {SVG.Wire}
         */
        bracketBottom: function (x, y) {

            let wireDistance = guitarTab.guitarWireDistance;

            //大括号底端曲线数组
            let bracketBottomPathArray = [];

            bracketBottomPathArray.push('M', x, y);
            bracketBottomPathArray.push('q', wireDistance * 2/3, wireDistance / 6, wireDistance, wireDistance / 3);
            bracketBottomPathArray.push('q', - wireDistance / 2, - wireDistance / 2, - wireDistance, - wireDistance * 2/3);

            this.path(bracketBottomPathArray);

            return this;

        },

        /**
         * 大括号底端
         * @param x
         * @param y
         * @param guitarNum 吉他数量
         * @returns {SVG.Wire}
         */
        bracketLine: function (x, y, guitarNum) {

            let bracketWidth = guitarTab.wireWidth * 3;
            let bracketHeight = guitarTab.tabHeadHeight(guitarNum) + guitarTab.guitarWireDistance * 2;

            this.rect(bracketWidth, bracketHeight).move(x, y);

            return this;
        },

        /**
         * 谱头部竖线
         * @param x
         * @param y
         * @param guitarNum 吉他数量
         * @returns {SVG.Wire}
         */
        tabHeadLine: function (x, y, guitarNum) {

            let bracketWidth = guitarTab.wireWidth;
            let bracketHeight = guitarTab.tabHeadHeight(guitarNum);

            this.rect(bracketWidth, bracketHeight).move(x, y);

            return this;
        },

        /**
         * 弦及文字
         * @param x
         * @param y
         * @param guitarNum 吉他数量
         * @returns {SVG.Wire}
         */
        tabHeadWires: function (x, y, guitarNum) {

            let wireDistance = guitarTab.guitarWireDistance;

            //弦
            for (let i = 0, n = guitarNum; i < n; i++) {

                //起点
                let y0 = y + (guitarTab.guitarTabHeight() + guitarTab.tabDistance()) * i;

                //绘制弦
                for (let j = 0, m = guitarTab.wireNum; j < m; j++) {
                    this.rect(guitarTab.guitarHeadWireLength, guitarTab.wireWidth)
                        .move(x, y0 + wireDistance * j);
                }

                //绘制文字'TAB'
                let tabText = guitarTab.guitarHeadText;
                for (let j = 0, m = tabText.length; j < m; j++) {
                    this.text(tabText.charAt(j)).font(guitarTab.guitarHeadTextFont)
                        .move(x + 18, y0 + guitarTab.guitarHeadTextFont.size * j);
                }
            }

            return this;
        },

        /**
         * 谱头部图形
         * @param x
         * @param y
         * @param guitarNum 吉他数
         * @returns {SVG.Wire}
         */
        drawTabHead: function (x, y, guitarNum) {

            let wireDistance = guitarTab.guitarWireDistance;

            //乐谱起始竖线宽度
            let headLineWidth = guitarTab.wireWidth;
            //乐谱起始竖线高度
            let headLineHeight = guitarTab.tabHeadHeight(guitarNum);

            //绘制大括号顶端
            this.bracketTop(x, y - wireDistance);
            //绘制大括号底端
            this.bracketBottom(x , y + headLineHeight + wireDistance);
            //绘制大括号竖线
            this.bracketLine(x, y - wireDistance, guitarNum);
            //绘制谱头部竖线
            this.tabHeadLine(x + headLineWidth * 6, y, guitarNum);
            //绘制弦及文字'TAB'
            this.tabHeadWires(x + headLineWidth * 6, y, guitarNum);

            return this;
        }

    },

    construct: {
        tabHead: function (x, y, guitarNum) {
            return this.put(new SVG.Wire).drawTabHead(x, y, guitarNum);
        }
    }

});
