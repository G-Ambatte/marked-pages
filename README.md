<!-- The character `|` around a string denotes a place in this markdown file that needs to be changed for each extension. -->
<!-- You may also delete any comments you don't need anymore. -->

# TODO:

- [x] Replace information in `/README.md`
- [x] Replace name in `/rollup.config.js`
- [x] Replace information in `/package.json`
- [x] Write extension in `/src/index.js`
- [x] Write tests in `/spec/index.test.js`
- [ ] Uncomment release in `/.github/workflows/main.yml`

<!-- Delete this line and above -->

# marked-pages
This extension for Marked.js adds support for separating the Markdown source into container elements, referred to as "pages". This is achieved by use of a special page break term in the Markdown source, which by default is set to `\page` but can be configured to whatever the user chooses.

# Usage

```js
import {marked} from "marked";
import markedPages from "marked-pages";

// or UMD script
// <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/marked-pages/lib/index.umd.js"></script>

const options = {
	// default options
	enable: true;
	term: '\\\\page'
};

marked.use(markedPages(options));

marked.parse("example text");
// <div class='page' id='p1'><p>example text</p></div>

marked.parse("example page 1\n\page\nexample page 2");
// <div class='page' id='p1'><p>example page 1</p></div><div class='page' id='p2'><p>example page 2</p></div>
```

## `options`

**_enable_** : **true** | false
- turns the extension on and off.

**_term_** : **'\\\\page'** | String
- sets the page break term. This is converted to RegEx and back to a string so double quoting of special characters is required.

**_regex_** : **null** | Regex
- sets the search Regex to detect the page break term. If not set, this will be generated from the **_term_** option.
