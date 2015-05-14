var marked = require('marked');
var renderer = new marked.Renderer();

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
    smartypants: false
});

module.exports = marked;
