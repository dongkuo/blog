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
  let html = katex.renderToString(tex)
  if (html && level === 'block') {
    html = html.replace(/class="katex"/g, 'class="katex katex-block"')
  }
  return html
})

marked.use({
  renderer: {
    image: (href, title, text) => {
      return `<figure><img src="${href}" alt="${text}" title="${text}"><figcaption>${text}</figcaption></figure>`
    }
  },
  extensions: [blockTex, inlineTex]
})

module.exports = marked.parse