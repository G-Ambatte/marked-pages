export default function(options = { enable: true, regex: /^\\page$/gm }) {
  // extension code here
  if (!options.enable) return false;

  let pageNumber = 0;
  return {
    extensions: [
      {
        name: 'pageBlock',
        level: 'block',
        // start(src) { return options.regex.exec(src); },
        tokenizer(src, tokens) {
          const pageArray = src.split(options.regex);
          pageNumber++;

          const token = {
            type: 'pageBlock',
            raw: pageArray[0] + '\n\\page',
            text: pageArray[0],
            pageNumber,
            tokens: []
          };

          this.lexer.inline(token.text, token.tokens);

          return token;
        },
        renderer(token) {
          return `<div class='page' id='p${token.pageNumber}'>\n${this.parser.parse(token.tokens)}</div>`;
        }
      }
    ]
  };
}
