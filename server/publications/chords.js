/**
 * Created by houpeng on 2017/10/17.
 */

Meteor.publish('chordsList', function () {
    return Chords.find();
});

Meteor.publish('chordById', function (id) {
    return Chords.find(id);
});

Meteor.publish('chordByTitle', function (title) {
    return Chords.find({title: title});
})
