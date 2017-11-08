/**
 * Created by houpeng on 2017/10/24.
 */

Meteor.publish('tonals', function () {
    return Tonals.find();
});
