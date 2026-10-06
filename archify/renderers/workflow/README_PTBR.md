# Workflow Renderer

Converter arquivos JSON com `diagram_type: “workflow”` para o modelo HTML padrão do Archify.


```bash
node archify/renderers/workflow/render-workflow.mjs input.workflow.json output.html
```

O renderizador valida as entradas em relação ao arquivo `archify/schemas/workflow.schema.json`
com o validador independente incluído no pacote. Não é necessária a instalação de nenhuma dependência.

Se `output.html` for omitido, o renderizador usa `meta.output` do arquivo JSON
ou, caso contrário, recorre ao arquivo `workflow.html` no diretório de trabalho atual.

Após a renderização, execute o verificador de artefatos:

```bash
node archify/scripts/check-render-output.mjs output.html
```

Ele detecta problemas finais no SVG que são mais fáceis de identificar em um navegador: valores SVG não finitos,
setas diagonais acidentais de dois pontos e setas que cruzam a legenda.

## Input

Os arquivos JSON de workflow devem definir:

```json
{
  "schema_version": 2,
  "diagram_type": "workflow",
  "meta": {
    "title": "Agent Tool Call Workflow"
  },
  "lanes": [],
  "phases": [],
  "groups": [],
  "mainPath": [],
  "nodes": [],
  "edges": [],
  "cards": []
}
```

Use `schema_version: 2` para novos fluxos de trabalho. Seu compilador de layout legível trata
cada `col` como um rank lógico no intervalo `0..5` e deriva a geometria a partir do documento
medido. `schema_version: 1` continua sendo o contrato legado fixo para fontes existentes;
a saída válida da v1 é preservada byte a byte e nunca é reinterpretada silenciosamente
como v2.

Omita `meta.viewBox` no caso comum da v2 para que o compilador possa usar os limites
medidos intrínsecos. Na v1, a largura omitida permanece fixa em 720 e a altura é
derivada do número de faixas. Um exemplo completo com explicações está disponível em
`archify/examples/agent-tool-call.workflow.json`; seu `schema_version` seleciona o contrato aplicável.

O schemas está localizado em:

```text
archify/schemas/workflow.schema.json
```

## Migration and layout receipt

Migrar uma fonte v1 existente para um arquivo v2 separado:

```bash
node archify/bin/archify.mjs migrate workflow old.json new.json --to-schema 2 --json
```

Executar o comando novamente usando a saída do schema-v2 como nova fonte constitui uma
verificação idempotente: os bytes e a geometria de destino permanecem inalterados.

Por padrão, o comando nunca sobrescreve a fonte. Ele mapeia os valores absolutos
`via[*][0]`, `labelAt[0]` e `channelX` do espaço de classificação legado para o resolvido,
preserva as coordenadas y, a menos que uma restrição vertical relatada exija
a intervenção do autor, expande uma viewBox explícita apenas para uma correção de contenção
inequívoca e grava o destino somente após a compilação v2 e as verificações de artefatos
terem sido aprovadas. Pinos explícitos ambíguos falham sem produzir o destino.

Verifique o plano v2 estável voltado para autores com:

```bash
node archify/bin/archify.mjs validate workflow input.workflow.json --layout-json
```

O recibo informa o contrato selecionado, os valores medidos de `viewBox` e
`requiredViewBox`, as colunas, nós, arestas e rótulos resolvidos, além dos diagnósticos causais.
Ele omite deliberadamente as iterações do solucionador e as pontuações dos candidatos.


## Legend

A legenda padrão obtém os tipos de componentes a partir de `nodes[].type`. As chaves
`meta.legend.entries` suportadas, em ordem estável, são `frontend`, `backend`,
`security`, `messagebus`, `database`, `cloud` e `external`. Os rótulos e
a visibilidade podem ser substituídos por meio do contrato de legenda compartilhada; apenas os tipos
associados a nós renderizados recebem controles da Legenda Semântica.

## Layout contracts

### Fixed v1

| Constant | Value |
|----------|-------|
| viewBox | default `[720, auto]` — auto height = 52 + lanes×104 + (lanes−1)×20 + 124 |
| Lane frame | x 40, width 640, height 104, gap 20; first lane top at y 52 |
| Lane title strip | top 30px of each lane; node boxes must stay below it |
| Column centers (`col` 0–5) | x = 88, 220, 300, 430, 500, 625 |
| Phase headers | Optional `phases[]` render above the first lane, spanning `fromCol..toCol` |
| Lane groups | Optional `groups[]` frame parallel work or branch work inside one lane |
| Exception lanes | Set `lane.variant: "exception"` for retry, denial, fallback, or failure paths |
| Main path lint | Optional `mainPath[]` checks that happy-path steps have matching edges and do not move backward |
| Default node | 92×52 (height 68 when `tag` is set) |
| Node spacing | ≥8px between nodes in the same lane |
| Edge length | straight segments must span ≥28px |
| Legend row | y = lane bottom + 44; viewBox height must be ≥ legend y + 18 |

Os espaços entre colunas são 132 / 80 / 130 / 70 / 125 px: colunas 1↔2 (80 px) e
3↔4 (70 px) não podem, ao mesmo tempo, conter nós com largura padrão de 92 px na mesma faixa. Uma
fonte v1 inválida como essa recebe um diagnóstico causal `workflow/column-capacity` e
uma correção verificada de migração para a v2; a v1 nunca recorre ao layout adaptativo.

### Readable v2

| Invariant | Contract |
|----------|----------|
| Logical columns | `col` is an integer in `0..5`; pixel centers are measured output |
| Adjacent-rank baseline | 120px center distance before document-specific constraints |
| Same-lane node clearance | ≥8px when vertical node intervals overlap |
| Facing direct edge | clear gap ≥`max(28px, measured label mask width + 8px)` |
| Automatic route rhythm | direct segment ≥28px; endpoint stub ≥8px; interior turn segment ≥16px |
| Implicit viewBox | intrinsic content bounds plus contract padding |
| Explicit viewBox | containment capacity; too-small input reports exact `requiredViewBox` and contributors |

O compilador aplica restrições apenas a nós efetivamente relacionados ou sobrepostos
na mesma faixa; portanto, um nó largo em uma faixa não relacionada não se expande a cada
faixa. Os centros legados são uma preferência flexível após as restrições de correção, não
uma garantia geométrica. Os quadros de fase e de grupo derivam das faixas resolvidas.
As rotas automáticas são normalizadas uma única vez, e a mesma cena final orienta
a validação e a serialização SVG. Rótulos automáticos longos comparam o crescimento direto da
margem com um canal válido, em vez de alargar cada rank a jusante. Legendas multilinha medidas 
participam da altura intrínseca e da capacidade explícita da viewBox.


Os pinos definidos por `via`, `labelAt`, `channelX` e `channelY` são pinos absolutos fixos na
v2; um pino inviável retorna `workflow/explicit-pin-conflict` em vez de ser
movido silenciosamente. `fromSide` e `toSide` continuam sendo restrições de direção. Uma predefinição de rota
restringe a família de candidatos automáticos, mas não é, por si só, uma
fixação de coordenadas absoluta. Quando qualquer um dos lados do ponto final é omitido,
o compilador da v2 escolhe um lado viável; um lado definido pelo autor restringe esse ponto final à porta nomeada.

## Design Rules

- Use faixas para delimitar responsabilidades ou limites de tempo de execução.
- Use cabeçalhos de fase para etapas principais da história, como Captura, Planejamento, Execução e Relatório.
- Use grupos para verificações paralelas, tratamento de ramificações ou trabalho delimitado dentro de uma faixa; cada grupo deve conter pelo menos um nó.
- Use `lane.variant: “exception”` para faixas de espera humana, recusa, nova tentativa, alternativa e falha, em vez de misturar esses caminhos no caminho normal.
- Defina `mainPath` quando o diagrama tiver um caminho normal claro; o renderizador valida se os IDs consecutivos têm arestas correspondentes e se movem da esquerda para a direita.
- Posicione os nós com IDs de faixa e índices `col` no intervalo `0..5`, e não com coordenadas SVG brutas.
- Preserve rótulos semânticos de arestas. O Readable v2 aloca espaço medido para rótulos;
  quando um rótulo não couber, corrija a capacidade relatada ou a restrição de rota
  em vez de excluir o significado.
- Use rótulos para decisões, aprovações, protocolos, rastros assíncronos, caminhos de retorno
  e qualquer outra relação cujo significado não esteja totalmente implícito em seus pontos finais.
- Dê preferência a predefinições de rota — `drop` (curva entre faixas; `bias` 0–1 determina onde),
  `outside-right`, `return-left`, `bottom-channel` e `up-channel` — antes de
  usar pontos `via` brutos. `straight` e o padrão `auto` cobrem o restante.
- Mantenha os exemplos de fluxo de trabalho compactos o suficiente para serem exibidos corretamente 
  em visualizações estreitas de bate-papo/navegador.

### Optional semantic checks

A validação do layout não pode inferir a verdade do domínio a partir de rótulos ou cartões. 
Quando as evidências de origem estabelecem raízes, terminais, relações diretas obrigatórias ou
acessibilidade direcionada obrigatória, codifique esses fatos em `semanticChecks`:

```json
"semanticChecks": {
  "allowedRoots": ["request", "resource_catalog"],
  "allowedTerminals": ["reply", "audit_log"],
  "requiredEdges": [
    { "from": "dispatch", "to": "dispatch_ledger" }
  ],
  "requiredPaths": [
    { "from": "event_ledger", "to": "runtime_host" }
  ]
}
```

Quando `allowedRoots` ou `allowedTerminals` estiver presente, trata-se da lista completa de permissões
para nós sem entradas ou sem saídas, respectivamente. `requiredEdges`
exige uma direção exata definida; `requiredPaths` permite nós intermediários,
mas segue a direção definida para as arestas. Essas verificações são executadas antes do layout, não
alteram o SVG nem os bytes de recebimento e não devem ser enfraquecidas apenas para resolver um
diagnóstico de rota ou composição. Omita campos cujos dados de domínio sejam desconhecidos.

As violações de schemas retornam um valor diferente de zero com mensagens prefixadas por caminho e anotadas com o
ID ou rótulo do elemento. Além disso, o renderizador falha quando detecta
problemas de layout, incluindo sobreposição de nós, nós fora de suas faixas, intervalos inválidos
de colunas de fase/grupo, grupos vazios, etapas `mainPath` interrompidas, destinos de aresta
desconhecidos, rótulos colidindo com nós ou outros rótulos, rótulos mais largos que seu nó,
legendas fora da viewBox ou setas retas que são curtas demais para serem lidas com clareza. 
O Clean Flow Gate compartilhado também rejeita arestas que cruzam nós não relacionados com folga de 2 px; faixas, 
fases e grupos permanecem como recipientes de passagem intencionais.
A largura do texto é estimada levando em conta caracteres CJK: glifos de largura total contam como duas unidades.

Os diagnósticos são causais: uma falha de limite de classificação suprime os resultados relativos a bordas curtas derivadas,
direção dos pontos finais e sobreposição de rótulos. 
Cada entrada de `supportedFixes[]` é verificada por meio do replanejamento da edição proposta, e um diagnóstico 
nunca propõe a remoção de um rótulo semântico quando a presença desse rótulo não causa a invariável que falhou.

Defina `meta.quality_profile` como `showcase` para uma entrega refinada. Cruzamentos em X corretos,
mas não relacionados, são rejeitados com `composition/proper-crossing`; o padrão `standard`
os mantém como avisos de recebimento de artefato. Corredores de faixas colineares estão fora
da regra de cruzamentos em X corretos, mas um filtro separado emite um aviso no modo `standard` e rejeita no
`showcase` quando arestas não relacionadas se sobrepõem por pelo menos 8px. Pontos finais semânticos
compartilhados, toques pontuais e sobreposições mais curtas permanecem válidos. O modo `showcase` também
rejeita qualquer segmento de rota com menos de 8px e qualquer segmento de curva interna com menos de 16px;
segmentos finais comuns de 8 a 15px permanecem válidos para lacunas fixas entre faixas.
