/**
 * Created by houpeng on 2017/10/29.
 */

Template.chordSymbol.onRendered(function () {

    var chord = this.data;

    var element = this.firstNode;

    var draw = SVG(element);

    draw.size(SVG.guitarTab.chordGridWidth() * 2, SVG.guitarTab.chordHeight(chord) + SVG.guitarTab.chordTitleTextFont.size);

    draw.guitarChord(chord).move(SVG.guitarTab.chordGridWidth() / 2, SVG.guitarTab.chordTitleTextFont.size * 1.5);


});