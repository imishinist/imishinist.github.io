var Vue = require('vue');
var marked = require('./marked.js');
var langFiles = require('./lang.js');

var app = new Vue({
    el: '#markdown',
    data: {
        text: '',
        langFiles: langFiles(),
        langFile: localStorage.getItem('langFile') || 'default.css'
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
        },
        storeLang: function(e) {
            localStorage.setItem("langFile", this.langFile);
        }
    },
    components: {
        'lazy-link': {
            template: '<link rel="stylesheet" href="css/lang/{{file}}">'
        }
    },
    filters: {
        marked: marked
    }
});
