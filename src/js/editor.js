module.exports = function() {
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/xcode");
    editor.getSession().setMode("ace/mode/markdown");

    editor.modes = require('./mode.js');
    return editor;
}();
