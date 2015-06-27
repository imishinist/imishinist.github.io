var modes = require('./mode.js');
var themes = require('./theme.js');

module.exports = Vue.extend({
    data: function() {
        return {
            tabsize: "4",
            tabs: ["2", "4", "8"],
            theme: 'xcode',
            themes: themes,
            mode: 'markdown',
            modes: modes,
            _editor: null
        }
    },
    ready: function() {
        this._editor = (function() {
            var editor = ace.edit("editor");
            editor.setTheme("ace/theme/xcode");
            editor.getSession().setMode("ace/mode/markdown");

            return editor;
        })();

        this.$watch('tabsize', function(value, mutation) {
            this._editor.getSession().setTabSize(value);
        }.bind(this));

        this.$watch('mode', function(value, mutation) {
            this._editor.getSession().setMode('ace/mode/' + value);
        }.bind(this));

        this.$watch('theme', function(value, mutation) {
            this._editor.setTheme('ace/theme/' + value);
        }.bind(this));

        this._editor.on('change', function() {
            this.$dispatch('changedText', this._editor.getSession().getValue());
        }.bind(this));
    },
    template: require('./templates/editor.html')
});

