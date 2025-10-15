// # literate.js
//
// This program converts a source file into a Markdown document that mixes
// prose (from comments) and code (from the source).
// It's a simple **literate programming tool** written for Bun.
//
// ## Usage
//
// ```bash
// bun literate.js <sourcefile>
// ```
//
// It infers the comment syntax and Markdown code fence language from the file
// extension, so for example:
//
// ```bash
// bun literate.js hello.cpp
// ```
//
// will produce `hello.cpp.md` containing Markdown prose extracted from `//` comments
// and fenced `cpp` code blocks for everything else.

import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

// ## Supported language configurations
//
// Each entry defines:
// - The Markdown language identifier for fenced code blocks
// - The recognized comment tokens for stripping prose lines
//
// If a file extension is not recognized, we exit with an error message.

const LANGUAGE_MAP = {
  '.cpp': { single: '//', fence: '```cpp' },
  '.cc': { single: '//', fence: '```cpp' },
  '.c': { single: '//', fence: '```c' },
  '.js': { single: '//', fence: '```js' },
  '.ts': { single: '//', fence: '```ts' },
  '.rs': { single: '//', fence: '```rust' },
  '.py': { single: '#', fence: '```python' },
  '.sh': { single: '#', fence: '```bash' },
}

// ## Utility Functions

// ### classify(context, line)
//
// Determines whether a line is prose, code, or blank based on the comment syntax.
function classify(context, line) {
  const token = context.config.single
  const trimmed = line.trim()
  if (!trimmed) return 'blank'
  if (token && trimmed.startsWith(token)) return 'text'
  return 'code'
}

// ### clean(context, line)
//
// Removes comment markers for prose lines, leaving readable Markdown.
function clean(context, line) {
  const token = context.config.single
  if (context.currentType !== 'text') return line
  if (token && line.trimStart().startsWith(token))
    return line.replace(new RegExp(`^\\s*${token}+\\s?`), '')
  return line
}

// ### flush(context)
//
// Writes buffered lines into the Markdown output.
function flush(context) {
  const close = '```'
  if (!context.currentType || context.buffer.length === 0) return context.output
  if (context.currentType === 'code') {
    const content = context.buffer.join('\n').trimEnd()
    if (content) context.output += `\n${context.config.fence}\n${content}\n${close}\n`
  } else if (context.currentType === 'text') {
    context.output += '\n' + context.buffer.join('\n') + '\n'
  }
  context.buffer = []
  context.currentType = null
  return context.output
}

// ## main()
//
// The main entry point that orchestrates reading, processing, and writing output.
function main() {
  const args = process.argv.slice(2)
  const verbose = args.includes('-v')
  const inputFile = args.find((arg) => !arg.startsWith('-'))

  if (!inputFile) {
    console.error('Usage: bun literate.js [-v] <sourcefile>')
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

  log(`Parsing ${inputFile} as ${config.fence}`)

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

  const mdFile = `${inputFile}.md`
  writeFileSync(mdFile, context.output.trim() + '\n')

  log(`Wrote ${mdFile}`)
}

// ## Example
//
// ```bash
// bun literate.js literate.js
// ```
//
// Running this script on itself produces a human-readable Markdown guide
// describing how the tool works — a self-documenting example of literate programming.

main()
