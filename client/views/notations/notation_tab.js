/**
 * Created by houpeng on 2017/10/28.
 */

Template.notationTab.onRendered(function () {

    var beatPerBar = this.data.tab.rhythm.beatPerBar;
    var notePerBeat = this.data.tab.rhythm.notePerBeat;

    var barsStr = this.data.tab.bars;
    var bars = JSON.parse(barsStr);

    bars.forEach(function (bar) {
        var guitars = bar.guitars;
        for (var i = 0, n = guitars.length; i < n; i++) {
            var notes = guitars[i];
            notes.forEach(function (note) {
                var chordTitle = note.chord;

                if (typeof chordTitle !== 'undefined') {
                    var chord = Chords.findOne({title: chordTitle}) || {};
                    note.chord = chord;
                }
            })
        }
    });

    var guitarData = {
        beatPerBar: beatPerBar,
        notePerBeat: notePerBeat,
        bars: bars
    };


    var pageWidth = $('#drawing').width();

    var draw = SVG('drawing');

    var tab = draw.tab(guitarData, pageWidth, 4);

    draw.size(pageWidth, tab.height);

});