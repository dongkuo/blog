const marked = require('./marked')
const katex = require('katex')
const highlight = require('highlight.js')
const renderer = new marked.Renderer();

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
    return highlight.highlightAuto(code).value
  },
  tex: true
})

renderer.image = function (href, title, text) {
  return "<figure><img src=" + href + " title='" + text + "'/><figcaption>" + text + "</figcaption></figure>";
};

renderer.inlineTex = function (tex) {
  try {
    return katex.renderToString(tex);
  } catch (e) {
    console.error(e.stack)
  }
  return '$' + tex + '$'
}

renderer.blockTex = function (tex) {
  try {
    return "<p class='katex-block'>" + katex.renderToString(tex) + "</p>";
  } catch (e) {
    console.error(e.stack)
  }
  return '$$' + tex + '$$'
}

module.exports = marked
