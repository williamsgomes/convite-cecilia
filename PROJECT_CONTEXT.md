# Fazendinha da Cecília — Contexto Geral do Projeto 

> Documento de contexto geral para uso no Cursor.
> Este arquivo é a fonte de contexto funcional, técnico e arquitetural do projeto.
> Os planos detalhados de Frontend e Backend são documentos complementares e devem ser consultados conforme a etapa de implementação.

---

## 1. Identificação do projeto

**Nome:** Fazendinha da Cecília  
**Tipo:** Convite online infantil de aniversário  
**Formato:** OnePage responsiva  
**Objetivo:** Criar uma experiência digital de convite de aniversário de 1 ano, visualmente rica, delicada, interativa e otimizada para dispositivos móveis.

O produto deve transmitir a sensação de um convite físico infantil premium transformado em uma experiência web.

A identidade visual é baseada em uma fazendinha infantil com:

- tons pastel;
- rosa suave;
- creme/off-white;
- madeira clara;
- verde suave;
- flores;
- animais de fazenda;
- cercas;
- celeiro;
- placas de madeira;
- borboletas;
- elementos artesanais;
- fotografia da Cecília;
- ilustrações infantis.

A referência visual deve ser preservada, mas convertida em uma interface web profissional.

---

# 2. Objetivo desta documentação

Este documento define o contexto geral que deve ser mantido durante todo o desenvolvimento.

Existirão três documentos principais no projeto:

1. `PROJECT_CONTEXT.md`
2. `FRONTEND_IMPLEMENTATION_PLAN.md`
3. `BACKEND_IMPLEMENTATION_PLAN.md`

O `PROJECT_CONTEXT.md` define as decisões globais e regras que não devem ser perdidas durante a implementação.

O `FRONTEND_IMPLEMENTATION_PLAN.md` descreve a implementação visual e funcional do frontend em ondas, seção por seção.

O `BACKEND_IMPLEMENTATION_PLAN.md` descreve a implementação do backend em ondas, desde o modelo de dados até a integração completa com o frontend.

---

# 3. Princípio fundamental

Este projeto não deve ser tratado como uma simples conversão de uma imagem para HTML.

A referência visual é o resultado de uma composição criada com inteligência artificial e possui arquivos brutos na pasta `/design`.

Portanto:

> A referência define a identidade visual e a intenção artística. O código deve transformar essa intenção em uma interface web real, responsiva, acessível, performática e consistente.

Não reproduzir cegamente erros presentes na arte.

Não descaracterizar a identidade visual em nome de padrões genéricos.

O objetivo é encontrar o equilíbrio entre:

**fidelidade visual + UX + responsividade + performance + acessibilidade + consistência.**

---

# 4. Fonte visual do projeto

A pasta:

```text
/design
```

é a principal fonte visual do projeto.

Ela contém materiais brutos, incluindo:

- referências completas de seções;
- exemplo de OnePage;
- imagens de composição;
- PNGs transparentes;
- animais;
- flores;
- cercas;
- placas;
- elementos de madeira;
- fundos;
- componentes decorativos;
- imagens da Cecília;
- elementos que podem ser extraídos e reutilizados.

Os arquivos não devem ser considerados necessariamente assets finais.

Cada arquivo deve ser analisado visualmente antes de ser utilizado.

---

# 5. Regras para os arquivos de design

Os arquivos de `/design` podem ser:

- recortados;
- fatiados;
- tratados;
- extraídos;
- redimensionados;
- otimizados;
- convertidos;
- recombinados;
- reutilizados em outras seções;
- usados como referência para criação de novos assets.

Se um arquivo contém vários elementos e somente um deles é necessário, extrair somente o elemento necessário.

Se o mesmo elemento aparece em várias seções, preferir reutilizar o mesmo asset.

Se um asset existente não possui qualidade ou proporção adequada, ele pode ser tratado ou substituído por uma nova versão coerente com o design.

Novas imagens podem ser geradas quando realmente necessário para completar uma composição, desde que respeitem rigorosamente a identidade visual existente.

---

# 6. Regra de análise visual por seção

Toda seção do frontend deve seguir obrigatoriamente este processo:

1. Identificar a imagem correspondente na pasta `/design`.
2. Visualizar a imagem.
3. Identificar todos os elementos visuais presentes.
4. Identificar quais elementos são conteúdo e quais são decoração.
5. Identificar assets existentes que podem ser reutilizados.
6. Identificar elementos que precisam ser recortados.
7. Definir a hierarquia visual.
8. Definir comportamento responsivo.
9. Implementar.
10. Comparar visualmente com a referência.
11. Corrigir diferenças relevantes.
12. Só então considerar a seção concluída.

Não implementar uma seção apenas a partir do nome do arquivo.

A imagem da seção deve ser efetivamente analisada.

---

# 7. OnePage

O produto será uma única OnePage.

Não criar versões independentes para desktop e mobile.

A mesma aplicação deve responder a:

- mobile pequeno;
- mobile grande;
- tablet;
- notebook;
- desktop;
- telas grandes.

A composição pode mudar conforme a largura:

- elementos podem ser reposicionados;
- grids podem virar colunas;
- elementos decorativos podem desaparecer;
- tamanhos podem mudar;
- alinhamentos podem mudar;
- espaçamentos podem ser adaptados.

Mas a base estrutural deve ser a mesma.

---

# 8. Stack oficial

## Frontend

- Next.js
- React
- TypeScript
- App Router
- Tailwind CSS
- Motion for React
- Lucide React
- Next/Image

## Hospedagem

- Vercel

## Backend

- Next.js Server Actions / Route Handlers quando apropriado
- Supabase

## Banco

- PostgreSQL através do Supabase

## Autenticação

- Supabase Auth, somente para áreas administrativas caso necessário.

## Storage

- Supabase Storage, quando a galeria ou uploads administráveis exigirem armazenamento persistente.

---

# 9. Estratégia de desenvolvimento

O desenvolvimento será dividido em três grandes fases.

## Fase 1 — Frontend isolado

Tudo mockado.

Objetivo:

- finalizar design;
- finalizar responsividade;
- finalizar interações;
- finalizar animações;
- finalizar performance;
- validar UX.

Nenhum banco ou backend deve bloquear essa fase.

## Fase 2 — Backend

Criar:

- banco;
- schema;
- RLS;
- APIs/actions;
- autenticação administrativa;
- persistência;
- validações;
- storage;
- administração.

## Fase 3 — Integração

Substituir os mocks pelos serviços reais sem reescrever a interface.

---

# 10. Arquitetura conceitual

A arquitetura desejada é:

```text
UI
 ↓
Componentes
 ↓
Camada de dados
 ↓
Backend
 ↓
Supabase
```

Durante a fase inicial:

```text
UI
 ↓
Componentes
 ↓
Mock Data
```

Depois:

```text
UI
 ↓
Componentes
 ↓
Data Access Layer
 ↓
Next.js Server Actions / Route Handlers
 ↓
Supabase
```

Os componentes visuais não devem depender diretamente de detalhes do banco.

---

# 11. Regra importante sobre Supabase

Supabase não deve ser introduzido durante a primeira fase do frontend.

Durante o desenvolvimento inicial, utilizar mocks.

A integração real deve acontecer somente quando:

- o layout estiver validado;
- os componentes estiverem estabilizados;
- os fluxos estiverem definidos;
- o modelo de dados estiver planejado.

---

# 12. Estrutura conceitual de componentes

A estrutura esperada é semelhante a:

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── admin/
│
├── components/
│   ├── invitation/
│   │   ├── Hero.tsx
│   │   ├── Story.tsx
│   │   ├── Countdown.tsx
│   │   ├── Rsvp.tsx
│   │   ├── Messages.tsx
│   │   ├── Gallery.tsx
│   │   ├── Guestbook.tsx
│   │   ├── Location.tsx
│   │   └── Footer.tsx
│   │
│   ├── ui/
│   └── decorations/
│
├── lib/
│   ├── utils.ts
│   └── ...
│
├── mock/
│   ├── event.ts
│   ├── messages.ts
│   ├── gallery.ts
│   └── rsvp.ts
│
├── types/
│   └── ...
│
└── public/
    └── images/
```

A estrutura pode ser refinada durante a implementação, mas deve preservar separação de responsabilidades.

---

# 13. Seções principais do convite

A OnePage deverá contemplar, conforme o design:

1. Hero / Header
2. História / Introdução
3. Countdown
4. Confirmação de presença
5. Recadinhos
6. Momentos da Cecília / Galeria
7. Formulário de recadinho
8. Localização
9. Encerramento / Footer

A ordem final deve ser definida a partir da análise dos arquivos de `/design`.

---

# 14. Regras de UI/UX

O site deve ser:

- infantil;
- delicado;
- intuitivo;
- rápido;
- legível;
- emocional;
- visualmente rico sem ser poluído.

Não utilizar padrões genéricos de SaaS.

Não transformar o convite em uma landing page corporativa.

A decoração deve complementar o conteúdo, nunca competir com ele.

---

# 15. Responsividade

Mobile é prioridade.

Nunca considerar mobile como uma versão reduzida do desktop.

Evitar:

- overflow horizontal;
- textos cortados;
- imagens deformadas;
- elementos sobrepostos de forma incorreta;
- botões pequenos;
- fontes ilegíveis;
- espaços exagerados;
- elementos decorativos bloqueando conteúdo.

A interface deve ser projetada para toque.

---

# 16. Animações

Utilizar Motion for React.

As animações devem:

- ser suaves;
- reforçar a temática infantil;
- criar sensação de vida;
- melhorar a navegação;
- não prejudicar performance.

Possibilidades:

- reveal de seções;
- fade;
- pequenos deslocamentos;
- floating de borboletas;
- movimentos sutis de flores;
- microinterações de botões;
- transições de carrossel;
- abertura de galeria;
- pequenos efeitos de profundidade.

Evitar animações excessivas.

Sempre respeitar `prefers-reduced-motion`.

---

# 17. Performance

Como o projeto possui muitos assets gráficos, performance é prioridade.

Regras:

- utilizar `next/image`;
- otimizar imagens;
- reutilizar assets;
- evitar duplicação;
- utilizar WebP/AVIF quando apropriado;
- manter PNG para transparência quando necessário;
- utilizar lazy loading;
- não carregar assets pesados sem necessidade;
- evitar bibliotecas desnecessárias;
- evitar animações custosas.

---

# 18. Assets e reutilização

Priorizar reutilização.

Exemplo:

```text
cow.png
```

pode ser reutilizado em diversas seções.

Não criar quatro arquivos diferentes da mesma vaca apenas porque ela aparece quatro vezes.

O mesmo vale para:

- flores;
- cercas;
- placas;
- borboletas;
- animais;
- elementos de madeira.

A composição pode variar por CSS e posicionamento.

---

# 19. Acessibilidade

Implementar:

- HTML semântico;
- headings organizados;
- labels;
- alt text;
- foco visível;
- navegação por teclado;
- botões reais;
- contraste adequado;
- áreas de toque adequadas.

Elementos puramente decorativos não devem poluir a árvore de acessibilidade.

---

# 20. Dados mockados

Os mocks devem ser separados da UI.

Exemplo:

```text
mock/
├── event.ts
├── messages.ts
├── gallery.ts
└── rsvp.ts
```

A UI deve consumir os dados através de interfaces/tipos.

Isso permitirá substituir os mocks por Supabase futuramente.

---

# 21. Modelo conceitual de dados

O backend provavelmente trabalhará inicialmente com entidades semelhantes a:

### Event

```text
id
name
age
description
event_date
location_name
location_address
maps_url
created_at
updated_at
```

### RSVP

```text
id
event_id
name
phone
status
guests
created_at
updated_at
```

### Message

```text
id
event_id
name
message
approved
created_at
updated_at
```

### Gallery

```text
id
event_id
image_url
caption
sort_order
created_at
updated_at
```

Esse modelo é conceitual e deverá ser validado no plano de backend antes de ser implementado.

---

# 22. Segurança

Quando o backend for implementado:

- nunca expor chaves secretas no frontend;
- utilizar variáveis de ambiente;
- utilizar RLS no Supabase;
- separar operações públicas e administrativas;
- validar dados no servidor;
- não confiar somente em validação client-side;
- controlar uploads;
- controlar tamanho e formato de arquivos;
- evitar exposição desnecessária de dados.

---

# 23. RSVP e recadinhos

O convite terá dois fluxos públicos principais:

## RSVP

Visitante:

```text
Sim, eu vou
```

ou:

```text
Não vou
```

Pode informar:

- nome;
- quantidade de convidados;
- demais campos definidos posteriormente.

## Recadinho

Visitante:

```text
nome
+
mensagem
```

O recado pode entrar inicialmente como pendente.

A administração poderá posteriormente:

- aprovar;
- ocultar;
- excluir.

---

# 24. Área administrativa

A área administrativa não faz parte da primeira etapa visual pública, mas a arquitetura deve permitir sua criação.

Possíveis funções:

- visualizar confirmações;
- visualizar quantidade de convidados;
- aprovar recadinhos;
- excluir recadinhos;
- administrar galeria;
- editar informações do evento;
- visualizar métricas simples.

O escopo exato será definido no `BACKEND_IMPLEMENTATION_PLAN.md`.

---

# 25. Imagens

Fotos da Cecília são conteúdo importante e devem preservar qualidade.

Não alterar características faciais da criança.

Não aplicar transformações que descaracterizem as fotografias originais.

A edição permitida nesta etapa é voltada a:

- recorte;
- enquadramento;
- otimização;
- máscara;
- composição;
- tratamento visual coerente com o layout.

---

# 26. Regra de fidelidade visual

A fidelidade deve ser avaliada por:

- composição;
- hierarquia;
- cores;
- elementos;
- proporções;
- sensação;
- identidade.

Não significa copiar pixels literalmente.

Se a referência tiver um elemento impossível ou inadequado para uma interface responsiva, adaptar mantendo a intenção.

---

# 27. Critério de conclusão

O frontend somente deve ser considerado concluído quando:

- todas as seções estiverem implementadas;
- todas forem responsivas;
- as imagens de referência tiverem sido analisadas;
- os assets relevantes tiverem sido aproveitados;
- os assets pesados tiverem sido otimizados;
- as interações estiverem funcionando;
- o countdown funcionar;
- RSVP estiver mockado;
- recadinhos estiverem mockados;
- galeria estiver funcional;
- animações estiverem refinadas;
- não existir overflow horizontal;
- mobile estiver validado;
- desktop estiver validado;
- acessibilidade básica estiver validada.

---

# 28. Critério de conclusão do backend

O backend somente deve ser considerado concluído quando:

- banco estiver estruturado;
- migrations/schema estiverem documentados;
- RLS estiver implementado;
- operações públicas estiverem protegidas;
- operações administrativas estiverem autenticadas;
- validações server-side estiverem implementadas;
- storage estiver configurado quando necessário;
- APIs/Server Actions estiverem funcionando;
- mocks puderem ser substituídos pelos dados reais;
- frontend estiver integrado;
- erros estiverem tratados;
- segurança básica estiver validada.

---

# 29. Documentos complementares

## Frontend

Arquivo:

```text
FRONTEND_IMPLEMENTATION_PLAN.md
```

Formato:

**Markdown (`.md`)**

Conteúdo esperado:

- análise da referência;
- inventário de assets;
- design system;
- arquitetura;
- ondas de implementação;
- cada seção individualmente;
- análise visual de cada seção;
- assets necessários;
- cortes/extrações;
- implementação;
- responsividade;
- animações;
- validação visual;
- critérios de conclusão.

Cada onda deverá obrigatoriamente exigir a leitura e visualização da imagem correspondente em `/design`.

---

## Backend

Arquivo:

```text
BACKEND_IMPLEMENTATION_PLAN.md
```

Formato:

**Markdown (`.md`)**

Conteúdo esperado:

- arquitetura;
- Supabase;
- banco;
- schema;
- migrations;
- tipos;
- RLS;
- autenticação;
- Server Actions / Route Handlers;
- storage;
- RSVP;
- mensagens;
- galeria;
- administração;
- validações;
- segurança;
- integração;
- testes;
- deploy;
- observabilidade básica;
- ondas de implementação.

---

# 30. Regras para o Cursor

Antes de implementar qualquer funcionalidade:

1. Ler este documento.
2. Ler o plano específico da etapa atual.
3. Analisar os arquivos relevantes em `/design`.
4. Visualizar as referências correspondentes.
5. Não assumir que o nome do arquivo é suficiente.
6. Não ignorar assets existentes.
7. Não criar duplicações desnecessárias.
8. Preservar a identidade visual.
9. Corrigir inconsistências quando necessário.
10. Não implementar backend durante a fase de frontend.
11. Não implementar Supabase antes da fase definida no plano.
12. Não alterar a arquitetura global sem justificar a mudança.
13. Manter componentes desacoplados da camada de dados.
14. Priorizar responsividade.
15. Validar visualmente cada seção antes de avançar.

---

# 31. Regra de trabalho por ondas

O desenvolvimento será incremental.

Cada onda deve:

1. possuir objetivo claro;
2. possuir escopo delimitado;
3. listar arquivos envolvidos;
4. definir pré-requisitos;
5. analisar a referência;
6. implementar;
7. testar;
8. validar visualmente;
9. corrigir;
10. somente então avançar.

Não implementar várias ondas simultaneamente sem necessidade.

Uma onda concluída deve deixar o projeto em estado funcional.

---

# 32. Princípio final

O projeto deve ser desenvolvido com a mentalidade:

> **"Não estamos transformando uma imagem em um site. Estamos transformando uma identidade visual de convite em um produto digital real."**

A prioridade é entregar uma OnePage:

**fiel + responsiva + rápida + interativa + acessível + bonita + tecnicamente sustentável.**

Toda decisão futura deve ser compatível com esse princípio.
