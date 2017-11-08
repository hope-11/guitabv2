/**
 * Created by houpeng on 2017/10/26.
 */

Template.notationItem.onCreated(function () {
    var self = this;
    var notationId = FlowRouter.getParam('notationId');
    self.autorun(function () {
        self.subscribe('notationById', notationId);
        self.subscribe('artistsList');
        self.subscribe('chordsList');
    });
});

Template.notationItem.helpers({
    notation: function () {
        var notationId = FlowRouter.getParam('notationId');
        var notation = Notations.findOne({_id: notationId}) || {};

        return notation;
    },

    singersStr: function () {
        var notation = this;
        var ids = notation.artists.singers;
        var str = '';

        ids.forEach(function (id) {
            var artist = Artists.findOne({_id: id}) || {};
            str += artist.name + ' ';
        });

        return str.trim();
    },

    lyricsesStr: function () {
        var notation = this;
        var ids = notation.artists.lyricses;
        var str = '';

        ids.forEach(function (id) {
            var artist = Artists.findOne({_id: id}) || {};
            str += artist.name + ' ';
        });

        return str.trim();
    },

    composersStr: function () {
        var notation = this;
        var ids = notation.artists.composers;
        var str = '';

        ids.forEach(function (id) {
            var artist = Artists.findOne({_id: id}) || {};
            str += artist.name + ' ';
        });

        return str.trim();
    },

    tonal0Str: function () {
        var tonal = this.tab.keyofs[0].tonal;
        var str = '';

        tonal.forEach(function (t) {
            str += t + '转';
        });

        return str.slice(0, str.length - 1);
    },

    tonal1Str: function () {
        var keyofs = this.tab.keyofs;
        if (keyofs.length === 2) {
            var tonal = keyofs[1].tonal;
            var str = '';

            tonal.forEach(function (t) {
                str += t + '转';
            });

            return str.slice(0, str.length - 1);
        } else {
            return false;
        }
    },

    capo0Str: function () {
        return this.tab.keyofs[0].capo;
    },

    capo1Str: function () {
        return this.tab.keyofs[1].capo;
    }
});
