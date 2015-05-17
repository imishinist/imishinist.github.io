module.exports = (function() {
    var marked = require('marked');
    var hl = require('highlight.js');
    var renderer = new marked.Renderer();

    hl.initHighlightingOnLoad();
    renderer.link = function(href, title, text) {
        return '<a href="' + href + '" target="_blank">' + text + '</a>';
    }

    marked.setOptions({
        renderer: renderer,
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false,
        langPrefix: '',
        highlight: function(code) {
            return hl.highlightAuto(code).value;
        }
    });
    return marked;
})();
