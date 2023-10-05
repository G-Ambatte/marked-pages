export default function(options = { enable: true, term: '\\\\page' }) {
  // extension code here
  if (!options.enable) return false;

  if (!options.regex) {
    options.regex = new RegExp(options.term, 'gm');
  }

  let pageNumber = 0;
  return {
    options() { return options; },
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
            raw: pageArray[0] + options.term,
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
