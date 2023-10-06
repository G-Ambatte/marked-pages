export default function(options = { enable: true, term: '\\\\page', pageIds: true }) {
  // extension code here
  if (!options.enable) return false;

  /* istanbul ignore else */
  if (!options.regex) {
    options.regex = new RegExp(options.term, 'gm');
  }

  let topLevelBlock = true;
  let pageNumber = 0;
  return {
    options() { return options; },
    extensions: [
      {
        name: 'pageBlock',
        level: 'block',
        start(src) { return topLevelBlock; },
        tokenizer(src, tokens) {
          if (!topLevelBlock) return false;
          const pageArray = src.split(options.regex);
          pageNumber++;

          const token = {
            type: 'pageBlock',
            raw: pageArray[0] + options.term,
            text: pageArray[0],
            pageNumber,
            tokens: []
          };

          topLevelBlock = false;
          this.lexer.blockTokens(token.text, token.tokens);
          topLevelBlock = true;

          return token;
        },
        renderer(token) {
          return `<div class='page' ${options.pageIds ? `id='p${token.pageNumber}'` : ''}>\n${this.parser.parse(token.tokens)}</div>`;
        }
      }
    ]
  };
}
