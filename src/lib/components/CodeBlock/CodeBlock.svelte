<!-- @component Code Block based on: https://shiki.style/ -->

<script module>
  import { createHighlighterCoreSync } from 'shiki/core'
  import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
  // Themes
  // https://shiki.style/themes
  import codeTheme from 'shiki/themes/catppuccin-frappe.mjs'
  // Languages
  // https://shiki.style/languages
  import console from 'shiki/langs/console.mjs'
  import html from 'shiki/langs/html.mjs'
  import css from 'shiki/langs/css.mjs'
  import js from 'shiki/langs/javascript.mjs'
  import json from 'shiki/langs/json.mjs'
  import ts from 'shiki/langs/typescript.mjs'
  import python from 'shiki/langs/python.mjs'
  import cpp from 'shiki/langs/cpp.mjs'
  import csharp from 'shiki/langs/csharp.mjs'
  import yaml from 'shiki/langs/yaml.mjs'
  import latex from 'shiki/langs/latex.mjs'
  import xml from 'shiki/langs/xml.mjs'

  // https://shiki.style/guide/sync-usage
  const shiki = createHighlighterCoreSync({
    engine: createJavaScriptRegexEngine(),
    // Implement your import theme.
    themes: [codeTheme],
    // Implement your imported and supported languages.
    langs: [console, html, css, js, json, ts, python, cpp, csharp, yaml, latex, xml],
  })
</script>

<script lang="ts">
  import type { CodeBlockProps } from './types'

  let {
    code = '',
    lang = 'console',
    theme = 'catppuccin-frappe',
    // Base Style Props
    base = 'overflow-hidden',
    rounded = 'rounded-container',
    shadow = '',
    classes = '',
    // Pre Style Props
    preBase = '',
    prePadding = '',
    preClasses = '',
  }: CodeBlockProps = $props()

  // Shiki convert to HTML
  const generatedHtml = shiki.codeToHtml(code, { lang, theme })
</script>

<div class="codeblock {base} {rounded} {shadow} {classes} {preBase} {prePadding} {preClasses}">
  <!-- Output Shiki's Generated HTML -->
  {@html generatedHtml}
</div>
