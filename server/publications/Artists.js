/**
 * Created by houpeng on 2017/10/27.
 */

Meteor.publish('artistsList', function () {
    return Artists.find();
});

Meteor.publish('artistById', function (id) {
    return Artists.find(id);
});