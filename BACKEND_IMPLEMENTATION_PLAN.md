# Fazendinha da Cecília — Plano Completo de Implementação do Backend

> Documento operacional para implementação do backend e integração completa do convite.
>
> **Documento mestre:** `PROJECT_CONTEXT.md`
>
> **Frontend:** `FRONTEND_IMPLEMENTATION_PLAN.md`
>
> **Escopo:** transformar o frontend inicialmente mockado em uma aplicação integrada, persistente, segura e pronta para produção.

---

# 1. Objetivo

Implementar o backend completo do convite online **Fazendinha da Cecília**, mantendo o frontend visual já construído e substituindo gradualmente os dados mockados por dados reais.

O backend deverá suportar:

- informações do evento;
- confirmação de presença;
- recusa de presença;
- recadinhos;
- aprovação/moderação de recadinhos;
- galeria;
- armazenamento de imagens;
- área administrativa;
- autenticação administrativa;
- segurança;
- validação;
- persistência;
- integração com o frontend;
- deploy em produção.

A implementação deve ser incremental.

Não reescrever o frontend desnecessariamente.

---

# 2. Arquitetura oficial

Arquitetura desejada:

```text
Browser
   ↓
Next.js / React
   ↓
Server Components / Client Components
   ↓
Data Access Layer
   ↓
Server Actions / Route Handlers
   ↓
Supabase
   ├── PostgreSQL
   ├── Auth
   └── Storage
```

Quando uma operação não precisar de API pública, preferir Server Actions ou acesso server-side apropriado.

Quando houver necessidade de endpoint HTTP explícito, utilizar Route Handlers.

---

# 3. Princípios fundamentais

## 3.1. Backend não deve conhecer detalhes visuais

O backend fornece dados e regras.

Ele não deve depender da estrutura visual dos componentes.

## 3.2. Frontend não deve conhecer detalhes do banco

Componentes não devem possuir queries SQL ou chamadas Supabase espalhadas.

Usar uma camada de acesso a dados.

## 3.3. Segurança no servidor

Nunca confiar somente na validação do cliente.

Toda entrada pública deve ser validada no servidor.

## 3.4. Mocks devem ser substituíveis

O objetivo é substituir:

```text
Mock Data
```

por:

```text
Real Data
```

sem alterar significativamente os componentes.

---

# 4. Stack do backend

## Plataforma

- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Storage

## Aplicação

- Next.js
- Server Actions
- Route Handlers
- TypeScript

## Validação

Preferencialmente utilizar uma biblioteca de schema validation leve, como Zod, caso ela já esteja alinhada ao projeto.

Não adicionar dependências sem necessidade.

## Deploy

- Vercel
- Supabase

---

# 5. Onda 00 — Auditoria do frontend

## Objetivo

Entender exatamente o que o backend precisa fornecer antes de criar banco.

### Ler

```text
PROJECT_CONTEXT.md
FRONTEND_IMPLEMENTATION_PLAN.md
```

### Analisar

- todos os mocks;
- tipos;
- componentes;
- formulários;
- countdown;
- mensagens;
- galeria;
- localização;
- RSVP;
- área administrativa planejada.

### Resultado

Criar uma matriz:

| Recurso | Mock atual | Persistência necessária | Admin | Público |
|---|---|---|---|---|
| Evento | sim | sim | sim | sim |
| RSVP | sim | sim | sim | sim |
| Recadinhos | sim | sim | sim | sim |
| Galeria | sim | sim | sim | sim |
| Localização | sim | sim | sim | sim |

### Critério

Nenhuma funcionalidade existente deve ficar sem estratégia de persistência definida.

---

# 6. Onda 01 — Arquitetura de dados

## Objetivo

Definir o modelo antes de criar tabelas.

Entidades iniciais:

```text
events
rsvps
messages
gallery_items
profiles/admins
```

O modelo pode ser refinado conforme a análise final do frontend.

---

# 7. Onda 02 — Evento

## Tabela conceitual

```text
events
```

Campos sugeridos:

```text
id
name
age
description
event_date
location_name
location_address
maps_url
location_lat
location_lng
created_at
updated_at
```

### Regras

O convite deve trabalhar com um `event_id`.

Mesmo que exista apenas um evento hoje, evitar criar um backend completamente dependente de valores hardcoded.

---

# 8. Onda 03 — RSVP

## Tabela

```text
rsvps
```

Campos:

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

Status possíveis:

```text
confirmed
declined
```

Se necessário, adicionar:

```text
pending
```

### Regras

- nome obrigatório;
- quantidade válida;
- evento válido;
- status controlado;
- sanitização;
- validação server-side.

Não aceitar valores arbitrários para status.

---

# 9. Onda 04 — Recadinhos

## Tabela

```text
messages
```

Campos:

```text
id
event_id
name
message
approved
created_at
updated_at
```

Opcionalmente:

```text
approved_at
```

### Fluxo

```text
Visitante
   ↓
Envia mensagem
   ↓
Backend valida
   ↓
approved = false
   ↓
Admin revisa
   ↓
Aprova
   ↓
Mensagem aparece no convite
```

Nunca publicar diretamente uma mensagem pública sem passar pela regra de moderação definida.

---

# 10. Onda 05 — Galeria

## Tabela

```text
gallery_items
```

Campos:

```text
id
event_id
storage_path
public_url
alt_text
caption
sort_order
published
created_at
updated_at
```

### Regras

A ordem deve ser controlável.

Um item pode ser:

```text
published = true
```

ou:

```text
published = false
```

Isso permite preparar imagens sem publicá-las imediatamente.

---

# 11. Onda 06 — Administração

## Objetivo

Definir como usuários administrativos serão identificados.

Utilizar:

**Supabase Auth**

Não criar autenticação própria com senha armazenada manualmente.

### Fluxo

```text
Admin
 ↓
Login
 ↓
Supabase Auth
 ↓
Session
 ↓
Área administrativa
```

O frontend público não deve precisar de autenticação.

---

# 12. Onda 07 — Profiles / Admin

Criar uma tabela de perfil administrativo somente se necessário.

Exemplo:

```text
profiles
```

ou:

```text
admin_profiles
```

Campos possíveis:

```text
id
user_id
role
created_at
updated_at
```

Roles iniciais podem ser:

```text
admin
```

Se não houver necessidade de múltiplos níveis, não criar complexidade artificial.

---

# 13. Onda 08 — Row Level Security

## Objetivo

Configurar RLS corretamente.

Essa é uma das etapas mais importantes.

### Eventos

Público pode ler informações publicáveis.

Admin pode editar.

### RSVP

Público pode inserir.

Público não deve ter acesso irrestrito a todos os RSVPs.

Admin pode ler e administrar.

### Messages

Público pode inserir.

Público pode ler somente mensagens aprovadas.

Admin pode ler, aprovar e excluir.

### Gallery

Público pode ler somente itens publicados.

Admin pode criar, editar e excluir.

---

# 14. Regras de segurança do RLS

Nunca criar políticas amplas como:

```sql
using (true)
```

para tabelas contendo dados administrativos ou pessoais, exceto quando a operação realmente exigir leitura pública controlada.

Separar:

```text
SELECT público
INSERT público
UPDATE admin
DELETE admin
```

quando necessário.

---

# 15. Onda 09 — Migrations / Schema

## Objetivo

Criar o banco de forma reproduzível.

As mudanças de banco devem ser versionadas.

Não depender exclusivamente de alterações manuais no dashboard do Supabase.

Documentar:

- criação de tabelas;
- índices;
- constraints;
- foreign keys;
- enums;
- RLS;
- policies.

---

# 16. Onda 10 — Índices e constraints

Adicionar índices somente quando fizer sentido.

Possíveis índices:

```text
rsvps.event_id
messages.event_id
messages.approved
gallery_items.event_id
gallery_items.published
gallery_items.sort_order
```

Adicionar foreign keys.

Garantir integridade entre:

```text
event
 ↓
rsvp
message
gallery
```

---

# 17. Onda 11 — Tipos TypeScript

Gerar ou manter tipos TypeScript alinhados ao banco.

Estrutura sugerida:

```text
src/types/
├── database.ts
├── event.ts
├── rsvp.ts
├── message.ts
└── gallery.ts
```

Não duplicar manualmente tipos que podem ser gerados de maneira confiável a partir do schema.

---

# 18. Onda 12 — Cliente Supabase

Criar clientes separados para contextos apropriados.

Conceitualmente:

```text
lib/supabase/
├── client.ts
├── server.ts
└── middleware.ts
```

O cliente browser deve possuir somente permissões apropriadas.

Operações privilegiadas devem permanecer server-side.

Nunca expor service role key ao browser.

---

# 19. Onda 13 — Variáveis de ambiente

Definir variáveis necessárias.

Exemplo conceitual:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

A service role key:

**nunca deve possuir prefixo `NEXT_PUBLIC_`.**

Nunca deve ser enviada para o cliente.

---

# 20. Onda 14 — Data Access Layer

Criar camada de acesso aos dados.

Exemplo:

```text
src/lib/data/
├── events.ts
├── rsvps.ts
├── messages.ts
└── gallery.ts
```

Os componentes devem consumir funções sem conhecer detalhes das queries.

Exemplo conceitual:

```ts
getEvent()
getApprovedMessages()
getGallery()
createRsvp()
createMessage()
```

---

# 21. Onda 15 — Evento real

Substituir:

```text
mock/event.ts
```

por:

```text
Supabase → events
```

O frontend deve continuar visualmente igual.

Somente a origem dos dados muda.

---

# 22. Onda 16 — Countdown real

O countdown não precisa consultar o banco a cada segundo.

Fluxo correto:

```text
Supabase
 ↓
event_date
 ↓
Frontend
 ↓
timer local
```

A data é carregada uma vez.

O contador roda no cliente.

Não criar requests a cada segundo.

---

# 23. Onda 17 — RSVP real

Substituir o mock.

Fluxo:

```text
Form
 ↓
Client validation
 ↓
Server Action
 ↓
Server validation
 ↓
Supabase
 ↓
Success
```

### Regras

- validar nome;
- validar convidados;
- validar status;
- validar event_id;
- tratar erros;
- retornar resposta segura.

Não retornar informações desnecessárias do banco.

---

# 24. Onda 18 — Proteção contra abuso de RSVP

Como o formulário é público, considerar:

- rate limiting;
- honeypot;
- limite de tamanho;
- validação;
- sanitização;
- proteção contra spam.

Não implementar soluções complexas sem necessidade.

O objetivo é impedir abuso básico sem prejudicar convidados reais.

---

# 25. Onda 19 — Recadinhos reais

Fluxo:

```text
Form
 ↓
Validation
 ↓
Server Action
 ↓
messages
 ↓
approved = false
```

Depois:

```text
Admin
 ↓
Aprovar
 ↓
approved = true
 ↓
Mensagem aparece
```

A consulta pública deve buscar somente mensagens aprovadas.

---

# 26. Onda 20 — Administração de mensagens

Criar funções administrativas:

```text
listPendingMessages()
approveMessage()
unapproveMessage()
deleteMessage()
```

Todas devem verificar autenticação e autorização.

Não confiar em esconder botões no frontend.

---

# 27. Onda 21 — Storage

## Objetivo

Configurar Supabase Storage para imagens administráveis.

Criar bucket apropriado.

Exemplo:

```text
gallery
```

### Regras

Definir:

- formatos permitidos;
- tamanho máximo;
- quem pode fazer upload;
- quem pode ler;
- quem pode excluir.

Uploads administrativos devem ser autenticados.

---

# 28. Onda 22 — Upload de galeria

Fluxo:

```text
Admin
 ↓
Seleciona imagem
 ↓
Validação
 ↓
Upload Storage
 ↓
Registro gallery_items
 ↓
Publicação
```

Não deixar arquivo no Storage sem registro no banco quando o sistema depender do registro para exibição.

---

# 29. Onda 23 — Galeria real

Substituir:

```text
mock/gallery.ts
```

por:

```text
Supabase Storage + gallery_items
```

O componente visual não deve precisar mudar.

Somente o Data Access Layer será alterado.

---

# 30. Onda 24 — Ordenação da galeria

Implementar:

```text
sort_order
```

A administração poderá controlar a ordem.

Se a interface administrativa inicialmente for simples, pode permitir:

- subir;
- descer;
- definir ordem.

Não adicionar drag-and-drop se não houver necessidade real.

---

# 31. Onda 25 — Informações do local

As informações de localização devem vir de:

```text
events
```

ou de uma entidade separada se o domínio exigir posteriormente.

Inicialmente:

```text
location_name
location_address
maps_url
```

é suficiente.

---

# 32. Onda 26 — Server Actions

Centralizar operações mutáveis quando adequado.

Exemplos:

```text
createRsvp
createMessage
approveMessage
deleteMessage
updateEvent
createGalleryItem
deleteGalleryItem
```

### Regras

Server Actions devem:

- validar input;
- verificar autenticação quando necessário;
- executar operação;
- retornar estado seguro;
- tratar exceções.

---

# 33. Onda 27 — Route Handlers

Utilizar Route Handlers somente quando houver benefício real.

Casos possíveis:

- endpoint público necessário;
- integração externa;
- webhook futuro;
- operação que precise de HTTP explícito.

Não criar uma API REST completa apenas por hábito.

---

# 34. Onda 28 — Tratamento de erros

Padronizar erros.

Frontend deve receber respostas compreensíveis.

Não retornar:

- stack trace;
- SQL;
- secrets;
- detalhes internos;
- mensagens técnicas desnecessárias.

Registrar detalhes somente no ambiente apropriado.

---

# 35. Onda 29 — Estados do frontend

Garantir que cada integração possua:

```text
idle
loading
success
error
```

Exemplos:

RSVP:

```text
idle
 ↓
loading
 ↓
success
```

ou:

```text
loading
 ↓
error
```

Recadinho e uploads seguem o mesmo padrão.

---

# 36. Onda 30 — Cache e revalidação

Analisar quais dados podem ser cacheados.

Dados relativamente estáticos:

- evento;
- localização;
- galeria publicada.

Dados dinâmicos:

- RSVP;
- mensagens recém-aprovadas.

Não criar estratégia complexa antes de medir necessidade.

O convite deve priorizar velocidade.

---

# 37. Onda 31 — Segurança

Revisão completa.

Verificar:

- RLS;
- Auth;
- permissions;
- environment variables;
- service role;
- uploads;
- inputs;
- SQL;
- exposição de dados;
- endpoints;
- mensagens;
- RSVP.

Nenhuma operação administrativa deve ser protegida apenas por interface.

---

# 38. Onda 32 — Dados pessoais

RSVP pode conter informações pessoais.

Portanto:

- não expor lista pública de convidados;
- não disponibilizar telefone publicamente;
- não permitir consulta arbitrária;
- limitar informações retornadas;
- permitir acesso administrativo somente quando necessário.

O frontend público deve receber apenas o mínimo necessário.

---

# 39. Onda 33 — Moderação

Mensagens devem ter fluxo de moderação.

Estados mínimos:

```text
pending
approved
```

Opcionalmente:

```text
rejected
```

Não implementar estados adicionais se não forem necessários.

---

# 40. Onda 34 — Administração do evento

Criar interface administrativa para:

- editar nome;
- editar descrição;
- editar data;
- editar local;
- editar endereço;
- editar Google Maps URL.

Toda alteração deve ser autenticada.

---

# 41. Onda 35 — Dashboard administrativo

Criar visão simples:

```text
Confirmados
Não vão
Total de convidados
Mensagens pendentes
Mensagens aprovadas
Fotos publicadas
```

Evitar transformar o painel em um sistema complexo.

O objetivo é administrar o convite.

---

# 42. Onda 36 — Autenticação administrativa

Implementar:

```text
/login
```

Fluxo:

```text
Email
Senha
 ↓
Supabase Auth
 ↓
Session
 ↓
Admin
```

Proteger rotas administrativas.

Usuário não autenticado deve ser redirecionado.

---

# 43. Onda 37 — Middleware / proteção

Quando necessário, utilizar middleware para auxiliar na proteção de rotas.

Mas a segurança real deve continuar sendo garantida por:

- Supabase Auth;
- RLS;
- autorização server-side.

Middleware não deve ser considerado a única camada de segurança.

---

# 44. Onda 38 — Substituição completa dos mocks

Agora substituir sistematicamente:

```text
mock/event.ts
mock/messages.ts
mock/gallery.ts
mock/rsvp.ts
```

por:

```text
Data Access Layer
 ↓
Supabase
```

A UI não deve ser reescrita.

---

# 45. Onda 39 — Integração completa

Validar o fluxo:

```text
Visitante
 ↓
OnePage
 ↓
Evento real
 ↓
Countdown real
 ↓
RSVP real
 ↓
Recadinho real
 ↓
Mensagens aprovadas
 ↓
Galeria real
 ↓
Localização real
```

E:

```text
Admin
 ↓
Login
 ↓
Dashboard
 ↓
RSVPs
 ↓
Mensagens
 ↓
Galeria
 ↓
Evento
```

---

# 46. Onda 40 — Testes de integração

Testar:

## Evento

- leitura;
- edição administrativa;
- atualização.

## RSVP

- confirmação;
- recusa;
- valores inválidos;
- spam básico;
- erro de banco.

## Mensagens

- envio;
- moderação;
- aprovação;
- exclusão.

## Galeria

- upload;
- publicação;
- ordenação;
- exclusão.

## Auth

- login;
- logout;
- acesso sem autenticação;
- acesso autorizado;
- sessão expirada.

---

# 47. Onda 41 — Testes de segurança

Testar explicitamente:

- usuário anônimo tentando ler RSVP;
- usuário anônimo tentando editar evento;
- usuário anônimo tentando aprovar mensagem;
- usuário anônimo tentando apagar imagem;
- usuário autenticado sem role adequada;
- acesso direto a rotas administrativas;
- manipulação de IDs;
- upload de arquivo inválido.

Todos devem ser bloqueados conforme as regras.

---

# 48. Onda 42 — Testes de dados

Verificar:

- foreign keys;
- constraints;
- valores nulos;
- valores inválidos;
- duplicações;
- registros órfãos;
- exclusões.

Definir comportamento de exclusão:

```text
event
 ↓
rsvps
messages
gallery
```

Não usar cascade indiscriminadamente.

---

# 49. Onda 43 — Seed inicial

Criar dados iniciais para desenvolvimento/staging.

Exemplo:

- evento;
- mensagens;
- galeria.

Não colocar dados reais sensíveis em seed versionado.

---

# 50. Onda 44 — Observabilidade básica

Garantir que erros relevantes possam ser identificados.

No mínimo:

- logs server-side;
- mensagens de erro úteis;
- identificação da operação que falhou.

Não registrar:

- senhas;
- tokens;
- service role;
- dados pessoais desnecessários.

---

# 51. Onda 45 — Deploy do Supabase

Configurar ambiente de produção.

Verificar:

- projeto Supabase;
- schema;
- migrations;
- RLS;
- Storage;
- Auth;
- environment variables.

Não copiar dados de desenvolvimento indiscriminadamente para produção.

---

# 52. Onda 46 — Deploy Vercel

Configurar:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

Apenas variáveis realmente necessárias.

Verificar:

- build;
- environment;
- production;
- preview;
- URLs;
- redirects.

---

# 53. Onda 47 — Produção

Testar o sistema no domínio final.

Verificar:

- convite;
- imagens;
- countdown;
- RSVP;
- mensagens;
- galeria;
- localização;
- login;
- dashboard;
- uploads.

---

# 54. Onda 48 — Performance pós-integração

Depois de conectar o backend, revisar:

- quantidade de queries;
- queries repetidas;
- payload;
- imagens;
- cache;
- renderização;
- loading states.

Não transformar cada componente em uma consulta independente sem necessidade.

---

# 55. Onda 49 — Segurança final

Checklist:

- [ ] RLS ativo.
- [ ] Service role somente server-side.
- [ ] Auth protegendo administração.
- [ ] Validação server-side.
- [ ] Upload validado.
- [ ] Dados pessoais protegidos.
- [ ] RSVP não exposto publicamente.
- [ ] Mensagens públicas somente aprovadas.
- [ ] Storage protegido conforme necessidade.
- [ ] Variáveis secretas protegidas.
- [ ] Rotas administrativas protegidas.
- [ ] Erros internos não expostos.

---

# 56. Onda 50 — Remoção dos mocks

Somente depois da integração completa:

- remover imports dos mocks;
- remover código morto;
- remover handlers mockados;
- remover dados de teste da aplicação;
- manter fixtures/seeds somente onde forem úteis.

Não remover mocks antes de comprovar que o backend está funcionando.

---

# 57. Onda 51 — Refatoração

Depois de tudo integrado:

Revisar:

- Data Access Layer;
- Server Actions;
- tipos;
- queries;
- componentes;
- duplicações;
- tratamento de erros;
- segurança;
- performance.

Não refatorar prematuramente.

---

# 58. Onda 52 — QA final de ponta a ponta

Simular uma utilização real.

## Visitante

1. Abrir convite.
2. Visualizar Hero.
3. Ver countdown.
4. Navegar.
5. Confirmar presença.
6. Enviar recadinho.
7. Abrir galeria.
8. Abrir localização.

## Administrador

1. Login.
2. Visualizar dashboard.
3. Ver RSVP.
4. Ver mensagem pendente.
5. Aprovar mensagem.
6. Ver mensagem no convite.
7. Fazer upload de foto.
8. Publicar foto.
9. Alterar informação do evento.
10. Logout.

---

# 59. Regra de integração com o frontend

A integração deve respeitar a arquitetura:

```text
Component
   ↓
Hook / Action / Service
   ↓
Data Access Layer
   ↓
Supabase
```

Evitar:

```text
Component
   ↓
supabase.from(...)
```

espalhado por toda a aplicação.

Isso dificultaria testes, manutenção e futuras mudanças.

---

# 60. Critério para considerar uma onda concluída

Uma onda só pode ser marcada como concluída quando:

1. código implementado;
2. TypeScript sem erros;
3. build sem erros;
4. regras de segurança verificadas;
5. comportamento testado;
6. tratamento de erro implementado;
7. integração validada;
8. documentação atualizada quando necessário.

---

# 61. Critério final do backend

O backend estará concluído quando:

```text
Frontend
   ↓
Data Access Layer
   ↓
Server Actions / Route Handlers
   ↓
Supabase
```

estiver funcionando de ponta a ponta.

E quando:

- evento estiver persistido;
- countdown usar data real;
- RSVP estiver persistido;
- mensagens estiverem persistidas;
- moderação funcionar;
- galeria funcionar;
- Storage funcionar;
- autenticação funcionar;
- administração funcionar;
- RLS estiver ativo;
- validações estiverem implementadas;
- dados pessoais estiverem protegidos;
- mocks tiverem sido removidos da execução;
- produção estiver funcionando.

---

# 62. Ordem resumida das ondas

```text
00  Auditoria do frontend
01  Arquitetura de dados
02  Evento
03  RSVP
04  Recadinhos
05  Galeria
06  Administração
07  Profiles/Admin
08  RLS
09  Migrations
10  Índices/Constraints
11  Tipos
12  Cliente Supabase
13  Environment
14  Data Access Layer
15  Evento real
16  Countdown real
17  RSVP real
18  Proteção contra abuso
19  Recadinhos reais
20  Moderação
21  Storage
22  Upload
23  Galeria real
24  Ordenação
25  Localização
26  Server Actions
27  Route Handlers
28  Erros
29  Estados
30  Cache
31  Segurança
32  Dados pessoais
33  Moderação
34  Administração do evento
35  Dashboard
36  Auth
37  Middleware
38  Remoção progressiva dos mocks
39  Integração completa
40  Testes de integração
41  Testes de segurança
42  Testes de dados
43  Seed
44  Observabilidade
45  Deploy Supabase
46  Deploy Vercel
47  Produção
48  Performance
49  Segurança final
50  Remoção dos mocks
51  Refatoração
52  QA ponta a ponta
```

---

# 63. Regra final para o Cursor

Antes de implementar qualquer onda:

```text
1. Ler PROJECT_CONTEXT.md
2. Ler FRONTEND_IMPLEMENTATION_PLAN.md quando a tarefa envolver frontend
3. Ler esta onda do BACKEND_IMPLEMENTATION_PLAN.md
4. Inspecionar o código existente
5. Não assumir schema ou comportamento
6. Implementar somente o escopo da onda
7. Validar
8. Testar segurança
9. Corrigir
10. Só então avançar
```

Nunca:

- implementar Supabase diretamente nos componentes;
- expor service role;
- ignorar RLS;
- confiar somente em validação client-side;
- expor dados pessoais;
- criar APIs sem necessidade;
- adicionar bibliotecas sem justificativa;
- remover mocks antes da integração estar comprovada;
- alterar o design para acomodar o backend.

---

# 64. Princípio final

O backend deve ser **simples, seguro e suficiente para o convite**.

Não criar uma plataforma complexa quando o domínio é pequeno.

A arquitetura deve permitir evolução, mas não deve introduzir complexidade prematura.

A prioridade é:

```text
CONFIABILIDADE
      ↓
SEGURANÇA
      ↓
SIMPLICIDADE
      ↓
MANUTENIBILIDADE
      ↓
PERFORMANCE
      ↓
ESCALABILIDADE NECESSÁRIA
```

O resultado final deve ser uma aplicação na qual:

> **o visitante percebe apenas um convite bonito, rápido e fluido; enquanto o administrador possui uma estrutura simples para controlar presenças, mensagens, fotos e informações do evento.**

---

# 65. Resultado esperado

Ao concluir todas as ondas:

```text
                    VERCEL
                      │
                      ▼
             ┌─────────────────┐
             │    Next.js      │
             │                 │
             │   OnePage       │
             │   Admin         │
             └────────┬────────┘
                      │
              Data Access Layer
                      │
          ┌───────────┴───────────┐
          │                       │
    Server Actions          Route Handlers
          │                       │
          └───────────┬───────────┘
                      │
                      ▼
                ┌───────────┐
                │ Supabase  │
                ├───────────┤
                │ PostgreSQL│
                │ Auth      │
                │ Storage   │
                │ RLS       │
                └───────────┘
```

O frontend visual desenvolvido na primeira fase deve permanecer praticamente intacto.

A principal mudança será:

```text
ANTES

UI
 ↓
Mock

DEPOIS

UI
 ↓
Data Layer
 ↓
Backend
 ↓
Supabase
```

Esse é o objetivo central da arquitetura.
