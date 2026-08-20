# Diretrizes de tema — claro e escuro

Regras para manter os dois temas consistentes. Não tratam da identidade visual
(degradê da marca, arredondamentos, hierarquia): essas decisões já estão tomadas
e não mudam.

---

## 1. Só existem os tons declarados

A escala do Tailwind anda de 100 em 100: `50, 100, 200, 300 … 900, 950`.
Os meios-tons (`150, 250, 350, 450, 550, 650, 750, 850`) **não existem por
padrão** — uma classe como `text-slate-350` não gera CSS nenhum, e o elemento
herda silenciosamente a cor do pai. Era a causa da maior parte das
inconsistências: o mesmo texto ficava certo num tema e lavado no outro.

Os oito meios-tons estão declarados em [`app/globals.css`](app/globals.css),
cada um no ponto médio exato entre os dois degraus oficiais vizinhos:

| tom | hex | entre |
|-----|-----|-------|
| `slate-150` | `#eaeef4` | 100 e 200 |
| `slate-250` | `#d6dee8` | 200 e 300 |
| `slate-350` | `#b0bccc` | 300 e 400 |
| `slate-450` | `#7c8ca2` | 400 e 500 |
| `slate-550` | `#56647a` | 500 e 600 |
| `slate-650` | `#3d4b5f` | 600 e 700 |
| `slate-750` | `#283548` | 700 e 800 |
| `slate-850` | `#162032` | 800 e 900 |

**Precisa de um tom novo?** Declare no `@theme` antes de usar. Nunca escreva uma
classe com um valor que não está na escala.

---

## 2. A regra da simetria

No tema escuro o fundo é escuro, então o texto precisa **clarear**.

- **Texto:** o número do `dark:` é sempre **menor** que o do claro.
  `text-slate-800 dark:text-slate-200` ✅ — `text-slate-400 dark:text-slate-500` ❌
- **Fundo e borda:** o número do `dark:` é sempre **maior**.
  `bg-white dark:bg-slate-900` ✅ — `border-slate-200 dark:border-slate-800` ✅

Um par invertido não quebra o build e não aparece em revisão de código: só
enfraquece o contraste justamente onde ele deveria aumentar. Havia 71 deles.

---

## 3. Pares canônicos por papel

Use estes. Os números são a razão de contraste no tema claro (sobre branco) e no
escuro (sobre `slate-900`). O mínimo para texto é **4.5:1**; para ícone ou
elemento gráfico, **3:1**.

| Papel | Par | Claro | Escuro |
|-------|-----|-------|--------|
| Título / texto principal | `text-slate-850 dark:text-slate-100` | 16.3 | 16.3 |
| Texto principal alternativo | `text-slate-800 dark:text-slate-200` | 14.6 | 14.5 |
| Texto secundário | `text-slate-700 dark:text-slate-300` | 10.4 | 12.0 |
| Corpo de leitura | `text-slate-650 dark:text-slate-350` | 8.9 | 9.3 |
| Rótulo / apoio | `text-slate-500 dark:text-slate-400` | 4.8 | 7.0 |
| Menor ênfase | `text-slate-500 dark:text-slate-450` | 4.8 | 5.2 |

`text-slate-500 dark:text-slate-400` é o par mais usado do projeto (100
ocorrências) — é o rótulo em caixa alta, a legenda, o texto de apoio.

**Não use** `slate-400` como cor de texto no tema claro: sobre branco dá 2.56:1.
Era o erro mais repetido.

---

## 4. Exceção: superfícies escuras nos dois temas

Alguns blocos são escuros independente do tema — painéis de CTA com degradê,
bloco de código, tooltip do diagrama de pinos. Dentro deles:

- **Não use variante `dark:`.** O fundo não muda, então o texto também não deve.
- Escreva um valor só: `text-slate-200`, `text-white`, `text-slate-350`.

Exemplo correto, no bloco de código ([`CodeExample.jsx`](components/CodeExample.jsx)):

```jsx
<div className="flex bg-slate-950">                      {/* escuro sempre */}
  <span className="text-slate-500 pr-4 ...">{idx + 1}</span>   {/* sem dark: */}
```

---

## 4.1. Botão nunca inverte preto ↔ branco

O padrão abaixo **não é aceitável**, apesar de tecnicamente "acompanhar" o tema:

```jsx
/* ERRADO: preto no tema claro, branco no escuro */
className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950"
```

Ele deixa a interface sem cor e faz o mesmo botão trocar completamente de
aparência entre os temas. Botão carrega a **própria cor**, igual nos dois temas:

| Papel | Classe | Contraste com texto branco |
|-------|--------|---------------------------|
| Ação principal | `bg-gradient-to-r from-purple-600 to-indigo-600 text-white` | 5.4 – 6.3 |
| Ação secundária | `bg-blue-600 hover:bg-blue-700 text-white` | 5.2 |
| Ação terciária | `bg-white dark:bg-slate-900` + borda + texto neutro | — |

Como a cor é a mesma nos dois temas, o texto branco também é — sem variante
`dark:`. Isso vale inclusive dentro de painel escuro: o botão de gradiente
funciona sobre fundo claro e escuro.

---

## 4.2. Painel de destaque acompanha o tema

Painéis de CTA não podem ficar escuros no tema claro. O padrão é um degradê
suave da marca no claro e o degradê escuro no escuro:

```jsx
className="bg-gradient-to-br from-indigo-50 to-purple-50
           dark:from-slate-950 dark:to-purple-950/20
           border border-indigo-200 dark:border-slate-800/80"
```

Com o conteúdo pareado: título `text-slate-900 dark:text-white`, corpo
`text-slate-600 dark:text-slate-400`, etiqueta
`bg-indigo-500/10 text-indigo-700 dark:bg-white/10 dark:text-slate-350`.

---

## 4.3. Separação de superfície no tema claro

Entre near-whites o contraste é sempre baixo — quem separa o card do fundo é a
**borda**, não o fundo. Por isso:

| Camada | Valor | Contraste |
|--------|-------|-----------|
| Fundo da página | `from-slate-100 via-slate-50 to-purple-100/40` | — |
| Card | `bg-white` (sólido, sem `/70` ou `/80`) | 1.10 vs fundo |
| Borda do card | `border-slate-300` | 1.48 vs card |
| Divisória interna | `border-slate-200` | mais sutil |

`border-slate-200/60` sobre card branco dava 1.14 — imperceptível. Não use borda
com opacidade para delimitar card.

---

## 5. Cor de série vem do dado, não da classe

Cada série tem sua cor em [`public/series.json`](public/series.json) (campo
`cor`). Ela entra por `style`, nunca por classe Tailwind:

```jsx
<span style={{ backgroundColor: `${serie.cor}18`, color: serie.cor }} />
```

Esses valores são iguais nos dois temas. Ao usá-los como **fundo**, mantenha o
alfa baixo (`18`–`30` em hex) para que funcione sobre superfície clara e escura.
Como **texto**, só sobre superfície neutra — nunca sobre outra cor de série.

### Nunca escreva cor fixa em `style` inline

`style` inline vence qualquer classe — inclusive as variantes `dark:` e
`hover:`, que deixam de existir para aquele elemento. Só cor **vinda do dado**
pode ir no inline.

```jsx
/* ERRADO: anula border-slate-300 e dark:border-slate-800/80 */
<div className="border border-slate-300 dark:border-slate-800/80"
     style={{ borderColor: 'rgba(148, 163, 184, 0.1)' }} />

/* ERRADO: 'transparent' anula também o hover:border-purple-400/50 */
style={{ borderColor: isSelected ? serie.cor : 'transparent' }}

/* CERTO: sem valor, a classe assume o estado de repouso */
style={{ borderColor: isSelected ? serie.cor : undefined }}
```

Esse bug é traiçoeiro porque **some depois do primeiro hover**: o
`onMouseLeave` faz `style.borderColor = ''`, que apaga o inline e devolve o
controle à classe. A borda passa a aparecer e nunca mais some — dando a
impressão de que só falha "antes de passar o mouse".

---

## 6. Auditar antes de commitar

```bash
npm run auditar-temas
```

Aponta quatro coisas: tom que não existe na escala, par invertido, par abaixo de
AA e cor fixa em `style` inline. Saída esperada: tudo zero.

Sai com código 1 se achar problema, então serve direto em hook de pre-commit ou
em CI:

```bash
npm run auditar-temas && npm run build
```
