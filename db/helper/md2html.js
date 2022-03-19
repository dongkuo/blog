const marked = require('marked')
const katex = require('katex')
const highlight = require('highlight.js')
const texExtension = require('./tex-extension')

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: (code, language) => language ? highlight.highlight(code, {language}).value : highlight.highlightAuto(code).value,
})

const {blockTex, inlineTex} = texExtension((tex, level) => {
  let html = katex.renderToString(tex, {displayMode: level === 'block'})
  if (html && level === 'block') {
    html = `<p class="katex-block">${html}</p>`
  }
  return html
})

marked.use({
  renderer: {
    image(href, title, text) {
      return `<figure class="image-wrapper"><img src="${href}" alt="${text}" title="${text}"><figcaption>${text}</figcaption></figure>`
    },
    table(header, body) {
      if (body) {
        body = '<tbody>' + body + '</tbody>'
      }
      return '<div class="table-wrapper">\n' +
        '<table>\n'
        + '<thead>\n'
        + header
        + '</thead>\n'
        + body
        + '</table>\n' +
        '</div>';
    }
  },
  extensions: [blockTex, inlineTex]
})

module.exports = marked.parse