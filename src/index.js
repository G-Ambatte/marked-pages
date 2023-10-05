export default function(options = { enable: true, regex: /^\\page$/gm }) {
  // extension code here
  if(!options.enable) return false;

  return {
    extensions: [
      {
        name: 'pageBlock',
        level: 'block',
        start(src) { return options.regex.exec(src); },
        tokenizer(src, tokens) {
          const pageArray = src.split(options.regex);

          const token = {
            type: 'pageBlock',
            raw: pageArray[0] + '\n\\page',
            text: pageArray[0],
            tokens: []
          };

          this.lexer.inline(token.text, token.tokens);

          return token;
        },
        renderer(token) {
            return `<div class='page'>\n${this.parser.parse(token.tokens)}</div>`;
        }
      }
    ]
  }
};
