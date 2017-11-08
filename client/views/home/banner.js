/**
 * Created by houpeng on 2017/10/30.
 */

Template.banner.helpers({
    img0: function () {
        var images = orion.dictionary.get('site.banner');

        return typeof images !== 'undefined' ? images[0] : {};
    },
    img1: function () {
        var images = orion.dictionary.get('site.banner');
        return typeof images !== 'undefined' ? images[1] : {};
    },
    img2: function () {
        var images = orion.dictionary.get('site.banner');
        return typeof images !== 'undefined' ? images[2] : {};
    }
})

Template.banner.onRendered(function () {

    $('.banner').slick({
        dots: true,
        arrows: false,
        fade: true,
        infinite: true,
        centerMode: true,
        speed: 2000,
        autoplaySpeed: 6000,
        autoplay: true
    });

});
