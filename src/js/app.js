var marked = require('./marked.js');
var langFiles = require('./lang.js');
var Editor = require('./editor.js');

var app = new Vue({
    el: '#markdown',
    data: {
        text: '',
        langFiles: langFiles,
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
        },
        editor: Editor
    },
    filters: {
        marked: marked
    },
    created: function() {
        this.$on('changedText', function(value) {
            this.text = value;
        }.bind(this));
    }
});

