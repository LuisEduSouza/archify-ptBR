# Guia prático de autoria

O Archify é, essencialmente, uma Skill voltada para agentes. Usuários comuns podem pedir a um agente com suporte a Skills que gere o diagrama; portanto, não precisam aprender o schema nem executar os comandos `validate`, `inspect` ou `deliver` por conta própria.

O fluxo de trabalho manual abaixo serve como referência para integração, contribuição e resolução de problemas. Os comandos pressupõem que você esteja no diretório `archify/` do repositório ou na raiz de uma Skill Archify instalada.

## 1. Verificar a instalação

O Archify requer Node.js 18 ou posterior. Execute o comando de diagnóstico antes de criar um diagrama:

```bash
node bin/archify.mjs doctor
```

Se você estiver instalando por meio de uma ferramenta de Skills compatível com npm, a instalação global é:

```bash
npx skills add tt-a1i/archify -g
```

## 2. Escolher um tipo de diagrama

Use o tipo que corresponda à pergunta que você deseja que o leitor consiga responder:

| Tipo | Use para | Comece com |
| --- | --- | --- |
| `architecture` | Componentes, serviços, armazenamento e limites | `examples/web-app.architecture.json` |
| `workflow` | Trabalho ordenado, aprovações, ramificações e procedimentos operacionais | `examples/agent-tool-call.workflow.json` |
| `sequence` | Chamadas, retornos, falhas de cache e temporização | `examples/cache-miss-request.sequence.json` |
| `dataflow` | Movimentação de dados, transformações e consumidores | `examples/product-analytics.dataflow.json` |
| `lifecycle` | Estados, novas tentativas, esperas e resultados finais | `examples/agent-run.lifecycle.json` |

Quando o tipo não estiver claro, consulte o guia de cenários integrado:

```bash
node bin/archify.mjs guide "Show an API request with a Redis cache miss" --json
```

O guia recomenda um tipo e retorna uma receita. Ele não cria o diagrama para você.

## 3. Criar um arquivo-fonte com escopo bem definido

Comece com uma história clara. Mantenha o primeiro diagrama com cerca de 8 a 12 nós primários, um caminho principal e apenas as ramificações que ajudem a explicar a questão. Os exemplos incluídos no repositório são pontos de partida mais seguros do que copiar um artefato grande gerado.

Cada fonte precisa de um `schema_version`, um `diagram_type`, um `meta.title` e dos arrays estruturais exigidos pelo renderizador correspondente. Consulte a [referência do schema](../archify/schemas/README.md) para ver os campos exatos e os valores permitidos.

Para um diagrama de arquitetura baseado em um repositório, adicione ao JSON os metadados do repositório fixados em uma revisão e os intervalos de código-fonte; em seguida, passe o caminho do repositório local ao comando:

```bash
node bin/archify.mjs validate architecture path/to/diagram.json \
  --repo-root path/to/repository --quality showcase --json
```

O Archify verifica a origem Git, o commit, os blobs e as linhas solicitadas. Não adicione evidências de código-fonte quando o repositório ou a revisão não puderem ser verificados.

## 4. Validar antes de gerar um handoff

Use `standard` durante a exploração e `showcase` para um artefato refinado ou uma prova incluída no repositório:

```bash
node bin/archify.mjs validate architecture examples/web-app.architecture.json \
  --quality showcase --json
```

Em caso de sucesso, o recibo JSON contém as verificações do artefato e um resumo da composição. Em caso de falha, ele contém um `stage` e `diagnostics[]`; corrija o problema indicado e use os `supportedFixes` listados antes de tentar outra alteração. Um código de saída diferente de zero nunca indica uma validação bem-sucedida.

Para inspecionar o layout de um diagrama de Architecture, use a saída de layout legível por máquina do renderizador:

```bash
node bin/archify.mjs inspect architecture path/to/diagram.json
```

O `inspect` atualmente está disponível apenas para Architecture e é útil quando um diagnóstico geométrico identifica um problema de rota ou posicionamento.

## 5. Entregar o artefato confiável

`render` é útil para gerar uma saída local rapidamente. Use `deliver` quando o arquivo for um handoff, um artefato de lançamento ou uma saída de CI:

```bash
node bin/archify.mjs deliver architecture examples/web-app.architecture.json \
  web-app.html --quality showcase --json
```

O `deliver` congela os bytes de entrada, renderiza um candidato no mesmo diretório, executa as verificações finais do artefato e só substitui o destino depois que todas as etapas forem aprovadas. Seu recibo inclui os hashes SHA-256 da especificação e do artefato. Adicione `--open` somente para um handoff local interativo:

```bash
node bin/archify.mjs deliver architecture examples/web-app.architecture.json \
  web-app.html --quality showcase --open --json
```

Para comparar dois snapshots de Architecture, use `compare`. Ele grava o HTML e um arquivo sidecar de recibo ao lado dele:

```bash
node bin/archify.mjs compare architecture base.json head.json \
  architecture-delta.html --quality showcase --json
```

## 6. Inspecionar o arquivo final exato

As verificações determinísticas não executam o Viewer em um navegador. Quando o Chrome ou o Chromium estiver disponível, colete evidências automatizadas do navegador a partir do HTML exato entregue:

```bash
node bin/archify.mjs visual-check web-app.html --json
```

Esse recibo avalia o comportamento em tempo de execução dentro dos limites definidos; ele não aprova o acabamento visual. Inspecione o HTML ou as capturas de tela geradas separadamente. Siga o [contrato de entrega](../archify/references/delivery-contract.md) ao registrar trabalhos manuais complementares no navegador; uma simples observação fornece suporte apenas para a revisão visual.

Use o contrato de entrega para a cobertura canônica das evidências do navegador, a vinculação do artefato, o status da revisão visual e os campos de handoff. O [Contrato da Skill](../archify/SKILL.md) explica as invariantes de autoria e o ciclo de correção com escopo definido.
