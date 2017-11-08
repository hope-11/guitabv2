/**
 * Created by houpeng on 2017/10/13.
 */

FlowRouter.route('/', {
    name: 'home',
    action: function () {
        BlazeLayout.render('layout', {top: 'header', banner: 'banner', main: 'home'});
    }
});

FlowRouter.route('/notations', {
    name: 'notations',
    action: function () {
        BlazeLayout.render('layout', {top: 'header', main: 'notationsList'});
    }
});

FlowRouter.route('/notations/:notationId', {
    name: 'notations',
    action: function () {
        BlazeLayout.render('layout', {top: 'header', main: 'notationItem'});
    }
})

FlowRouter.route('/chords', {
    name: 'chords',
    action: function () {
        BlazeLayout.render('layout', {top: 'header', main: 'chordsList'});
    }
});

