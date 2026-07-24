# Assisted Sales AI Native — Reference Flow (deck HTML)

Deck de visão navegável. 9 slides, caso Papa Fila / Americanas.

## Como abrir
Abra `index.html` no navegador. Não precisa de servidor (mas se preferir: `python3 -m http.server` na pasta).

## Navegação
- Setas `←` `→`, `Espaço`, `PageUp/Down`, `Home`, `End`
- Botões no canto inferior direito
- `F` ou o botão ⛶ para tela cheia
- Swipe no touch
- Deep-link por slide: `index.html#4` abre no slide 4

## Arquivos
- `index.html` — estrutura dos 9 slides (um `<section class="slide">` cada)
- `styles.css` — todo o visual. **Tokens no topo (`:root`)**: cores, fontes, geometria. Mudar lá re-skina tudo.
- `script.js` — navegação, escala responsiva (contain 16:9), teclado, fullscreen, gera as tiles do slide 4

## Onde mexer no que
- **Cores / marca**: `:root` no `styles.css` (`--pink` é o magenta VTEX, `--amr` o vermelho Americanas usado só nos mockups)
- **Fontes**: `--display` (Inter Tight) e `--body` (Inter), carregadas via Google Fonts no `<head>`
- **Texto dos slides**: direto no `index.html`
- **Frase-âncora**: procure por `class="anchor"` (aparece nos slides 1, 4, 9)
- **Mockups mobile** (slide 7): blocos `.phone` no HTML + seção `SLIDE 7 — phones` no CSS

## Notas de design
- Base dark VTEX + magenta. Vermelho Americanas aparece **só** dentro dos telefones (comunica "onbrand, marca do cliente").
- Slide 4 é o clímax (antes/depois). Slide 7 é o payoff visual.
- Geometria fixa 1280×720; o `script.js` escala pra caber em qualquer tela mantendo proporção.
