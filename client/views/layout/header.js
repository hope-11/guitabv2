/**
 * Created by houpeng on 2017/10/20.
 */

Template.header.helpers({
    activeRouteClass: function () {
        var args = Array.prototype.slice.call(arguments, 0);
        args.pop();

        var active = _.any(args, function (name) {
            return FlowRouter.current() && FlowRouter.current().route.name === name;
        });

        return active && 'active';
    }
});
