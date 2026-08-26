# Graph Report - ESPDocs  (2026-08-24)

## Corpus Check
- 59 files · ~675,087 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 833 nodes · 1499 edges · 82 communities (58 shown, 24 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.53)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d5303561`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- paged.polyfill.js
- Layout
- AtPage
- Page
- .push
- dependencies
- .replace
- .indexOf
- Sheet
- peek
- Breaks
- Queue
- allocateCursor
- ESPDocs - Documentação ESP32 em Português
- isNameStart
- Diretrizes de tema: claro e escuro
- internalMatch
- Previewer
- auditar-temas.mjs
- layout.jsx
- buildGroupMatchGraph
- getCharCode
- PinRestrictions.jsx
- eslint.config.mjs
- compilerOptions
- requireKeys
- outOfRange
- testNode
- page.jsx
- page.jsx
- esp-matter.c
- seo.js
- consumeB$1
- processStructure
- generate$2
- getVendorPrefix
- layout.jsx
- layout.jsx
- page.jsx
- page.jsx
- layout.jsx
- layout.jsx
- page.jsx
- esp-nn.c
- matchSyntax
- consumeNumber$5
- strcmp
- readSequence
- patchAtrules
- CLAUDE.md
- next.config.mjs
- postcss.config.mjs
- consumeDeclaration
- consumeRaw$4
- createParseContext
- dumpAtruleMapSyntax
- isProtoString
- getWalkersFromStructure
- isDelim
- isSelectorValid
- OverflowContentError
- RenderResult

## God Nodes (most connected - your core abstractions)
1. `AtPage` - 39 edges
2. `walk()` - 27 edges
3. `Layout` - 21 edges
4. `Page` - 18 edges
5. `Footnotes` - 18 edges
6. `Chunker` - 17 edges
7. `Counters` - 17 edges
8. `Sheet` - 16 edges
9. `createItem()` - 14 edges
10. `join()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `nodeAfter()` --calls--> `nextSignificantNode()`  [EXTRACTED]
  public/formacoes/assets/paged.polyfill.js → public/formacoes/assets/paged.polyfill.js  _Bridges community 1 → community 10_
- `sourceFragment()` --calls--> `join()`  [EXTRACTED]
  public/formacoes/assets/paged.polyfill.js → public/formacoes/assets/paged.polyfill.js  _Bridges community 6 → community 4_
- `generateSequence()` --calls--> `join()`  [EXTRACTED]
  public/formacoes/assets/paged.polyfill.js → public/formacoes/assets/paged.polyfill.js  _Bridges community 36 → community 4_
- `peek()` --calls--> `scanString()`  [EXTRACTED]
  public/formacoes/assets/paged.polyfill.js → public/formacoes/assets/paged.polyfill.js  _Bridges community 7 → community 9_
- `readImplicitGroup()` --calls--> `regroupTerms()`  [EXTRACTED]
  public/formacoes/assets/paged.polyfill.js → public/formacoes/assets/paged.polyfill.js  _Bridges community 6 → community 9_

## Import Cycles
- None detected.

## Communities (82 total, 24 thin omitted)

### Community 0 - "paged.polyfill.js"
Cohesion: 0.02
Nodes (25): consumeRaw$4(), consumeRule(), dumpAtruleMapSyntax(), dumpMapSyntax(), NOTE: The order of the mappings is NOT guaranteed., TODO: should consume block content as Raw?, TODO: fall back to mutation observer?, TODO: not sure we should support this hack (+17 more)

### Community 1 - "Layout"
Cohesion: 0.06
Nodes (27): breakInsideAvoidParentNode(), BreakToken, child(), cloneNode(), displayedElementAfter(), elementAfter(), findElement(), findRef() (+19 more)

### Community 2 - "AtPage"
Cohesion: 0.05
Nodes (8): append(), AtPage, createItem(), CSSValueToString(), PageCounterIncrement, PositionFixed, PrintMedia, ScriptsFilter

### Community 3 - "Page"
Cohesion: 0.06
Nodes (14): CodeExample(), ConnectionsDiagram(), FILTER_CATEGORIES, type_colors, Chunker, dump(), forEachToken(), Page (+6 more)

### Community 4 - ".push"
Cohesion: 0.11
Nodes (12): collectWarning(), computeSourceURL(), Counters, createNodeStructureChecker(), isAbsolute(), join(), normalize(), prepareTokens$1() (+4 more)

### Community 5 - "dependencies"
Cohesion: 0.04
Nodes (46): @emotion/react, @emotion/styled, eslint, eslint-config-next, @eslint/eslintrc, framer-motion, googleapis, lucide-react (+38 more)

### Community 6 - ".replace"
Cohesion: 0.05
Nodes (21): attr(), calc(), cleanPseudoContent(), consumeFunction(), ContentParser, customIdent(), defer(), eqStr() (+13 more)

### Community 7 - ".indexOf"
Cohesion: 0.09
Nodes (12): ArraySet$1(), calculateSpecificity(), cleanSelector(), compareByGeneratedPositionsInflated(), generatedPositionAfter(), getArg(), MappingList$1(), relative() (+4 more)

### Community 8 - "Sheet"
Cohesion: 0.13
Nodes (7): Handler, Hook, invokeForType(), Lists, Sheet, validate(), walk()

### Community 9 - "peek"
Cohesion: 0.22
Nodes (18): charCode(), customPropertyName(), idSelector(), maybeMultiplied(), maybeToken(), parse$2(), peek(), readGroup() (+10 more)

### Community 10 - "Breaks"
Cohesion: 0.09
Nodes (15): Breaks, CommentsFilter, displayedElementBefore(), elementBefore(), filterTree(), getNodeWithNamedPage(), isAllWhitespace(), isIgnorable() (+7 more)

### Community 12 - "allocateCursor"
Cohesion: 0.21
Nodes (9): allocateCursor(), appendOrAssign(), appendOrAssignOrNull(), copy(), createTypeIterator(), deepAssign(), isObject$2(), mix$1() (+1 more)

### Community 13 - "ESPDocs - Documentação ESP32 em Português"
Cohesion: 0.13
Nodes (14): 👤 Autor, Configuração do Marketplace (Opcional), 🤝 Contribuindo, 🚀 Deploy on Vercel, ⚠️ Disclaimer, ESPDocs - Documentação ESP32 em Português, 📁 Estrutura do Projeto, Executar em Desenvolvimento (+6 more)

### Community 14 - "isNameStart"
Cohesion: 0.15
Nodes (13): isDigit$5(), isHexDigit$4(), isIdentifierStart$2(), isLetter(), isLowercaseLetter(), isName$2(), isNameStart(), isNewline$1() (+5 more)

### Community 15 - "Diretrizes de tema: claro e escuro"
Cohesion: 0.17
Nodes (11): 1. Só existem os tons declarados, 2. A regra da simetria, 3. Pares canônicos por papel, 4.1. Botão nunca inverte preto ↔ branco, 4.2. Painel de destaque acompanha o tema, 4.3. Separação de superfície no tema claro, 4. Exceção: superfícies escuras nos dois temas, 5. Cor de série vem do dado, não da classe (+3 more)

### Community 16 - "internalMatch"
Cohesion: 0.20
Nodes (11): areStringsEqualCaseInsensitive(), buildLoc(), fromLoc(), internalMatch(), isCommaContextEnd(), isCommaContextStart(), isContextEdgeDelim(), locateMismatch() (+3 more)

### Community 18 - "auditar-temas.mjs"
Cohesion: 0.48
Nodes (6): arquivos(), contraste(), coresFixasInline(), ESCALA, luminancia(), main()

### Community 19 - "layout.jsx"
Cohesion: 0.33
Nodes (4): inter, metadata, outfit, viewport

### Community 20 - "buildGroupMatchGraph"
Cohesion: 0.53
Nodes (6): buildGroupMatchGraph(), buildMatchGraph$1(), buildMultiplierMatchGraph(), createCondition(), isEnumCapatible(), isFunctionType()

### Community 21 - "getCharCode"
Cohesion: 0.53
Nodes (6): consumeBadUrlRemnants$1(), consumeEscaped$1(), consumeName$1(), getCharCode(), getNewlineLength$1(), tokenize$3()

### Community 23 - "PinRestrictions.jsx"
Cohesion: 0.60
Nodes (4): derivarGrupos(), GRUPOS, PinRestrictions(), rotuloDoPino()

### Community 24 - "eslint.config.mjs"
Cohesion: 0.40
Nodes (4): compat, __dirname, eslintConfig, __filename

### Community 25 - "compilerOptions"
Cohesion: 0.40
Nodes (4): compilerOptions, paths, @/*, ./*

### Community 26 - "requireKeys"
Cohesion: 0.40
Nodes (5): assign(), requireIsImplemented$1(), requireKeys(), requireShim$4(), requireShim$5()

### Community 27 - "outOfRange"
Cohesion: 0.40
Nodes (6): dimension(), integer(), isPostfixIeHack(), number(), outOfRange(), percentage()

### Community 28 - "testNode"
Cohesion: 0.40
Nodes (4): isKeyword(), isProperty(), isType(), testNode()

### Community 29 - "page.jsx"
Cohesion: 0.67
Nodes (3): categoryIcons, Comparacao(), valorDe()

### Community 31 - "page.jsx"
Cohesion: 0.67
Nodes (3): getOptionIcon(), iconMap, Seletor()

### Community 34 - "consumeB$1"
Cohesion: 0.50
Nodes (4): checkInteger$1(), consumeB$1(), isDelim$1(), skipSC()

### Community 36 - "generate$2"
Cohesion: 0.50
Nodes (4): generate$2(), generateMultiplier(), generateSequence(), generateTypeOpts()

### Community 37 - "getVendorPrefix"
Cohesion: 0.67
Nodes (4): getKeywordDescriptor(), getPropertyDescriptor(), getVendorPrefix(), isCustomProperty$1()

### Community 49 - "matchSyntax"
Cohesion: 0.67
Nodes (3): buildMatchResult(), matchSyntax(), valueHasVar()

### Community 50 - "consumeNumber$5"
Cohesion: 0.67
Nodes (3): cmpChar$5(), consumeNumber$5(), findDecimalNumberEnd()

### Community 51 - "strcmp"
Cohesion: 0.67
Nodes (3): compareByGeneratedPositionsDeflated(), compareByOriginalPositions(), strcmp()

### Community 52 - "readSequence"
Cohesion: 0.67
Nodes (3): consumeRaw(), parentheses(), readSequence()

### Community 53 - "patchAtrules"
Cohesion: 0.67
Nodes (3): patchAtrules(), patchDictionary(), unpackSyntaxes()

### Community 70 - "consumeRaw$4"
Cohesion: 0.29
Nodes (6): requireEs6Symbol(), requireIsArguments(), requireIsFunction(), requireIsImplemented(), requireIsString(), requireShim$1()

### Community 72 - "dumpAtruleMapSyntax"
Cohesion: 0.33
Nodes (5): pastaModulo, raiz, saida, servidor, TIPOS

## Knowledge Gaps
- **78 isolated node(s):** `metadata`, `metadata`, `categoryIcons`, `metadata`, `metadata` (+73 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `AtPage` connect `AtPage` to `paged.polyfill.js`, `Page`, `.push`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `Page` connect `Page` to `paged.polyfill.js`, `.replace`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `Chunker` connect `Page` to `paged.polyfill.js`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `metadata`, `metadata`, `categoryIcons` to the rest of the system?**
  _78 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `paged.polyfill.js` be split into smaller, more focused modules?**
  _Cohesion score 0.022216913521261348 - nodes in this community are weakly interconnected._
- **Should `Layout` be split into smaller, more focused modules?**
  _Cohesion score 0.056535504296698326 - nodes in this community are weakly interconnected._
- **Should `AtPage` be split into smaller, more focused modules?**
  _Cohesion score 0.05427905427905428 - nodes in this community are weakly interconnected._