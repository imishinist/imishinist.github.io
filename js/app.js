/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(5);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var marked = __webpack_require__(2);
	var langFiles = __webpack_require__(3);
	var Editor = __webpack_require__(4);

	var app = new Vue({
	    el: '#markdown',
	    data: {
	        text: '',
	        langFiles: langFiles,
	        langFile: localStorage.getItem('langFile') || 'default.css'
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
	        this.$watch('langFile', function(value) {
	            localStorage.setItem('langFile', value);
	        });
	        this.$on('changedText', function(value) {
	            this.text = value;
	        }.bind(this));
	    }
	});



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (function() {
	    var renderer = new marked.Renderer();

	    hljs.initHighlightingOnLoad();
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (function() {
	    return [ "agate.css",
	            "androidstudio.css",
	            "arta.css",
	            "ascetic.css",
	            "atelier-dune.dark.css",
	            "atelier-dune.light.css",
	            "atelier-forest.dark.css",
	            "atelier-forest.light.css",
	            "atelier-heath.dark.css",
	            "atelier-heath.light.css",
	            "atelier-lakeside.dark.css",
	            "atelier-lakeside.light.css",
	            "atelier-seaside.dark.css",
	            "atelier-seaside.light.css",
	            "atelier-sulphurpool.dark.css",
	            "atelier-sulphurpool.light.css",
	            "codepen-embed.css",
	            "color-brewer.css",
	            "dark.css",
	            "darkula.css",
	            "default.css",
	            "docco.css",
	            "far.css",
	            "foundation.css",
	            "github.css",
	            "googlecode.css",
	            "hybrid.css",
	            "idea.css",
	            "ir_black.css",
	            "kimbie.dark.css",
	            "kimbie.light.css",
	            "magula.css",
	            "mono-blue.css",
	            "monokai.css",
	            "monokai_sublime.css",
	            "obsidian.css",
	            "paraiso.dark.css",
	            "paraiso.light.css",
	            "railscasts.css",
	            "rainbow.css",
	            "solarized_dark.css",
	            "solarized_light.css",
	            "sunburst.css",
	            "tomorrow-night-blue.css",
	            "tomorrow-night-bright.css",
	            "tomorrow-night-eighties.css",
	            "tomorrow-night.css",
	            "tomorrow.css",
	            "vs.css",
	            "xcode.css"
	        ];
	})();


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var modes = __webpack_require__(6);
	var themes = __webpack_require__(7);

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
	    template: __webpack_require__(5)
	});



/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<select v-model=tabsize options=tabs></select><select v-model=mode options=modes></select><select v-model=theme options=themes></select><div id=editor></div>";

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (function() {
	    return [ "a",
	            "abc",
	            "actionscript",
	            "ada",
	            "apache_conf",
	            "applescript",
	            "asciidoc",
	            "assembly_x86",
	            "autohotkey",
	            "batchfile",
	            "c9search",
	            "c_cpp",
	            "cirru",
	            "clojure",
	            "cobol",
	            "coffee",
	            "coldfusion",
	            "csharp",
	            "css",
	            "curly",
	            "d",
	            "dart",
	            "diff",
	            "django",
	            "dockerfile",
	            "dot",
	            "eiffel",
	            "ejs",
	            "elixir",
	            "elm",
	            "erlang",
	            "forth",
	            "ftl",
	            "gcode",
	            "gherkin",
	            "gitignore",
	            "glsl",
	            "golang",
	            "groovy",
	            "haml",
	            "handlebars",
	            "haskell",
	            "haxe",
	            "html",
	            "html_ruby",
	            "ini",
	            "io",
	            "jack",
	            "jade",
	            "java",
	            "javascript",
	            "json",
	            "jsoniq",
	            "jsp",
	            "jsx",
	            "julia",
	            "latex",
	            "lean",
	            "less",
	            "liquid",
	            "lisp",
	            "live_script",
	            "livescript",
	            "logiql",
	            "lsl",
	            "lua",
	            "luapage",
	            "lucene",
	            "makefile",
	            "markdown",
	            "mask",
	            "matlab",
	            "mel",
	            "mips_assembler",
	            "mipsassembler",
	            "mushcode",
	            "mysql",
	            "nix",
	            "objectivec",
	            "ocaml",
	            "pascal",
	            "perl",
	            "pgsql",
	            "php",
	            "plain_text",
	            "powershell",
	            "praat",
	            "prolog",
	            "properties",
	            "protobuf",
	            "python",
	            "r",
	            "rdoc",
	            "rhtml",
	            "ruby",
	            "rust",
	            "sass",
	            "scad",
	            "scala",
	            "scheme",
	            "scss",
	            "sh",
	            "sjs",
	            "smarty",
	            "snippets",
	            "soy_template",
	            "space",
	            "sql",
	            "sqlserver",
	            "stylus",
	            "svg",
	            "tcl",
	            "tex",
	            "text",
	            "textile",
	            "toml",
	            "twig",
	            "typescript",
	            "vala",
	            "vbscript",
	            "velocity",
	            "verilog",
	            "vhdl",
	            "xml",
	            "xquery",
	            "yaml"]
	})();


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (function() {
	    return [ "ambiance",
	            "chaos",
	            "chrome",
	            "clouds",
	            "clouds_midnight",
	            "cobalt",
	            "crimson_editor",
	            "dawn",
	            "dreamweaver",
	            "eclipse",
	            "github",
	            "idle_fingers",
	            "iplastic",
	            "katzenmilch",
	            "kr_theme",
	            "kuroir",
	            "merbivore",
	            "merbivore_soft",
	            "mono_industrial",
	            "monokai",
	            "pastel_on_dark",
	            "solarized_dark",
	            "solarized_light",
	            "sqlserver",
	            "terminal",
	            "textmate",
	            "tomorrow",
	            "tomorrow_night",
	            "tomorrow_night_blue",
	            "tomorrow_night_bright",
	            "tomorrow_night_eighties",
	            "twilight",
	            "vibrant_ink",
	            "xcode"];
	})();


/***/ }
/******/ ]);