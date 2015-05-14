var Vue = require('vue');
var marked = require('./marked.js');

var app = new Vue({
    el: '#markdown',
    data: {
        text: ''
    },
    methods: {
        replaceTab: function(e) {
            e.preventDefault();
            var elem = e.target;
            start = elem.selectionStart;
            end = elem.selectionEnd;
            value = elem.value;
            elem.value = "" + (value.substring(0, start)) + "\t" + (value.substring(end));
            elem.selectionStart = elem.selectionEnd = start + 1;
        }
    },
    filters: {
        marked: marked
    }
});
