<div class="literate-text">

# literate.js

This program converts a source file into a Markdown document that mixes
prose (from comments) and code (from the source).
It's a simple **literate programming tool** written for Bun.

## Usage

```bash
bun literate.js <sourcefile>
```

It infers the comment syntax and Markdown code fence language from the file
extension, so for example:

```bash
bun literate.js hello.cpp
```

will produce `hello.cpp.md` containing Markdown prose extracted from `//` comments
and fenced `cpp` code blocks for everything else.

</div>

```js class=codeblock
import { readFileSync, writeFileSync, statSync, mkdirSync } from 'node:fs'
import path from 'node:path'
```

<div class="literate-text">

## Supported language configurations

Each entry defines:
- The Markdown language identifier for fenced code blocks
- The recognized comment tokens for stripping prose lines

If a file extension is not recognized, we exit with an error message.

</div>

```js class=codeblock
const CODE_META = 'class=codeblock'

const LANGUAGE_MAP = {
  '.cpp': { single: '//', fence: '```cpp' },
  '.cc': { single: '//', fence: '```cpp' },
  '.c': { single: '//', fence: '```c' },
  '.h': { single: '//', fence: '```c' },
  '.ino': { single: '//', fence: '```cpp' },
  '.java': { single: '//', fence: '```java' },
  '.js': { single: '//', fence: '```javascript' },
  '.jsx': { single: '//', fence: '```jsx' },
  '.mjs': { single: '//', fence: '```javascript' },
  '.cjs': { single: '//', fence: '```javascript' },
  '.tsx': { single: '//', fence: '```tsx' },
  '.go': { single: '//', fence: '```go' },
  '.js': { single: '//', fence: '```js' },
  '.ts': { single: '//', fence: '```ts' },
  '.rs': { single: '//', fence: '```rust' },
  '.py': { single: '#', fence: '```python' },
  '.sh': { single: '#', fence: '```bash' },
}
```

<div class="literate-text">

## Utility Functions

</div>

<div class="literate-text">

### classify(context, line)

Determines whether a line is prose, code, or blank based on the comment syntax.

</div>

```js class=codeblock
function classify(context, line) {
  const token = context.config.single
  const trimmed = line.trim()
  if (!trimmed) return 'blank'
  if (token && trimmed.startsWith(token)) return 'text'
  return 'code'
}
```

<div class="literate-text">

### clean(context, line)

Removes comment markers for prose lines, leaving readable Markdown.

</div>

```js class=codeblock
function clean(context, line) {
  const token = context.config.single
  if (context.currentType !== 'text') return line
  if (token && line.trimStart().startsWith(token))
    return line.replace(new RegExp(`^\\s*${token}+\\s?`), '')
  return line
}
```

<div class="literate-text">

### flush(context)

Writes buffered lines into the Markdown output.

</div>

```js class=codeblock
function flush(context) {
  const close = '```'
  if (!context.currentType || context.buffer.length === 0) return context.output
  if (context.currentType === 'code') {
    const content = context.buffer.join('\n').trimEnd()
    if (content) context.output += `\n${context.config.fence} ${CODE_META}\n${content}\n${close}\n`
  } else if (context.currentType === 'text') {
    context.output +=
      '\n<div class="literate-text">\n\n' + context.buffer.join('\n') + '\n\n</div>\n'
  }
  context.buffer = []
  context.currentType = null
  return context.output
}
```

<div class="literate-text">

### parseArgs(argConfig)

Parses command-line arguments based on a configuration object.
And also returns non-flag arguments as a list in the `others` property.

Config example:
```json
{
  'verbose': 'boolean', // flag
  'outputDir': { flag: '-o', value: null } // option with value
}
```

</div>

```js class=codeblock
function parseArgs(argConfig) {
  const args = process.argv.slice(2)
  const parsed = {
    others: [],
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    const entry = argConfig[arg]
    if (!entry) {
      parsed.others.push(arg)
      continue
    }

    const name = typeof entry === 'string' ? entry : entry.name

    if (typeof entry === 'string') {
      parsed[name] = true
    } else {
      const value = args[i + 1]
      if (!value || value.startsWith('-')) {
        console.error(`Expected value after ${arg}`)
        process.exit(1)
      }
      parsed[name] = value
      i += 1
    }
  }

  return parsed
}
```

<div class="literate-text">

### createOutputDir(dir)

Ensures that the output directory exists, creating it if necessary.

</div>

```js class=codeblock
function createOutputDir(dir) {
  try {
    const stats = statSync(dir)
    if (!stats.isDirectory()) {
      console.error(`Output path ${dir} is not a directory`)
      process.exit(1)
    }
  } catch (err) {
    try {
      mkdirSync(dir, { recursive: true })
    } catch (mkdirErr) {
      console.error(`Failed to create output directory ${dir}:`, mkdirErr)
      process.exit(1)
    }
  }
}
```

<div class="literate-text">

## main()

The main entry point that orchestrates reading, processing, and writing output.

</div>

```js class=codeblock
function main() {
  const ARGS = {
    '-v': 'verbose',
    '-o': {
      name: 'outputDir',
      value: null,
    },
  }
  const options = parseArgs(ARGS)
  const verbose = options.verbose || false
  const outputDir = options.outputDir || '.'
  const others = options.others || []
  const inputFile = others[0] || null

  if (!inputFile) {
    console.error('Usage: bun literate.js [-v] [-o outputDir] <sourcefile>')
    process.exit(1)
  }

  const log = (...msg) => {
    if (verbose) console.log('[LOG]', ...msg)
  }

  const ext = path.extname(inputFile)
  const config = LANGUAGE_MAP[ext]

  if (!config) {
    console.error(`Unsupported file type ".${ext}"`)
    console.error('Supported extensions are:', Object.keys(LANGUAGE_MAP).join(', '))
    process.exit(1)
  }

  log(`Parsing ${inputFile}`)

  const lines = readFileSync(inputFile, 'utf8').split(/\r?\n/)

  const context = {
    output: '',
    buffer: [],
    currentType: null,
    config,
  }

  for (const line of lines) {
    const type = classify(context, line)
    if (type === 'blank' && context.currentType === 'code') {
      context.buffer.push('')
    } else {
      if (type !== context.currentType) {
        context.output = flush(context)
        context.currentType = type
      }
      context.buffer.push(clean(context, line))
    }
  }

  context.output = flush(context)

  createOutputDir(outputDir)

  const mdFile = path.join(outputDir, path.basename(inputFile) + '.md')
  writeFileSync(mdFile, context.output.trim() + '\n')

  log(`Wrote ${mdFile}`)
}
```

<div class="literate-text">

Run the main function

</div>

```js class=codeblock
main()
```
