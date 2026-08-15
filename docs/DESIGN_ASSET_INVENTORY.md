# Inventário de assets — Fazendinha da Cecília

> Entregável da **Onda 00** (`FRONTEND_IMPLEMENTATION_PLAN.md`).
>
> Documento mestre: `PROJECT_CONTEXT.md`.
>
> Esta auditoria não implementa frontend. A Onda 01 começa somente com autorização explícita.

---

## 1. Estado atual do repositório

| Item | Situação |
|---|---|
| Next.js / React / TypeScript / Tailwind | **Não instalados** |
| `package.json`, `src/`, `app/` | **Não existem** |
| Lint / tsconfig / package manager | **Não existem** |
| Backend / Supabase | Fora de escopo nesta fase |
| Pasta `/design` | 15 PNGs (~29,3 MB) |
| Skill de UI | `.agents/skills/frontend-ui-engineering/` |
| Regra permanente | `.cursor/rules/frontend-ui-engineering.mdc` |

O projeto hoje é documentação + matéria-prima visual. A aplicação será criada na Onda 01.

---

## 2. Decisões fechadas nesta auditoria

| Tema | Decisão |
|---|---|
| Foto da Cecília | Usar a foto com fundo transparente em `suporte_elementos_header.png`. Troca posterior é permitida. |
| Galeria | Fotos **mockadas** até haver originais ou cadastro. |
| Fontes | Nenhuma fonte veio definida. Escolher na Onda 02 a partir da referência (ver §8). |
| Endereço, Maps, WhatsApp | Valores **mockados**. Corrigir depois. |
| Skill de frontend | Sempre `frontend-ui-engineering` em qualquer UI. |

Mocks provisórios sugeridos (Onda 01/20):

```text
Endereço: Restaurante Engenho do Castelo, endereço a confirmar
Maps: https://maps.google.com/?q=Restaurante+Engenho+do+Castelo
WhatsApp: +5500000000000
Data: 2026-09-06T11:00:00-03:00
```

---

## 3. Inventário de arquivos em `/design`

| Asset | Tipo | Uso potencial | Reutilizável | Precisa tratamento |
|---|---|---|---|---|
| `exemplo_one_page.png` | Composição RGB opaca 863×1822 (~1,92 MB) | Ordem das seções, ritmo visual, atmosfera. **Não** é layout responsivo. | Não como imagem de página | Não usar como `<img>` de seção. Só referência. |
| `sesao-header.png` | Referência de seção RGB 1086×1448 (~1,78 MB) | Hero: foto, nameplate, placa, data/hora/local, animais, flores | Composição fechada | Nome com typo. Reconstruir em HTML. |
| `fundo_header_se_preciso.png` | Fundo RGB 1448×1086 (~1,35 MB) | Fundo do Hero (celeiro rosa, cerca branca, flores, colinas) | Sim, como background | Recortar/otimizar; está desfocada — usar atrás, não como UI. |
| `secao_historioa_contador.png` | Referência RGB 1024×1536 (~2,30 MB) | História + countdown juntos | Composição fechada | Nome com typo (`historioa`). Separar em 2 seções HTML. |
| `secao_confirmacao.png` | Referência RGB 1024×1536 (~1,58 MB) | RSVP: pergunta, 2 botões, vaca/ovelha, cerca/portão | Composição fechada | Botões viram HTML. Extrair animais da folha de suporte. |
| `secao_recadinho.png` | Referência RGB 1035×1520 (~1,37 MB) | Formulário + carrossel de mensagens | Composição fechada | Form/carrossel em HTML. Animais da folha de suporte. |
| `secao_fotos.png` | Referência RGB 1024×1536 (~1,91 MB) | Galeria: destaque + 6 thumbs + CTA | Composição fechada | Fotos internas são IA. Usar **mocks** no lugar. |
| `secao_localizacao.png` | Referência RGB 869×1810 (~1,50 MB) | Local, mapa, endereço, CTA Maps, cerca final | Composição fechada | Mapa ilustrado → mock/iframe. Endereço mockado. |
| `suporte_elementos_header.png` | Folha ARGB 1536×1024 (~2,60 MB) | **Foto da Cecília (oficial agora)**, nameplate, placa redonda, vaca, ovelha, celeiro, flores, fita gingham, borboleta | Sim — fatias | Fatiar em PNGs isolados. Foto da criança é prioridade. |
| `suporte_elementos_historia.png` | Folha ARGB 1214×1295 (~2,10 MB) | Vaca, ovelha, porquinho, celeiro, cercas, polaroid vazia, placas, balde de flores, tiles do countdown (só referência visual) | Sim — fatias | Countdown tiles **não** usar como imagem; reconstruir em HTML. Polaroid = moldura CSS + foto. |
| `suporte_elementos_confirmacao.png` | Folha ARGB 1229×1280 (~1,96 MB) | Vaca e ovelha na cerca, botões, cadeado, placa, portão rosa, flores, borboletas | Sim — fatias | Botões/ícones em HTML+Lucide. Manter animais, cerca, portão, flores. |
| `suporte_elementos_recadinho.png` | Folha ARGB 1224×1285 (~1,98 MB) | Vaca/ovelha, celeiro pequeno, flores, borboletas, cerca, placa “Que alegria ter você aqui!” | Sim — fatias | Form e carrossel em HTML. Extrair decoração. |
| `suporte_elementos_fotos.png` | Folha ARGB 1211×1299 (~1,98 MB) | Molduras (referência), vaca, porquinho, ovelha, celeiro, portão, flores | Sim — fatias | Molduras/CTA em CSS. Fotos da galeria = mocks. |
| `suporte_elementos_localizacao.png` | Folha ARGB 1024×1536 (~2,15 MB) | Frame do mapa, card de endereço (referência), vaca/ovelha, placa, portão, flores | Sim — fatias | Card, pin e botão Maps em HTML. Extrair animais e cerca. |
| `suporte_elementos_extras.png` | Folha ARGB 1536×1024 (~2,82 MB) | Kit extra: vaca, ovelha, porco, pônei, pintinho, patinho, coelho, cachorro, galo, celeiro, árvore, carroça, cercas, feno, bexigas, bandeirinhas, placa Alegria/Sorrisos/Amor | Sim — fatias | Banco de decoração para Hero, footer e continuidade entre seções. |

**Transparência:** as 7 folhas `suporte_*` são `Format32bppArgb` com fundo realmente transparente (`A=0`). O “preto” é só visualização. As 8 composições de seção são `Format24bppRgb` (opacas).

---

## 4. Mapeamento seção → referência

Nenhuma seção ficou sem referência.

| Seção da OnePage | Referência principal | Folha de suporte | Observação |
|---|---|---|---|
| Hero / Header | `sesao-header.png` + `fundo_header_se_preciso.png` | `suporte_elementos_header.png` | Foto oficial = recorte da folha de suporte. |
| História | topo de `secao_historioa_contador.png` | `suporte_elementos_historia.png` | Texto HTML. Polaroid = moldura + foto recortada. |
| Countdown | base de `secao_historioa_contador.png` | tiles na folha de história (só visual) | Números reais via mock `eventDate`. |
| RSVP | `secao_confirmacao.png` | `suporte_elementos_confirmacao.png` | Botões HTML. Modal não aparece na arte — criar com a identidade. |
| Formulário de recadinho | topo de `secao_recadinho.png` | `suporte_elementos_recadinho.png` | Campos, counter 0/200, botão reais. |
| Carrossel de recadinhos | base de `secao_recadinho.png` | mesma folha | Mensagens mockadas. |
| Galeria | `secao_fotos.png` | `suporte_elementos_fotos.png` | **Fotos mock.** Layout: 1 destaque + grid. |
| Localização | `secao_localizacao.png` | `suporte_elementos_localizacao.png` | Endereço/Maps mockados. |
| Encerramento | rodapé de `exemplo_one_page.png` e cercas/portão das seções | `suporte_elementos_extras.png` | Não criar footer corporativo. |
| Ordem / atmosfera global | `exemplo_one_page.png` | — | Em conflito com seção isolada, **vence a seção isolada**. |

Em caso de divergência (galeria Polaroid na OnePage vs destaque+grid na seção; recadinhos lado a lado vs empilhados): implementar a **referência de seção**. A OnePage define só ordem e continuidade.

---

## 5. Elementos reutilizáveis (versões canônicas)

Preferir **uma** fatia por elemento e reposicionar por CSS. Não exportar a mesma vaca sete vezes.

| Elemento | Melhor fonte de recorte | Onde reaparece |
|---|---|---|
| Foto da Cecília (fundo transparente) | `suporte_elementos_header.png` | Hero; História (polaroid) se precisar da mesma foto |
| Vaca com laço gingham | `suporte_elementos_header.png` ou `extras` (sentada) / `confirmacao` (na cerca) | Quase todas as seções |
| Ovelha com laço | idem | Quase todas as seções |
| Porquinho | `suporte_elementos_historia.png` / `extras` / `fotos` | Countdown, galeria, extras |
| Pintinho / patinho / pônei / coelho / galo / cachorro | `suporte_elementos_extras.png` | Hero, footer, continuidade |
| Celeiro rosa com coração na porta | `suporte_elementos_header.png` / `historia` / `extras` | Hero, countdown, recadinho, galeria |
| Cerca de madeira + portão rosa com coração | `suporte_elementos_confirmacao.png` | Divisor entre seções e footer |
| Cerca branca com flores | `fundo_header_se_preciso.png` / header suporte | Hero |
| Placa de madeira com coração recortado | várias folhas `suporte_*` | Cabeçalhos de seção |
| Flores rosa / folhas | todas as folhas | Decoração global |
| Borboletas e corações | header, confirmacao, recadinho, extras | Motion sutil depois |
| Fita / laço gingham rosa | header, historia, extras | Nameplate, divisores |
| Placa “Que alegria ter você aqui!” | `suporte_elementos_recadinho.png` | Recadinhos / encerramento |
| Placa Alegria / Sorrisos / Amor | `suporte_elementos_extras.png` | Encerramento |
| Árvore, carroça, feno, bandeirinhas | `suporte_elementos_extras.png` | Hero / footer |

Duas poses úteis da vaca/ovelha: **sentadas no gramado** (header/extras) e **espiando a cerca** (confirmação/recadinho/local). Manter no máximo essas duas, não uma por seção.

---

## 6. O que NÃO deve virar imagem

Reconstruir em HTML/CSS/React:

- Títulos e textos (“Cecília”, “1 aninho”, “Era uma vez…”, perguntas, avisos)
- Card de data / horário / local
- Tiles do countdown
- Botões (RSVP, enviar recadinho, Google Maps, ver fotos)
- Inputs, textarea, counter, labels
- Cards de mensagem e dots do carrossel
- Molduras da galeria e tag “1 aninho”
- Card de endereço e pin do mapa
- Ícones (Lucide), não recortes de botão da folha

---

## 7. Pipeline de assets (Onda 03) — publicado

Arquivos em `public/images/` (WebP, transparência quando necessário). Script: `npm run assets:publish`.

```text
baby/cecilia.webp
animals/cow-sitting.webp, cow-peeking.webp
animals/sheep-sitting.webp, sheep-peeking.webp
animals/pig.webp, pony.webp, chick.webp, duck.webp
animals/bunny.webp, puppy.webp, rooster.webp
farm/barn.webp, fence-gate.webp, plaque-heart.webp
farm/sign-convidado.webp, tree.webp, swing.webp, hay.webp
flowers/strip.webp, cluster.webp
decorations/butterfly.webp, butterfly-spot.webp
decorations/heart.webp, bow-gingham.webp, ribbon-gingham.webp, bee.webp
backgrounds/hero.webp
gallery/01.webp … 06.webp   ← placeholders da identidade até fotos reais
```

Regras cumpridas:

- Folhas `suporte_*` não foram publicadas inteiras.
- Foto da Cecília isolada (sem a vaca colada no recorte automático).
- Uma versão canônica por animal (sentada + espiando a cerca).
- Botões, countdown e textos rastreados não viraram imagem.
- Galeria usa cenas da fazendinha como mock.

---

## 8. Tipografia — recomendação para a Onda 02

Nenhuma fonte veio no design. Escolher a que mais se aproxima da referência, sem Inter/Arial.

| Papel | Recomendação | Por quê |
|---|---|---|
| Script de títulos (“Cecília”, “Era uma vez…”, trechos em rosa cursivo) | **Great Vibes** (Google Fonts) | Caligrafia fluida, elegante, próxima das placas. Evitar Puppies Play/Pacifico (demasiado casual). Reserva: **Allura**. |
| Corpo, labels, botões, countdown | **Nunito** | Sans arredondada, infantil sem ser cartaz de festa. Boa leitura no mobile. Evitar Inter. |
| Ênfase pequena (“DATA”, “HORÁRIO”, “1 aninho” em caixa alta) | Nunito ExtraBold ou **Nunito Sans** | Hierarquia sem segunda família desnecessária. |

Confirmar contraste e tamanho na Onda 02 ao criar tokens. Não instalar fontes nesta onda.

---

## 9. Riscos que a Onda 01 deve respeitar

1. Ainda não há app — Onda 01 cria Next.js + App Router + TypeScript + Tailwind + pastas vazias + mocks.
2. ~29 MB de PNG crus: não copiar `/design` inteiro para `public/`.
3. Composições de seção não são a página final.
4. Countdown 4 colunas e galeria 1+6 quebram em 320px — prever stack no mobile desde a estrutura.
5. Menu hamburger e WhatsApp existem só na OnePage; podem ficar como placeholders discretos, dados mockados.

---

## 10. Critério da Onda 00

- [x] `PROJECT_CONTEXT.md` lido
- [x] Estrutura do repositório verificada
- [x] Stack atual verificada (ainda inexistente)
- [x] Arquivos de `/design` listados, visualizados, medidos
- [x] Formatos, dimensões e transparências identificados
- [x] Duplicações e assets reutilizáveis identificados
- [x] Arquivos que precisam de derivado/recorte identificados
- [x] Cada seção mapeada a uma referência visual
- [x] Inventário criado neste arquivo
- [x] Skill `frontend-ui-engineering` definida como obrigatória no frontend

**Onda 00 concluída.** Aguardar autorização para a **Onda 01 — Estrutura Next.js**.
