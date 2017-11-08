/**
 * Created by houpeng on 2017/10/1.
 */

let guitarTab = SVG.guitarTab;

SVG.NotationLegatoLine = SVG.invent({
    create: 'path',
    inherit: SVG.Path,
    extend: {
        drawLegatoLine: function (x1, y1, x2, y2) {

            //连音线高度
            let legatoHeight = guitarTab.legatoHeight;

            let pathWidth = 2;
            //曲线数组
            let pathArray = [];

            //如果y1==y2，说明两个音符在一行内
            if (y1 === y2) {

                if ((x2 - x1) < legatoHeight * 4) {
                    legatoHeight = (x2 - x1) / 4;
                    pathWidth = 1;
                }

                //曲线顶点坐标
                let xc = (x1 + x2) / 2;
                let yc = y1 - legatoHeight;

                pathArray.push('M', x1, y1);
                pathArray.push('Q', x1 + legatoHeight, yc, xc, yc);
                pathArray.push('Q', x2 - legatoHeight, yc, x2, y2);
                pathArray.push('Q', x2 - legatoHeight, yc + pathWidth, xc, yc + pathWidth);
                pathArray.push('Q', x1 + legatoHeight, yc + pathWidth, x1, y1);

                //否则，说明第二个音符跳转到下一行，连音曲线需要分两段表示
            } else {
                //第一段曲线顶点在谱子最右
                let xc1 = SVG.guitarTab.pageWidth;
                let yc1 = y1 - legatoHeight;
                //第二段曲线顶点在谱子最左
                let xc2 = SVG.guitarTab.tabHeadWidth();
                let yc2 = y2 - legatoHeight;

                pathArray.push('M', x1, y1);
                pathArray.push('Q', x1 + legatoHeight, yc1, xc1, yc1);
                pathArray.push('L', xc1, yc1 + pathWidth);
                pathArray.push('Q', x1 + legatoHeight, yc1 + pathWidth, x1, y1);

                pathArray.push('M', x2, y2);
                pathArray.push('Q', x2 - legatoHeight, yc2, xc2, yc2);
                pathArray.push('L', xc2, yc2 + pathWidth);
                pathArray.push('Q', x2 - legatoHeight, yc2 + pathWidth, x2, y2);

            }

            this.attr({
                'd': new SVG.Array(pathArray).toString()
            });

            return this;
        }
    },
    construct: {
        legatoLine: function (x1, x2, y1, y2) {
            return this.put(new SVG.NotationLegatoLine).drawLegatoLine(x1, x2, y1, y2);
        }
    }
});

SVG.NotationLegato = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {
        drawLegato: function (x1, y1, x2, y2, type) {

            this.legatoLine(x1, y1, x2, y2);

            return this;
        }
    },
    construct: {
        legato: function (x1, y1, x2, y2, type) {
            return this.put(new SVG.NotationLegato).drawLegato(x1, y1, x2, y2, type);
        }
    }
});