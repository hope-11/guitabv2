
/**
 * Created by houpeng on 2017/10/1.
 */

let guitarTab = SVG.guitarTab;

SVG.Tab = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {
        drawTab: function(gtbData, pageWidth, barsInRowNum) {

            //乐谱头部宽度
            let tabHeadWidth = guitarTab.tabHeadWidth();
            //谱间距，吉他谱与吉他谱，吉他谱与简谱
            let tabDistance = guitarTab.tabDistance();
            //吉他谱高度
            let guitarTabHeight = guitarTab.guitarTabHeight();
            //简谱高度
            let numberedTabHeight = guitarTab.numberedTabHeight();
            //和弦高度
            let chordHeight = guitarTab.chordHeight();

            //每一小节的宽度
            let barWidth = (pageWidth - tabHeadWidth) / barsInRowNum;

            //每小节拍数
            let beatPerBar = gtbData.beatPerBar;
            //几分音符为一拍
            let notePerBeat = gtbData.notePerBeat;

            //谱中的小节数
            let barsInTab = gtbData.bars.length;

            //行的绘图起点坐标，默认为乐谱绘图起点坐标
            let rowX = 0;
            let rowY = chordHeight + tabDistance;
            //行间距
            let rowSpace = chordHeight + numberedTabHeight + tabDistance;

            //按行遍历
            for (let rowSerial = 0, rowNum = Math.ceil(barsInTab / barsInRowNum); rowSerial < rowNum; rowSerial++) {

                //初始化小节内吉他数量，默认为1
                let guitarNum = 1;
                //初始化歌词行数，默认为1
                let wordsRowNum = 1;

                //当前行的小节数，默认为定义的每行小节数
                let barsInCurrentRowNum = barsInRowNum;

                //如果是最后一行，当前行的小节数为 总小节数 对 每行小节数 取余
                if (rowSerial === rowNum - 1) {
                    barsInCurrentRowNum = barsInTab % barsInRowNum;
                }

                //遍历一行内的小节，把最大数量的吉他数-1保存到吉他序号
                for (let i = 0; i < barsInCurrentRowNum; i++) {

                    //小节序号
                    let barSerial = rowSerial * barsInRowNum + i;

                    //乐谱小节
                    let bar = gtbData.bars[barSerial];

                    if (guitarNum < bar.guitars.length) {
                        //保存吉他数量
                        guitarNum = bar.guitars.length;
                    }

                    //遍历简谱数据
                    for (let j = 0, m = bar.numbereds.length; j < m; j++) {

                        //当前音符的歌词段落数
                        let currentWordsRowNum = typeof bar.numbereds[j].words === 'undefined' ? wordsRowNum : bar.numbereds[j].words.length;

                        //取最大的音符歌词段落数
                        if (wordsRowNum < currentWordsRowNum) {
                            wordsRowNum = currentWordsRowNum;
                        }
                    }
                    //根据歌词段落数计算行间距
                    rowSpace = chordHeight + numberedTabHeight * wordsRowNum + tabDistance;

                }

                //绘制乐谱头部
                this.tabHead(rowX, rowY, guitarNum);

                //遍历一行内的小节，绘制该行所有小节
                for (let i = 0; i < barsInCurrentRowNum; i++) {

                    //小节序号
                    let barSerial = rowSerial * barsInRowNum + i;

                    //乐谱小节
                    let bar = gtbData.bars[barSerial];

                    //小节每一把吉他的绘图起点坐标
                    let barX = rowX + tabHeadWidth + barWidth * i;
                    let barY = rowY;

                    //按照该行最大吉他数量绘制小节
                    for (let j = 0; j < guitarNum; j++) {

                        //小节内吉他谱的数据
                        let guitar = bar.guitars[j];

                        barY = rowY + (guitarTabHeight + tabDistance) * j;

                        //绘制小节
                        this.guitarBar(barX, barY, barWidth, guitar, beatPerBar, notePerBeat);
                    }

                    let numbereds = bar.numbereds;

                    barY = barY + guitarTabHeight + tabDistance;

                    this.drawNumberedBar(barX, barY, barWidth, numbereds, beatPerBar, notePerBeat);

                }

                //行坐标下移
                rowY = rowY + guitarTab.tabHeadHeight(guitarNum) + rowSpace;

            }
            this.height = rowY;

            return this;
        }
    },
    construct: {
        tab: function (gtbData, pageWidth, barsInRowNum) {
            return this.put(new SVG.Tab).drawTab(gtbData, pageWidth, barsInRowNum);
        }
    }
});
