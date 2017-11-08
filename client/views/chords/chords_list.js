/**
 * Created by houpeng on 2017/10/17.
 */

Template.chordsList.onCreated(function () {
    var self = this;
    self.autorun(function () {
        self.subscribe('chordsList');
    });
});

Template.chordsList.helpers({
    chords: function () {

        var chords = Chords.find({}, {sort: {createdAt: -1}}).fetch();

        return chords;
    }
});
