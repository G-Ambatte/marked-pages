import { marked } from 'marked';
import markedPages from '../src/index.js';

describe('1. Extension disabled', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('markdown not using this extension', () => {
    marked.use(markedPages({ enable: false }));
    expect(marked('**standard markdown**')).toBe('<p><strong>standard markdown</strong></p>\n');
  });
});

describe('2. Options Reporting', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('options check - defaults', () => {
    const defaultOptions = {
      enable: true,
      pageIds: true,
      term: '\\\\page',
      regex: /\\page/gm
    };
    expect(markedPages().options()).toEqual(defaultOptions);
  });

  test('options check - regex generated from term', () => {
    expect(markedPages({ term: 'a' }).options()).toHaveProperty('regex', /a/gm);
  });

  test('options check - disable page IDs', () => {
    expect(markedPages({ pageIds: false }).options()).toHaveProperty('pageIds', false);
  });
});

describe('3. Testing with default options', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('lexer output', () => {
    marked.use(markedPages());
    expect(marked.lexer(' ')[0]).toHaveProperty('type', 'pageBlock');
  });

  test('parser output', () => {
    marked.use(markedPages());
    expect(marked.parse(' ')).toBe('<div class=\'page\' id=\'p1\'>\n</div>');
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
    expect(marked.parse('this is page 1\n\\page\nthis is page 2\n\\page\nthis is page 3')).toBe('<div class=\'page\' id=\'p1\'>\n<p>this is page 1</p>\n</div><div class=\'page\' id=\'p2\'>\n<p>this is page 2</p>\n</div><div class=\'page\' id=\'p3\'>\n<p>this is page 3</p>\n</div>');
  });
});

describe('4. Option: "pageIds: false"', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('single page', () => {
    marked.use(markedPages({ pageIds: false }));
    expect(marked.parse(' ')).toBe('<div class=\'page\'>\n</div>');
  });

  test('multiple pages', () => {
    marked.use(markedPages({ pageIds: false }));
    expect(marked.parse('page 1\n\\page\npage 2\n\\page\npage 3')).toBe('<div class=\'page\'>\n<p>page 1</p>\n</div><div class=\'page\'>\n<p>page 2</p>\n</div><div class=\'page\'>\n<p>page 3</p>\n</div>');
  });
});

describe('5. Option: "term: XYZZY"', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('single page', () => {
    marked.use(markedPages({ term: 'XYZZY' }));
    expect(marked.parse(' ')).toBe('<div class=\'page\' id=\'p1\'>\n</div>');
  });

  test('multiple pages', () => {
    marked.use(markedPages({ term: 'XYZZY' }));
    expect(marked.parse('page 1\nXYZZY\npage 2\nXYZZY\npage 3')).toBe('<div class=\'page\' id=\'p1\'>\n<p>page 1</p>\n</div><div class=\'page\' id=\'p2\'>\n<p>page 2</p>\n</div><div class=\'page\' id=\'p3\'>\n<p>page 3</p>\n</div>');
  });
});
