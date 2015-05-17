module.exports = (function() {
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/xcode");
    editor.getSession().setMode("ace/mode/markdown");

    editor.modes = require('./mode.js');
    editor.themes = require('./theme.js');
    return editor;
})();
