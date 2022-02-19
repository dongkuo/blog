module.exports = (texRender) => {
  const blockTex = {
    name: 'blockTex',
    level: 'block',
    start(src) {
      return src.match(/\$\$[\s\n]*/)?.index;
    },
    tokenizer(src, tokens) {
      const rule = /^ *\$\$\n([\s|\S]*?)\n\$\$(?:\n+|$)/;
      const match = rule.exec(src);
      if (match) {
        const token = {
          type: 'blockTex',
          raw: match[0],
          text: match[1],
          tokens: []
        };
        this.lexer.inline(token.text, token.tokens);
        return token;
      }
    },
    renderer(token) {
      return texRender(token.text, 'block');
    }
  };

  const inlineTex = {
    name: 'inlineTex',
    level: 'inline',
    start(src) {
      return src.match(/\$/)?.index;
    },
    tokenizer(src, tokens) {
      const rule = /^\$\s*([\s\S]*?)\s*\$/;
      const match = rule.exec(src);
      if (match) {
        return {
          type: 'inlineTex',
          raw: match[0],
          text: match[1],
        };
      }
    },
    renderer(token) {
      return texRender(token.text, 'inline');
    }
  };

  return {blockTex, inlineTex}
}