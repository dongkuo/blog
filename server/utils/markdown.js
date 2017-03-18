const marked = require('./marked');
const renderer = new marked.Renderer();
const markdown = {};

renderer.image = function (href, title, text) {
  return "<figure><img src=" + href + " title='" + text + "'/><figcaption>" + text + "</figcaption></figure>";
};

marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  },
  tex: true
});

markdown.parse = function (markdownString) {
  return marked(markdownString);
};

module.exports = markdown;
