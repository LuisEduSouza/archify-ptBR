<p align="center">
  <strong>English</strong> · <a href="./README_ZH.md">简体中文</a>
</p>

<p align="center">
  <a href="https://trendshift.io/repositories/31352?utm_source=repository-badge&amp;utm_medium=badge&amp;utm_campaign=badge-repository-31352" target="_blank" rel="noopener noreferrer"><img src="https://trendshift.io/api/badge/repositories/31352" alt="Archify no Trendshift" width="250" height="55"/></a>
</p>

![Archify product preview](docs/assets/archify-readme-hero.png)

# Archify

**Transforme uma base de código ou uma descrição de sistema em um mapa de sistema bem elaborado e interativo - diretamente no chat.**

O Archify é um sistema de renderização e validação em Node.js para o Cursor, o Claude Code, o Codex CLI e o OpenCode. Os agentes geram uma IR (representação interna) em JSON tipado; o Archify a compila de forma determinística em HTML/SVG.

- **Abra e apresente** — cinco tipos de diagramas, quatro predefinições (presets), temas claro/escuro, marcas incorporadas e animação finita
- **Revise alterações de arquitetura antes do merge** — compare dois snapshots validados como Antes / Delta / Depois, com fatos exatos de adição, remoção, alteração, movimentação e redirecionamento
- **Cada interação permanece fundamentada** — pesquise nós, opcionalmente abra fontes verificadas por revisão, rastreie o alcance autoral a montante/a jusante e rotas exatas, compare papéis e execute histórias guiadas sem inventar topologias
- **Um único arquivo, pronto para confiar e compartilhar** — IR em JSON tipado e verificações determinísticas produzem HTML autossuficiente, além de cartões de compartilhamento em PNG, SVG, WebM e 1200×630

![Licença](https://img.shields.io/badge/license-MIT-22c55e?style=flat-square)
![Agent Skill](https://img.shields.io/badge/Agent-Skill-7C3AED?style=flat-square)
![Versão de Desenvolvimento](https://img.shields.io/badge/version-2.17.0--dev.1-0891b2?style=flat-square)

**Versão atual de desenvolvimento:** `v2.17.0-dev.1`. Veja o [Changelog](CHANGELOG.md#unreleased).

**[Página do projeto](https://tt-a1i.github.io/archify/)** · **[Guia de cenários](https://tt-a1i.github.io/archify/guide.html)** · **[Proof Lab](https://tt-a1i.github.io/archify/gallery.html)**

```bash
npx skills add tt-a1i/archify -g
```

Usando o Cursor? Abra o [início rápido ciente de agente](https://tt-a1i.github.io/archify/start.html?agent=cursor&type=architecture) para comandos globais e de projeto exatos.

**Nenhum repositório é necessário:** descreva o sistema em qualquer chat com agente.

## ❤️ Patrocinadores

<table>
  <tr><td align="center" width="240"><a href="https://apinebula.ai/ref/wywnaATT"><img src="docs/assets/sponsors/apinebula-archify.jpg" alt="APINEBULA" width="200" /></a><br/><strong><a href="https://apinebula.ai/ref/wywnaATT">APINEBULA</a></strong></td><td>APINEBULA sponsors Archify with one API for Claude, GPT, Gemini, and more. <a href="https://apinebula.ai/ref/wywnaATT">Register through Archify</a> and use <strong><code>Archify</code></strong> for <strong>10% off</strong>.</td></tr>
  <tr><td align="center" width="240"><a href="https://github.com/EverMind-AI/Raven"><img src="docs/assets/sponsors/evermind-archify-raven.png" alt="Archify × Raven" width="200" /></a><br/><strong><a href="https://github.com/EverMind-AI">EverMind</a> · <a href="https://github.com/EverMind-AI/Raven">Raven</a></strong></td><td>EverMind sponsors Archify and builds memory infrastructure for agents. Its <a href="https://github.com/EverMind-AI/Raven"><strong>Raven</strong></a> harness supports Archify as a Skill for verified, interactive system maps.</td></tr>
</table>

> Quer patrocinar o Archify? [Entre em contato por e-mail.](mailto:2801884530@qq.com)

## Veja o Archify em ação

Estes são artefatos gerados pelo Archify, não maquetes (mockups) de produto. Clique em um quadro para abrir seu estado interativo compartilhável.

<p align="center">
  <a href="https://tt-a1i.github.io/archify/gallery.html"><img src="docs/assets/archify-live-proof.gif" alt="Three verified Archify artifacts moving through Signal Flow, Blueprint, and Classic presets" width="960"/></a>
  <br/>
  <sub><strong>Three real generated artifacts.</strong> Signal Flow · Blueprint · Classic · <a href="https://tt-a1i.github.io/archify/gallery.html">open the interactive Proof Lab ↗</a></sub>
</p>

| História guiada | Sonda de rota | Lente semântica |
|---|---|---|
| [![Fluxo de trabalho do agente reproduzindo um capítulo criado](docs/assets/archify-demo-story.png)](https://tt-a1i.github.io/archify/gallery/artifacts/agent-tool-call.workflow.html?theme=dark&present=1&play=1#view=happy-path) | [![Sequência de falhas de cache mostrando a rota do aplicativo web para o Postgres](docs/assets/archify-demo-route.png)](https://tt-a1i.github.io/archify/gallery/artifacts/cache-miss.sequence.html?theme=dark&present=1#route=web~db) | [![Arquitetura de produção comparando funções de back-end e de banco de dados](docs/assets/archify-demo-lens.png)](https://tt-a1i.github.io/archify/gallery/artifacts/production-deployment.architecture.html?theme=dark&present=1#lens=backend~database) |
| Jogue um capítulo específico e de duração limitada. | Inspecione o caminho direcionado mais curto criado pelo autor. | Comparar o tráfego real entre papéis semânticos. |

O [Proof Lab](https://tt-a1i.github.io/archify/gallery.html) contém todos os 11 cenários verificados no repositório, suas fontes JSON, visualizações nomeadas e recibos de validação.

### Um repositório real, mapeado a partir do código-fonte

[![MCO runtime architecture generated from the public mco-org/mco repository](docs/assets/mco-runtime-share-card.png)](https://tt-a1i.github.io/archify/cases/mco-runtime.architecture.html?theme=dark&present=1#view=dispatch-path)

O Archify rastreou o repositório [`mco-org/mco`](https://github.com/mco-org/mco) no commit `9f1a1cf` e produziu este mapa verificado. **[Abra-o ↗](https://tt-a1i.github.io/archify/cases/mco-runtime.architecture.html?theme=dark&present=1#view=dispatch-path)** · [rastrear alcance ↗](https://tt-a1i.github.io/archify/cases/mco-runtime.architecture.html?theme=dark#focus=router&reach=downstream) · [fonte tipada](docs/cases/mco-runtime.architecture.json)

## Pré-visualização

Mesmo diagrama, dois temas, um clique para alternar:

| Escuro | Claro |
|---|---|
| ![Dark theme](docs/assets/archify-dark.png) | ![Light theme](docs/assets/archify-light.png) |

O menu Exportar copia PNGs para a área de transferência e baixa formatos estáticos ou animados:

![Export menu](docs/assets/archify-menu.png)

Use **Copiar Cartão de Compartilhamento** quando quiser uma imagem canônica de 1200×630 para um README, release ou publicação em redes sociais.

Após rastrear uma rota, **Exportar → Cartão de Compartilhamento de Rota** baixa o caminho autoral como um PNG de 1200×630, mantendo todo o diagrama como contexto.

![Route Share Card showing the exact Users to API Server path with the full architecture retained as context](docs/assets/archify-route-share-card.png)

Após rastrear o alcance autoral A Montante `Upstream` ou `Downstream` , **Exportar → Cartão de Compartilhamento de Alcance** captura essa leitura exata sem alegar impacto em tempo de execução.

![MCO downstream Reach Share Card showing authored relationships from Command Router](docs/assets/mco-runtime-reach-share-card.png)

Abra [`examples/web-app.html`](examples/web-app.html) localmente para testar o visualizador completo.

## Início rápido

### 1. Instalalar

```bash
npx skills add tt-a1i/archify -g
```

Para uma instalação explícita e não interativa no Cursor:

```bash
npx -y skills add tt-a1i/archify --skill archify --agent cursor --global --copy --yes
```

Para testar sem instalar:

```bash
npx skills use tt-a1i/archify@archify --agent codex
```

[Opção de participação na comunidade DSH](integrations/deepseek-harness/README.md): `dsh plugin --profile web add @tt-a1i/archify-dsh@0.1.0`

O [alternador de agentes](https://tt-a1i.github.io/archify/start.html?agent=cursor&type=architecture) suporta `cursor`, `codex`, `claude-code`, e `opencode`. Para instalação manual via ZIP no Raven, extraia [`archify.zip`](archify.zip) em `~/.raven/workspace/skills`; isso gera `~/.raven/workspace/skills/archify`. O Raven não é um alvo do alternador.

O Archify pode realizar requisições GET ao manifesto estável fixo puramente para exibir um lembrete opcional; ele nunca baixa ou instala atualizações. Verificações bem-sucedidas aguardam cerca de 72 horas (±20%); o uso ativo tenta novamente falhas após 6 e depois 24 horas. O servidor vê metadados HTTP normais (IP e horário), mas não recebe versão, Agente, dados do projeto, prompts, ID de conta/dispositivo ou ETag. Você decide se e quando atualizar. Defina `ARCHIFY_UPDATE_CHECK_DISABLED=1` para desativar o uso de rede e gravações do estado de lembrete.

### 2. Comece a partir de uma descrição — nenhum repositório é necessário

```text
Use Archify to draw: Browser -> API -> Redis cache -> PostgreSQL fallback.
```

Para evidências baseadas no código-fonte, abra um repositório e peça:

```text
Analyze this repository, then use archify to create a high-level runtime architecture diagram.
Show 8–12 core components, one primary path, external dependencies, and trust boundaries.
Put supporting detail in cards instead of adding more edges.
```

### 3. Refine no chat

Continue com solicitações focadas, como `add Redis`, `move auth to the left`, ou `highlight the rollback path`. O Archify mantém a fonte tipada disponível para iterações direcionadas.

## Escolha o diagrama correto

| Tipo | Ideal para | Inclua no seu prompt |
|---|---|---|
| **Arquitetura** | Componentes, serviços, armazenamento, limites | Escopo, componentes principais, caminho primário |
| **Workflow** | CI/CD, aprovações, chamadas de ferramentas, runbooks | Participantes, ordem, ramificações, exceções |
| **Sequência** | Chamadas de API, fallback de cache, autenticação, rastros assíncronos | Solicitantes, destinatários, retornos, temporização |
| **Fluxo de Dados (Data Flow)** | Pipelines, linhagem, PII, consumidores | Fontes, transformações, armazenamentos, limites |
| **Ciclo de Vida (Lifecycle)** | Estados, rets, esperas, resultados terminais | Estados, eventos, caminhos de tentativa e cancelamento |

O perfil opcional `deployment-ownership` do diagrama de Arquitetura falha por segurança (fail-closed) quando proprietários autorais, posicionamento regional, escopo de banco de dados privado ou cruzamentos nomeados estão ausentes; ele nunca é implícito e não inspeciona infraestrutura ativa. Veja a [prova de implantação verificada](https://tt-a1i.github.io/archify/gallery.html#proof-deployment-ownership).

Para revisão de design ou PR, o Delta de Arquitetura compara snapshots validados de Antes / Delta / Depois com um recibo de máquina. Selecione uma alteração autoral ou execute uma Revisão finita, exclusiva do visualizador; ele não infere impacto, risco ou segurança de merge.

`node archify/bin/archify.mjs compare architecture base.json head.json architecture-delta.html --json`

[![Architecture Delta showing added, removed, changed, and moved authored facts](docs/assets/architecture-delta-proof.jpg)](examples/checkout-platform-delta.html)

Não tem certeza de qual se encaixa melhor? Use o [guia de cenários interativo](https://tt-a1i.github.io/archify/guide.html), ou pergunte à CLI de zero dependências:

```bash
node archify/bin/archify.mjs guide "Show an API request with Redis cache miss"
node archify/bin/archify.mjs guide "Map Kafka topics, consumer groups, replay, and DLQ" --json
```

O Workflow mantém o caminho feliz claro entre as raias (lanes):

![Workflow example](docs/assets/archify-workflow.png)

A Sequência explica uma interação ao longo do tempo:

![Sequence example](docs/assets/archify-sequence.png)

O Fluxo de Dados torna explícitos o movimento e os limites de sensibilidade:

![Data Flow example](docs/assets/archify-dataflow.png)

O Ciclo de Vida separa progresso, esperas, tentativas e resultados terminais:

![Lifecycle example](docs/assets/archify-lifecycle.png)

Exemplos de Arquitetura: [`web-app`](examples/web-app.html) · [`Archify pipeline`](examples/archify-repo.html) · [`grid placement`](examples/archify-repo-grid.html) · [`desktop agent`](examples/maka-architecture.html)

## Por que usar o Archify

- **Julgamento de layout em vez de layout automático genérico** — o agente escolhe a hierarquia, o espaçamento, as rotas e a ênfase; pontos de extremidade automáticos compartilhados se distribuem de forma determinística em vez de acumular setas em um único ponto médio.
- **IR em JSON tipado** — todo modo respaldado por renderizador possui um schema e código-fonte reproduzível.
- **validação atômica antes da entrega** — verificações de schema, layout, HTML/SVG, rotas e folga de rótulo para rota devem passar antes que um artefato de demonstração substitua a última saída válida conhecida.
- **Falhas vêm com um recibo de reparo** — `validate --json` e `deliver --json` retornam códigos de regra estáveis, o assunto exato, evidências medidas e apenas controles de reparo suportados, em vez de uma pilha do Node (stack trace) ou um palpite de reativação não estruturado.
- **Pré-visualização ao vivo do último estado válido** — um loop de desktop opcional monitora um arquivo JSON, atualizando somente após o candidato mais recente passar por todas as etapas, mantendo o diagrama verificado anterior visível caso um salvamento esteja incompleto ou inválido.
- **Interação autêntica** — foco, alcance a montante/a jusante, rotas exatas, comparação de papéis e histórias reutilizam nós e relacionamentos autorais em vez de inventar topologias ou reivindicar impacto em tempo de execução.
- **Evidência de código-fonte, apenas quando solicitado** — Nós de Arquitetura respaldados por evidências marcam-se como `SRC n` e abrem arquivos e intervalos de linhas verificados pelo Git fixados em um commit público; artefatos comuns permanecem sem referências de código.
- **Portátil por padrão** — o resultado é um único arquivo HTML; as exportações permanecem com o diagrama completo e livres de estados temporários do visualizador.

O Archify não é um editor de desenhos genéricos nem um tema do Mermaid. Ele transforma a intenção técnica em um artefato de comunicação.

## Como funciona

| Etapa | O que acontece |
|---|---|
| **Gerar** | O agente cria uma IR em JSON tipado a partir da sua descrição. |
| **Validar** | Validadores e regras de layout inclusos verificam o código-fonte; falhas identificam o reparo local exato em JSON legível por máquina. |
| **Pré-visualizar (opcional)** | Uma sessão de desktop em loopback monitora um arquivo fonte e recarrega apenas revisões verificadas; falhas mantêm o último artefato válido. |
| **Entregar** | Um candidato no mesmo diretório é renderizado e verificado; apenas um artefato aprovado substitui atomicamente o alvo, e então a opção `--open` abre esse arquivo exato. |
| **Iterar** | O agente atualiza o código-fonte enquanto estruturas não relacionadas permanecem estáveis. |

Useful repository commands:

```bash
cd archify
node bin/archify.mjs doctor
node bin/archify.mjs demo /tmp/archify-demo
node bin/archify.mjs guide "Show CI/CD checks, approval, deploy, and rollback"
node bin/archify.mjs validate workflow examples/agent-tool-call.workflow.json --quality showcase --json
node bin/archify.mjs preview workflow examples/agent-tool-call.workflow.json /tmp/workflow.html --quality showcase
node bin/archify.mjs deliver workflow examples/agent-tool-call.workflow.json /tmp/workflow.html --quality showcase --open --json
```

O `preview` é um modo de desktop explícito e exclusivo em loopback: ele monitora um arquivo JSON em uma porta `127.0.0.1` aleatória, mantém a última saída verificada durante falhas, encerra com Ctrl-C e não adiciona código de tempo de execução ao HTML gerado. Use `--no-open` para testes ou para abertura manual de URLs.

O `deliver --open` é uma entrega de disparo único (opt-in) após o commit. Falhas na abertura preservam o sucesso; o JSON permanece na saída padrão (stdout) e o caminho de fallback absoluto vai para a saída de erro (stderr).

Em caso de falha, `validate --json` e `deliver --json` emitem um único objeto JSON. Aplique apenas os `diagnostics[]` do assunto de cada `supportedFixes`, dentro das duas rodadas de correção da Skill; a revisão visual permanece separada.

Configurações:

```json
{
  "meta": {
    "locale": "en",
    "animation": "trace",
    "visual_preset": "signal-flow"
  }
}
```

`meta.locale=en|zh-CN` localiza o título da página, Legenda, estados/erros, acessibilidade (a11y) e o atributo `lang`—nunca o conteúdo autoral. Caso contrário, omita; preserve o texto no idioma solicitado; informe o fallback em inglês. Formatos estáticos omitem `animation`; o padrão é `classic`.

## Explore e compartilhe o resultado

| Ação | Controle |
|---|---|
| Abrir o Guia factual do Diagrama | <kbd>?</kbd> |
| Encontrar e focalizar um nó semântico | <kbd>/</kbd> |
| Rastrear alcance autoral a montante/a jusante | Focalize um nó → `Upstream` / `Downstream` |
| Sondar uma rota direcionada e inspecionar seu trajeto | <kbd>R</kbd> ou `PATH` |
| Comparar um ou dois papéis semânticos | <kbd>L</kbd> ou `LENS` |
| Abrir o radar de visão geral ao vivo | <kbd>M</kbd> ou `MAP` |
| Reproduzir uma história guiada / alterar capítulo | <kbd>P</kbd> / <kbd>[</kbd> <kbd>]</kbd> |
| Entrar no Modo de Apresentação | <kbd>F</kbd> |
| Escolher estilo visual (`S` alterna) / mudar tema / abrir Exportar | <kbd>S</kbd> / <kbd>T</kbd> / <kbd>E</kbd> |
| Dar zoom ou redefinir | <kbd>+</kbd> / <kbd>-</kbd> / <kbd>0</kbd> |

Links estáveis podem restaurar `#focus=<id>`, `#focus=<id>&reach=upstream|downstream`, `#relation=<id>`, `#route=<source>~<target>`, `#lens=<kind>~<kind>`, e `#view=<view-id>`. Animações acionadas pelo leitor são finitas, respeitam `prefers-reduced-motion`, e nunca entram em exportações canônicas.

O contrato completo de geração e visualização encontra-se em [`archify/SKILL.md`](archify/SKILL.md).

## Opções de instalação

| Plataforma | Local ou método de instalação | Capacidade |
|---|---|---|
| **Raven** | ZIP manual em `~/.raven/workspace/skills` → `~/.raven/workspace/skills/archify` | Renderizador completo + fluxo de validação |
| **Claude Code** | `~/.claude/skills/` ou `.claude/skills/` | Renderizador completo + fluxo de validação |
| **Codex CLI** | `~/.agents/skills/` ou `.agents/skills/` | Renderizador completo + fluxo de validação |
| **opencode** | `~/.config/opencode/skills/`, `.opencode/skills/`, ou `.agents/skills/` | Renderizador completo + fluxo de validação |
| **Claude.ai** | Envie `archify.zip` em Configurações → Capacidades → Skills | Depende do acesso ao Node.js na sandbox |
| **Project Knowledge** | Envie `archify.zip` para o projeto | Fallback de arquitetura orientado a prompts |
| **DeepSeek Harness** | Opção de participação: `dsh plugin --profile web add @tt-a1i/archify-dsh@0.1.0`. . Invocação: `Use the archify skill to map this repository's runtime architecture.` Remoção: `dsh plugin --profile web remove @tt-a1i/archify-dsh`. | Integração comunitária para pré-visualização de desenvolvedores `@deepseek-ai/dsh@0.1.0-rc.6`; Node `^22.19.0 \|\| >=24.0.0`; não é um produto oficial do DeepSeek. Sem telemetria. Arquivos de shell precisam de caminhos exatos no workspace, não Web Produced Files. [Detalhes](integrations/deepseek-harness/README.md). |

## Referência e escopo

- [Referência de Schemas](archify/schemas/README.md) · [Skill](archify/SKILL.md) · [Exemplos](archify/examples/) · [Livro de receitas do agente](docs/authoring-cookbook.md)
- [Changelog](CHANGELOG.md)
- [Roteiro (Roadmap)](ROADMAP.md)
- [Proof Lab gerado](https://tt-a1i.github.io/archify/gallery.html)

Processamento automático de Mermaid, layout automático de uso geral, hospedagem para compartilhamento e edição WYSIWYG estão intencionalmente fora do escopo atual.

## Licença

[MIT](LICENSE) — livre para uso, modificação e distribuição.

## Contribuição

Issues, pull requests e diagramas do mundo real são bem-vindos. Comece pelo [guia de contribuição](CONTRIBUTING.md), use o formulário de bug reproduzível para falhas ou envie um diagrama validado pelo [formulário de vitrine da comunidade](https://github.com/tt-a1i/archify/issues/new?template=showcase.yml).&nbsp;·&nbsp;[LINUX&nbsp;DO](https://linux.do)

## Histórico de Estrelas (Star History)

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/tt-a1i/archify/star-history/assets/star-history-dark.svg" /><img alt="Star History" src="https://raw.githubusercontent.com/tt-a1i/archify/star-history/assets/star-history-light.svg" /></picture></p>
