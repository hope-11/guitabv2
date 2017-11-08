/**
 * Created by houpeng on 2017/10/20.
 */

Template.notationsList.onCreated(function () {
    var self = this;
    self.autorun(function () {
        self.subscribe('notationsList');
    });
});

Template.notationsList.helpers({
    notations: function () {

        var notations = Notations.find({}).fetch();

        return notations;
    },

    pathForNotation: function () {
        var notation = this;
        var params = {
            notationId: notation._id
        };
        var queryParams = {};
        var routeName = 'notations';
        var path = FlowRouter.path(routeName, params, queryParams);

        return path;
    }
});