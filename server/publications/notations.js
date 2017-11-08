/**
 * Created by houpeng on 2017/10/26.
 */

Meteor.publish('notationsList', function () {
    return Notations.find();
});

Meteor.publish('notationById', function (id) {
    return Notations.find({_id: id});
});