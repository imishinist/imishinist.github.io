var Vue = require('vue');
var marked = require('./marked.js');
var langFiles = require('./lang.js');
var editor = require('./editor.js');
var app = new Vue({
    el: '#markdown',
    data: {
        text: '',
        tabsize: "4",
        tabs: ["2", "4", "8"],
        fontsize: 12,
        mode: 'markdown',
        modes: editor.modes,
        langFiles: langFiles(),
        langFile: localStorage.getItem('langFile') || 'default.css'
    },
    methods: {
        changeMode: function(e) {
            editor.getSession().setMode('ace/mode/' + this.mode);
        },
        changeTabsize: function(e) {
            editor.getSession().setTabSize(this.tabsize);
        },
        changeFontsize: function(e) {
            document.getElementById("editor").style.fontSize = this.fontsize + "px";
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

editor.on('change', function() {
    app.text = editor.getSession().getValue();
});

