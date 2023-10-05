import { marked } from 'marked';
import markedPages from '../src/index.js';

describe('markedPages', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('no options', () => {
    marked.use(markedPages());
    expect(marked('example')).toBe('<div class=\'page\' id=\'p1\'>\n<p>example</p>\n</div>');
  });

  test('markdown not using this extension', () => {
    marked.use(markedPages({ enable: false }));
    expect(marked('**standard markdown**')).toBe('<p><strong>standard markdown</strong></p>\n');
  });

  test('lexer output', () => {
    marked.use(markedPages());
    expect(marked.lexer(' ')[0]).toHaveProperty('type', 'pageBlock');
  });

  test('markdown including \\page', () => {
    marked.use(markedPages());
    expect(marked.parse('\\page')).toBe('<div class=\'page\' id=\'p1\'>\n</div>');
  });

  test('multiple pages - lexer', () => {
    marked.use(markedPages());
    expect(marked.lexer('this is page 1\n\\page\nthis is page 2\n\\page\nthis is page 3')).toHaveLength(3);
  });

  test('multiple pages - parser', () => {
    marked.use(markedPages());
    expect(marked.parse('this is page 1\n\\page\nthis is page 2\n\\page\nthis is page 3')).toBe('<div class=\'page\' id=\'p1\'>\n<p>this is page 1\n</p>\n</div><div class=\'page\' id=\'p2\'>\n<p>this is page 2\n</p>\n</div><div class=\'page\' id=\'p3\'>\n<p>this is page 3</p>\n</div>');
  });
});
