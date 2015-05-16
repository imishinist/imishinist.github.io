var Vue = require('vue');
var marked = require('./marked.js');
var langFiles = require('./lang.js');
var editor = require('./editor.js');
var app = new Vue({
    el: '#markdown',
    data: {
        text: '',
        langFiles: langFiles(),
        langFile: localStorage.getItem('langFile') || 'default.css'
    },
    methods: {
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

editor.on('change', function() {
    app.text = editor.getSession().getValue();
});
