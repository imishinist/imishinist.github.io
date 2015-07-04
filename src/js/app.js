var marked = require('./marked.js');
var langFiles = require('./lang.js');
var Editor = require('./editor.js');

var app = new Vue({
  el:         '#markdown',
  data:       {
    text:      '',
    langFiles: langFiles,
    langFile:  localStorage.getItem('langFile') || 'default.css'
  },
  components: {
    'lazy-link': {
      template: '<link rel="stylesheet" href="css/lang/{{file}}">'
    },
    editor:      Editor
  },
  filters:    {
    marked: marked
  },
  created:    function () {
    this.$watch('langFile', function (value) {
      localStorage.setItem('langFile', value);
    });
    this.$on('changedText', function (value) {
      this.text = value;
    }.bind(this));
  }
});

