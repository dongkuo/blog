const marked = require('marked')
const katex = require('katex')
const highlight = require('highlight.js')

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

function renderMathsExpression(expr) {
  if (expr[0] !== '$' || expr[expr.length - 1] !== '$') {
    return null
  }
  let displayStyle = false
  expr = expr.substring(1, expr.length - 1)
  if (expr[0] === '$' && expr[expr.length - 1] === '$') {
    displayStyle = true
    expr = expr.substring(1, expr.length - 1)
  }
  expr = expr.trim()
  if (!expr) {
    return null
  }
  let html = null
  try {
    html = katex.renderToString(expr)
  } catch (e) {
    console.error(e)
  }
  if (displayStyle && html) {
    html = html.replace(/class="katex"/g, 'class="katex katex-block"')
  }
  return html
}

const originParagraph = new marked.Renderer().paragraph

marked.use({
  renderer: {
    image: (href, title, text) => {
      return `<figure><img src="${href}" alt="${text}" title="${text}"><figcaption>${text}</figcaption></figure>`
    }, paragraph: (text) => {
      const blockRegex = /\$\$[^$]*\$\$/g
      const inlineRegex = /\$[^$]*\$/g
      let blockExprArray = text.match(blockRegex)
      let inlineExprArray = text.match(inlineRegex)
      for (let i in blockExprArray) {
        const expr = blockExprArray[i]
        const result = renderMathsExpression(expr)
        text = text.replace(expr, result)
      }
      for (let i in inlineExprArray) {
        const expr = inlineExprArray[i]
        const result = renderMathsExpression(expr)
        text = text.replace(expr, result)
      }
      return originParagraph(text)
    }
  }
})

module.exports = marked.parse