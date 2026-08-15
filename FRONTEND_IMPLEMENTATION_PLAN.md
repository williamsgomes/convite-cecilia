# Fazendinha da Cecília — Plano Completo de Implementação do Frontend

> Documento operacional para implementação do frontend no Cursor.
>
> **Documento mestre relacionado:** `PROJECT_CONTEXT.md`
>
> **Escopo:** somente frontend. Backend, Supabase, autenticação e persistência real serão implementados posteriormente conforme `BACKEND_IMPLEMENTATION_PLAN.md`.

---

# Andamento

| Onda | Nome | Status |
|---|---|---|
| 00 | Auditoria do projeto e dos arquivos | Concluída |
| 01 | Estrutura Next.js | Concluída |
| 02 | Fundamentos visuais | Concluída |
| 03 | Asset pipeline | Concluída |
| 04 | Hero | Concluída |
| 05 | História / Era uma vez | Concluída |
| 06 | Contagem regressiva | Concluída |
| 07 | RSVP | Pendente |
| 08 | Carrossel de mensagens | Pendente |
| 09 | Momentos da Cecília | Pendente |
| 10 | Guestbook | Pendente |
| 11 | Localização | Pendente |
| 12 | Footer / Final da experiência | Pendente |
| 13 | Continuidade | Pendente |
| 14 | Elementos vivos | Pendente |
| 15 | Motion System | Pendente |
| 16 | Mobile / Tablet / Desktop | Pendente |
| 17 | Otimização | Pendente |
| 18 | Accessibility Pass | Pendente |
| 19 | SEO básico | Pendente |
| 20 | Padronização dos mocks | Pendente |
| 21 | Abstração de dados | Pendente |
| 22 | Comparação com design | Pendente |
| 23 | Interações | Pendente |
| 24 | Teste final | Pendente |
| 25 | Performance final | Pendente |
| 26 | Pixel refinement | Pendente |

**Próxima:** Onda 07 — RSVP.

---

# 1. Objetivo

Construir a OnePage responsiva do convite online **Fazendinha da Cecília**, transformando os materiais visuais existentes em `/design` em uma experiência web real.

O resultado deve ser:

- visualmente fiel ao design;
- infantil e delicado;
- harmonioso;
- responsivo;
- rápido;
- acessível;
- interativo;
- com animações suaves;
- tecnicamente organizado;
- preparado para futura integração com backend.

A implementação deve preservar a essência visual do material fornecido, mas corrigir inconsistências naturais de um design produzido por inteligência artificial.

---

# 2. Regra absoluta de implementação

A referência visual não deve ser transformada em uma imagem única.

Não implementar:

```text
<section>
  <img src="/design/secao.png" />
</section>
```

como solução final.

A referência deve ser reconstruída com:

```text
React
+
HTML semântico
+
Tailwind CSS
+
CSS customizado quando necessário
+
Assets individuais
+
Motion
```

Textos, botões, contadores, formulários, cards e elementos interativos devem ser HTML/React reais.

Imagens devem ser utilizadas principalmente para:

- fotografia;
- ilustração;
- animais;
- flores;
- cercas;
- placas;
- elementos decorativos;
- fundos quando realmente necessário.

---

# 3. Regra de ouro: analisar antes de codificar

**Nenhuma onda visual deve ser implementada sem antes analisar a referência correspondente.**

Para cada seção:

1. localizar o arquivo correspondente em `/design`;
2. visualizar a imagem;
3. observar composição;
4. identificar todos os elementos;
5. identificar hierarquia;
6. identificar elementos decorativos;
7. identificar assets reutilizáveis;
8. identificar assets que precisam ser recortados;
9. identificar possíveis problemas da referência;
10. definir a adaptação responsiva;
11. implementar;
12. comparar com a referência;
13. corrigir;
14. validar;
15. só então concluir a onda.

Não confiar somente no nome do arquivo.

---

# 4. Inventário visual conhecido

A pasta `/design` contém materiais semelhantes aos seguintes:

```text
suporte_elementos_extras
suporte_elementos_localizacao
suporte_elementos_fotos
suporte_elementos_recadinho
suporte_elementos_confirmacao
suporte_elementos_historia

fundo_header_se_preciso
suporte_elementos_header

secao_localizacao
secao_fotos
secao_recadinho
secao_confirmacao
secao_historia_contador
secao_header

exemplo_one_page
```

Os nomes acima são referências de organização visual. O Cursor deve confirmar os arquivos reais existentes na pasta antes de assumir extensão, dimensões ou conteúdo.

---

# 5. Estratégia de assets

## 5.1. Assets são matéria-prima

Os arquivos não precisam ser usados exatamente como foram entregues.

É permitido:

- recortar;
- extrair;
- separar;
- remover elementos;
- recombinar;
- redimensionar;
- otimizar;
- converter;
- reaproveitar;
- criar derivados.

## 5.2. Reutilização

Priorizar reutilização.

Se a mesma vaca, flor, cerca ou placa aparece em várias referências, procurar utilizar um único asset em várias posições.

Evitar criar cópias diferentes do mesmo elemento.

## 5.3. Novos assets

É permitido gerar novos assets quando:

- o material existente não é suficiente;
- existe uma lacuna visual importante;
- determinado elemento precisa de uma versão específica;
- o recorte existente não permite boa composição.

Novos assets devem manter:

- estilo de ilustração;
- iluminação;
- paleta;
- proporção;
- acabamento;
- linguagem infantil.

Não introduzir elementos visualmente incompatíveis.

---

# 6. Preparação técnica

## Onda 00 — Auditoria do projeto e dos arquivos

### Objetivo

Conhecer o material antes de escrever componentes.

### Tarefas

- ler `PROJECT_CONTEXT.md`;
- verificar estrutura atual do projeto;
- verificar stack instalada;
- listar arquivos de `/design`;
- visualizar as imagens;
- identificar formatos;
- identificar dimensões;
- identificar transparências;
- identificar duplicações;
- identificar assets reutilizáveis;
- identificar arquivos que precisam ser derivados;
- mapear cada seção.

### Entregáveis

Criar, se necessário:

```text
docs/DESIGN_ASSET_INVENTORY.md
```

Esse inventário deve registrar:

| Asset | Tipo | Uso potencial | Reutilizável | Precisa tratamento |
|---|---|---|---|---|

### Critério de conclusão

Nenhuma seção deve permanecer sem referência visual identificada.

**Status:** concluída. Entregável em `docs/DESIGN_ASSET_INVENTORY.md`.

---

# 7. Fundação

## Onda 01 — Estrutura Next.js

### Objetivo

Criar a base técnica da OnePage.

### Implementar

- Next.js;
- App Router;
- TypeScript;
- Tailwind;
- estrutura de componentes;
- metadata;
- globals;
- organização de assets;
- mocks.

Estrutura inicial sugerida:

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── invitation/
│   ├── ui/
│   └── decorations/
│
├── lib/
├── mock/
├── types/
└── hooks/
```

### Critério

A aplicação deve iniciar e renderizar uma OnePage vazia, sem erros de TypeScript ou console.

**Status:** concluída. Next.js 16, App Router, TypeScript, Tailwind 4, mocks e DAL fina.

---

# 8. Design System

## Onda 02 — Fundamentos visuais

### Objetivo

Transformar a identidade visual da referência em padrões consistentes.

### Definir

- cores;
- tipografia;
- pesos;
- tamanhos;
- line-height;
- espaçamentos;
- radius;
- sombras;
- largura máxima;
- containers;
- botões;
- inputs;
- cards.

### Direção

Paleta base:

- rosa pastel;
- rosa principal;
- creme;
- off-white;
- marrom/madeira;
- verde suave;
- branco.

Os valores exatos devem ser extraídos/analisados das referências e ajustados para manter contraste e consistência.

### Regra

Não escolher cores arbitrariamente seção por seção.

Criar tokens reutilizáveis.

**Status:** concluída. Tokens em `src/app/globals.css`. Fontes Great Vibes + Nunito. UI: Container, Heading, Button, Card, Field, Input, Textarea.

---

# 9. Tratamento dos assets

## Onda 03 — Asset pipeline

### Objetivo

Preparar os recursos antes da implementação visual pesada.

### Tarefas

Para cada referência:

- identificar elementos reutilizáveis;
- extrair PNGs;
- remover partes desnecessárias;
- gerar versões menores quando apropriado;
- converter fotografias para formatos modernos;
- preservar transparência quando necessária;
- definir dimensões adequadas.

### Estrutura sugerida

```text
public/
└── images/
    ├── baby/
    ├── animals/
    ├── flowers/
    ├── farm/
    ├── decorations/
    ├── backgrounds/
    └── gallery/
```

### Regra

Não duplicar assets sem necessidade.

**Status:** concluída. WebP em `public/images/`. Script `npm run assets:publish`.

---

# 10. Header / Hero

## Onda 04 — Hero

### Referência

Visualizar obrigatoriamente:

```text
/design/secao_header.*
/design/suporte_elementos_header.*
/design/fundo_header_se_preciso.*
```

Confirmar os nomes/extensões reais antes da implementação.

### Objetivo

Reproduzir a abertura do convite.

### Elementos

A referência apresenta uma composição com:

- fotografia/ilustração da Cecília;
- título;
- "Fazendinha da Cecília";
- indicação de 1 aninho;
- flores;
- placa de madeira;
- animais;
- celeiro;
- cerca;
- elementos decorativos.

### Implementação

Separar:

```text
Hero
├── Background
├── Decorative elements
├── Cecília
├── Title
├── Age badge
├── Farm elements
└── Decorative animals
```

### Responsividade

Desktop:

- composição horizontal;
- criança em destaque;
- título central;
- fazenda lateral.

Mobile:

- composição vertical;
- reduzir elementos laterais;
- preservar rosto/fotografia;
- manter título legível;
- reduzir decoração antes de reduzir conteúdo.

### Animações

- entrada suave do título;
- entrada da fotografia;
- pequenos movimentos de elementos;
- microanimação decorativa;
- possível parallax extremamente sutil.

### Critério

O Hero deve ser imediatamente reconhecível como a referência.

**Status:** concluída. `src/components/invitation/Hero/`. Foto, placa HTML, card de detalhes e decorações fora do grid.

---

# 11. História

## Onda 05 — História / Era uma vez

### Referência

Visualizar:

```text
/design/secao_historia_contador.*
/design/suporte_elementos_historia.*
```

### Objetivo

Construir a seção narrativa.

### Elementos

- título "Era uma vez...";
- texto;
- fotografia;
- flores;
- animais;
- cerca;
- celeiro;
- decoração;
- integração com countdown.

### Padrões

O texto deve ser HTML.

A fotografia deve ser independente.

Os elementos decorativos devem ser posicionáveis.

### Responsividade

Desktop:

- texto e fotografia em composição equilibrada.

Mobile:

- texto primeiro;
- fotografia em seguida ou composição definida pela referência;
- decoração reduzida;
- evitar excesso de elementos laterais.

**Status:** concluída. `src/components/invitation/Story/`. Título HTML, polaroid CSS, decorações posicionáveis e cerca de transição para o countdown.

---

# 12. Countdown

## Onda 06 — Contagem regressiva

### Objetivo

Implementar o countdown real utilizando dados mockados.

### Elementos

- título;
- subtítulo;
- dias;
- horas;
- minutos;
- segundos;
- decoração;
- fita/placa/cerca conforme referência.

### Dados

Criar:

```text
mock/event.ts
```

Exemplo conceitual:

```ts
export const event = {
  eventDate: "...",
};
```

### Comportamento

Atualizar a cada segundo.

Quando o tempo terminar, apresentar um estado adequado.

### UX

Os números devem ter:

- boa legibilidade;
- alinhamento;
- largura previsível;
- transição suave;
- boa adaptação mobile.

**Status:** concluída. `src/components/invitation/Countdown/`. Timer real a partir de `eventDate`, tiles HTML 2×2 mobile / 4 colunas sm+, placa de madeira, decoração e estado pós-evento.

---

# 13. Confirmação de presença

## Onda 07 — RSVP

### Referência

Visualizar:

```text
/design/secao_confirmacao.*
/design/suporte_elementos_confirmacao.*
```

### Objetivo

Criar a seção:

> Você vem comemorar comigo?

### Elementos

- título;
- texto;
- botão "Sim, eu vou!";
- botão "Não vou";
- decoração;
- animais;
- cerca;
- feedback.

### Interação

"Sim, eu vou!":

- abrir modal/painel;
- nome;
- quantidade de convidados;
- confirmar.

"Não vou":

- abrir confirmação simples;
- registrar mock local;
- mostrar feedback.

### Estado

Criar estados:

```text
idle
loading
success
error
```

Mesmo que o envio seja apenas mockado.

### Responsividade

No mobile, os botões devem ter largura adequada e grande área de toque.

---

# 14. Recadinhos

## Onda 08 — Carrossel de mensagens

### Referência

Visualizar:

```text
/design/secao_recadinho.*
/design/suporte_elementos_recadinho.*
```

### Objetivo

Reproduzir a área de mensagens afetivas.

### Elementos

- título;
- subtítulo;
- card de mensagem;
- nome do autor;
- controles;
- indicadores;
- animais;
- flores;
- cercas;
- elementos de madeira.

### Dados

```text
mock/messages.ts
```

### Interação

- próxima;
- anterior;
- indicadores;
- swipe no mobile quando apropriado.

### UX

O texto deve permanecer legível mesmo quando houver mensagens maiores.

Evitar altura fixa que corte conteúdo.

---

# 15. Galeria

## Onda 09 — Momentos da Cecília

### Referência

Visualizar:

```text
/design/secao_fotos.*
/design/suporte_elementos_fotos.*
```

### Objetivo

Criar a galeria visual da referência.

### Desktop

Utilizar composição:

- fotografia principal;
- fotos secundárias;
- grid assimétrico;
- elementos decorativos.

### Mobile

Transformar em:

- grid;
- carrossel;
- ou composição vertical,

conforme melhor resultado.

### Regras

- não deformar fotos;
- utilizar `object-fit`;
- usar `next/image`;
- otimizar dimensões;
- lazy-load fora da área inicial.

### Interação

Possível lightbox:

- abrir;
- fechar;
- próxima;
- anterior;
- teclado;
- swipe.

---

# 16. Formulário de recadinho

## Onda 10 — Guestbook

### Referência

Visualizar a parte correspondente em:

```text
/design/secao_recadinho.*
/design/suporte_elementos_recadinho.*
```

### Campos

- nome;
- mensagem.

### Regras

- label real;
- contador de caracteres;
- validação;
- estado de envio;
- estado de sucesso;
- estado de erro.

### Mock

Ao enviar:

```text
UI
↓
mock handler
↓
success
```

Pode atualizar a lista local durante o desenvolvimento.

---

# 17. Localização

## Onda 11 — Localização

### Referência

Visualizar:

```text
/design/secao_localizacao.*
/design/suporte_elementos_localizacao.*
```

### Elementos

- título;
- endereço;
- mapa;
- informações;
- botão Google Maps;
- decoração;
- animais;
- flores;
- cerca.

### Mapa

Na primeira fase, não utilizar API de mapa complexa.

Pode utilizar:

- imagem/mock visual;
- iframe simples;
- composição estática,

desde que a referência seja respeitada.

O botão pode utilizar URL mockada.

### Responsividade

O mapa deve possuir altura adequada no mobile.

Não permitir que o mapa domine a tela.

---

# 18. Encerramento

## Onda 12 — Footer / Final da experiência

### Objetivo

Reproduzir a parte final do convite.

Utilizar os elementos visuais presentes nas referências.

Priorizar:

- sensação de encerramento;
- continuidade visual;
- cerca;
- flores;
- placa;
- coração;
- mensagem final.

Evitar criar um footer corporativo tradicional.

É um encerramento de convite, não um rodapé de website comercial.

---

# 19. Integração visual entre seções

## Onda 13 — Continuidade

### Objetivo

Garantir que a OnePage pareça uma única composição.

### Revisar

- fundos;
- transições;
- espaçamentos;
- cercas;
- flores;
- elementos de madeira;
- paleta;
- sombras;
- bordas;
- repetição de elementos.

As seções não devem parecer páginas independentes empilhadas.

Criar continuidade.

---

# 20. Ondas decorativas

## Onda 14 — Elementos vivos

Adicionar animações e microinterações aos elementos decorativos.

Possibilidades:

- borboletas;
- flores;
- folhas;
- animais;
- elementos de madeira;
- pequenos movimentos de entrada.

### Regras

Movimentos devem ser:

- lentos;
- sutis;
- orgânicos;
- leves.

Não utilizar animações constantes e agressivas.

---

# 21. Animações globais

## Onda 15 — Motion System

Criar padrões de animação reutilizáveis.

Exemplos:

```text
fadeUp
fadeIn
scaleIn
slideLeft
slideRight
```

Criar também componentes/utilitários quando isso simplificar o código.

### Scroll reveal

As seções podem entrar suavemente conforme o usuário navega.

### Stagger

Utilizar em:

- cards;
- pequenos elementos;
- galeria;
- indicadores.

### Regra

Não animar tudo.

A animação deve criar vida, não distrair.

---

# 22. Responsividade global

## Onda 16 — Mobile / Tablet / Desktop

### Objetivo

Fazer uma revisão dedicada de responsividade.

Testar pelo menos:

- 320px;
- 360px;
- 390px;
- 414px;
- 768px;
- 1024px;
- 1280px;
- 1440px;
- telas maiores.

### Verificar

- overflow;
- largura dos textos;
- posição das imagens;
- proporção;
- botões;
- inputs;
- cards;
- espaçamento;
- decoração;
- navegação.

### Regra

Se a referência desktop não funciona no mobile, adaptar a composição.

Não reduzir indiscriminadamente.

---

# 23. Performance

## Onda 17 — Otimização

### Imagens

Revisar:

- dimensões;
- formato;
- compressão;
- lazy loading;
- prioridade;
- duplicações.

### Código

Revisar:

- imports;
- componentes;
- dependências;
- JavaScript enviado;
- renderizações;
- listeners.

### Animações

Evitar:

- layout thrashing;
- animação de propriedades pesadas;
- excesso de filtros;
- parallax caro.

Preferir transform e opacity.

---

# 24. Acessibilidade

## Onda 18 — Accessibility Pass

### Revisar

- headings;
- labels;
- buttons;
- links;
- alt;
- focus;
- keyboard;
- dialogs;
- carrosséis;
- lightbox;
- contraste;
- reduced motion.

### Modais

Precisam:

- prender foco;
- permitir Escape;
- devolver foco ao elemento de origem;
- possuir nome acessível.

---

# 25. SEO e metadata

## Onda 19 — SEO básico

Implementar:

- title;
- description;
- Open Graph;
- favicon;
- viewport;
- metadata.

A OnePage deve ter uma representação adequada quando compartilhada em redes sociais.

---

# 26. Mock Data Layer

## Onda 20 — Padronização dos mocks

Consolidar:

```text
mock/
├── event.ts
├── messages.ts
├── gallery.ts
└── rsvp.ts
```

Criar tipos:

```text
types/
├── event.ts
├── message.ts
├── gallery.ts
└── rsvp.ts
```

A UI não deve depender de objetos anônimos espalhados pelo projeto.

---

# 27. Data Access Layer preparada para backend

## Onda 21 — Abstração de dados

Criar uma camada que permita futuramente trocar:

```text
mock
```

por:

```text
Supabase
```

Exemplo conceitual:

```text
components
    ↓
hooks / services
    ↓
data provider
    ↓
mock
```

No futuro:

```text
components
    ↓
hooks / services
    ↓
data provider
    ↓
Supabase
```

A interface não deve precisar saber onde o dado está armazenado.

---

# 28. QA visual por seção

## Onda 22 — Comparação com design

Cada seção deve ser comparada visualmente com sua referência.

Para cada seção verificar:

### Composição

- posição;
- tamanho;
- proporção.

### Tipografia

- família;
- peso;
- tamanho;
- line-height;
- alinhamento.

### Cores

- fundo;
- texto;
- botões;
- elementos.

### Imagens

- crop;
- escala;
- posição;
- qualidade.

### Decoração

- flores;
- animais;
- cercas;
- placas;
- madeira.

### Espaçamento

- padding;
- margin;
- distância entre elementos.

---

# 29. QA funcional

## Onda 23 — Interações

Testar:

- countdown;
- RSVP;
- modal;
- formulário;
- recadinho;
- carrossel;
- galeria;
- lightbox;
- localização;
- links;
- botões.

Nenhuma interação deve possuir comportamento morto.

---

# 30. QA responsivo

## Onda 24 — Teste final

Testar:

```text
320
360
390
414
480
768
834
1024
1280
1440
1920
```

Verificar:

- overflow horizontal;
- scroll;
- elementos cortados;
- fontes;
- imagens;
- modais;
- formulários;
- carrosséis;
- animações.

---

# 31. QA de performance

## Onda 25 — Performance final

Verificar:

- tamanho das imagens;
- quantidade de requests;
- carregamento inicial;
- assets acima da dobra;
- lazy loading;
- JS;
- CSS;
- fontes;
- animações.

Priorizar uma boa experiência em rede móvel.

---

# 32. Refinamento final

## Onda 26 — Pixel refinement

Depois de tudo funcional:

Revisar seção por seção procurando:

- desalinhamentos;
- inconsistências;
- excesso de decoração;
- espaços vazios;
- elementos pequenos demais;
- elementos grandes demais;
- tipografia;
- cores;
- sombras;
- bordas;
- transições;
- continuidade.

Não iniciar grandes refatorações nesta fase sem necessidade.

Priorizar ajustes de acabamento.

---

# 33. Checklist final do frontend

## Design

- [ ] Todas as referências foram visualizadas.
- [ ] Todas as seções foram implementadas.
- [ ] A identidade da referência foi preservada.
- [ ] Inconsistências do design gerado por IA foram corrigidas.
- [ ] Elementos foram reutilizados quando possível.
- [ ] Assets foram tratados quando necessário.

## Responsividade

- [ ] 320px validado.
- [ ] 360px validado.
- [ ] 390px validado.
- [ ] 414px validado.
- [ ] 768px validado.
- [ ] 1024px validado.
- [ ] 1280px validado.
- [ ] 1440px validado.
- [ ] Não existe overflow horizontal.

## Interações

- [x] Countdown funciona.
- [ ] RSVP funciona.
- [ ] Modal funciona.
- [ ] Recadinhos funcionam.
- [ ] Carrossel funciona.
- [ ] Galeria funciona.
- [ ] Lightbox funciona, se implementado.
- [ ] Localização funciona.

## Animações

- [ ] Entrada das seções.
- [ ] Microinterações.
- [ ] Elementos decorativos.
- [ ] Carrossel.
- [ ] Galeria.
- [ ] Reduced motion.

## Performance

- [ ] Imagens otimizadas.
- [ ] Assets reutilizados.
- [ ] Imagens grandes não carregam desnecessariamente.
- [ ] Lazy loading aplicado.
- [ ] Dependências revisadas.

## Acessibilidade

- [ ] HTML semântico.
- [ ] Labels.
- [ ] Alt.
- [ ] Keyboard.
- [ ] Focus.
- [ ] Modal acessível.
- [ ] Contraste.
- [ ] Reduced motion.

---

# 34. Regra para avanço entre ondas

Uma onda somente pode ser marcada como concluída quando:

1. o código estiver implementado;
2. não houver erro de build;
3. não houver erro relevante no console;
4. a referência visual tiver sido analisada;
5. a seção tiver sido visualmente comparada;
6. desktop estiver validado;
7. mobile estiver validado;
8. as interações estiverem funcionando;
9. os assets estiverem otimizados;
10. o critério específico da onda tiver sido cumprido.

Não avançar acumulando problemas conhecidos.

Se uma inconsistência for encontrada, corrigir antes de iniciar a próxima onda quando ela impactar a arquitetura ou a identidade visual.

---

# 35. Regra para o Cursor

Antes de executar uma onda:

```text
1. Ler PROJECT_CONTEXT.md
2. Ler esta onda
3. Localizar referências em /design
4. Visualizar as referências
5. Identificar assets
6. Implementar
7. Rodar validações
8. Comparar visualmente
9. Corrigir
10. Marcar a onda como concluída
```

Não assumir que uma imagem pode ser usada sem análise.

Não ignorar arquivos existentes.

Não inventar uma identidade visual diferente.

Não conectar Supabase nesta fase.

Não criar versões separadas para desktop e mobile.

Não transformar a OnePage em várias páginas.

---

# 36. Critério final

O frontend estará concluído quando o resultado puder ser descrito como:

> **Uma experiência digital de convite infantil premium, fiel à identidade da Fazendinha da Cecília, construída como uma OnePage real, responsiva, rápida, acessível, interativa e preparada para receber o backend posteriormente.**

A imagem de referência deve ser reconhecível.

Mas a implementação deve ser tecnicamente superior à imagem original quando necessário.

A prioridade final é:

```text
IDENTIDADE VISUAL
        ↓
FIDELIDADE AO DESIGN
        ↓
RESPONSIVIDADE
        ↓
UX
        ↓
PERFORMANCE
        ↓
ACESSIBILIDADE
        ↓
ANIMAÇÃO
        ↓
MANUTENIBILIDADE
```

---

# 37. Próxima fase

Após a conclusão desta documentação e de todas as ondas do frontend:

```text
Frontend Mockado
       ↓
Validação visual
       ↓
Validação responsiva
       ↓
Validação funcional
       ↓
BACKEND_IMPLEMENTATION_PLAN.md
       ↓
Supabase
       ↓
Data Access Layer
       ↓
Integração
       ↓
Produção
```

O frontend não deve depender da existência do backend para ser considerado completo nesta primeira fase.
