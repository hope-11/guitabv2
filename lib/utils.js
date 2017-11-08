/**
 * Created by houpeng on 2017/10/25.
 */

Utils = {
    arrayToSelectOptions: function (array, field) {
        var arr = [];

        if (typeof field === 'undefined') {
            array.forEach(function (a) {
                arr.push({label: a, value: a});
            });
        } else {
            //console.log(array)
            array.forEach(function (a) {
                arr.push({label: a[field], value: a[field]});
            });
            //console.log(array)
        }

        return arr;
    }
};