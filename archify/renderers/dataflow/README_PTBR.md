# Data Flow Renderer

Converter arquivos JSON com `diagram_type: “dataflow”` para o modelo HTML padrão do Archify.

```bash
node archify/renderers/dataflow/render-dataflow.mjs input.dataflow.json output.html
```

O renderizador valida os dados de entrada em relação ao arquivo `archify/schemas/dataflow.schema.json`
usando o validador independente incluído no pacote. Não é necessária a instalação de nenhuma dependência.

Se o arquivo `output.html` for omitido, o renderizador usa o parâmetro `meta.output` do arquivo JSON
ou, caso contrário, recorre ao arquivo `dataflow.html` no diretório de trabalho atual.

## Input

Os arquivos JSON de Data-Flow devem definir:

```json
{
  "schema_version": 1,
  "diagram_type": "dataflow",
  "meta": {
    "title": "Product Analytics Data Flow",
    "viewBox": [940, 720]
  },
  "stages": [],
  "nodes": [],
  "flows": [],
  "cards": []
}
```

Um exemplo completo com resolução está disponível em
`archify/examples/product-analytics.dataflow.json`.

O schema está localizado em:

```text
archify/schemas/dataflow.schema.json
```

## Legend

A legenda visual padrão obtém os tipos a partir de `flows[].variant` (omitir
`variant` significa `default`) e adiciona `database` somente quando existe um nó de banco de dados.
As chaves `meta.legend.entries` suportadas, em ordem estável, são `emphasis`,
`security`, `dashed`, `database` e `default`. As variantes de fluxo permanecem
apenas o conteúdo visual porque o Archify não possui fatos compilados sobre tipos de arestas nessa fatia. Uma
entrada `database` presente é diferente: ela provém de fatos exatos
`nodes[].type: “database”`, portanto, publica a contagem normal da Legenda Semântica,
o nome acessível e a interação por teclado. Forçar a visibilidade de `database`
sem um nó de banco de dados mantém apenas o conteúdo visual.

## Layout budget

| Constant | Value |
|----------|-------|
| viewBox | default `[940, 720]`; schema minimum `[360, 360]` |
| Stages (2–5) | centers at x = 100 + stage×215; stage band 168 wide, header at y 46 |
| Row tops (`row` 0–4) | y = 128, 242, 356, 470, 584 (plus `yOffset`) |
| Default node | 112×58 |
| Node area | x within `[24, width − 24]`; y within `[104, height − 74]` |
| Node spacing | ≥10px between any two nodes (checked across stages and rows) |
| Flow length | ≥34px between endpoints |
| Legend row | y = height − 36 |

Predefinição de trajetória para fluxos: `straight`, `vertical-channel`, `bottom-channel`,
`top-channel`, pontos `via` explícito, ou a opção padrão `auto` (midpoint elbow).

## Regras de Projeto

- Use estágios para definir os limites do ciclo de vida dos dados: origem, captação, processamento, armazenamento,
consumo.
- Posicione os nós por índice de estágio e índice de linha; não posicione manualmente SVG bruto para o caso comum.
- Use rótulos de fluxo para nomear o ativo de dados, não a primitiva de transporte:
  `clickstream`, `identity map`, `normalized facts`, `feature vectors`.
- Use `classification` para contextos breves de sensibilidade ou governança:
  `PII touch`, `non-PII`, `approved only`, `batch`, `read-only`.
- Use `security` para PII, política, consentimento, controle de acesso ou junções restritas.
- Use `emphasis` para o caminho de dados primário e `dashed` para derivações assíncronas ou em lote
  .
- Mantenha as etiquetas curtas o suficiente para caberem em visualizações estreitas.

As violações de esquema geram um código de saída diferente de zero, com mensagens prefixadas por caminho e anotadas com o
ID ou o rótulo do elemento. Além disso, o renderizador falha quando detecta
problemas de layout, incluindo estágios ausentes, IDs de nós duplicados, nós fora
da área legível do diagrama, sobreposição de nós, rótulos colidindo com nós ou outros
rótulos, rótulos mais largos que seus nós, pontos finais de fluxo desconhecidos, rótulos de fluxo
ausentes, fluxos curtos a ponto de serem ilegíveis, fluxos cruzando nós não relacionados (espaço livre de 2px para Clean Flow
) ou estágios que excedem a viewBox. Os quadros dos estágios permanecem como
contêineres de passagem intencionais. A largura do texto
é estimada levando em conta CJK-aware: glifos de largura total contam como duas unidades.

Defina `meta.quality_profile` como `showcase` para uma entrega refinada. Cruzamentos X adequados não relacionados
são rejeitados com `composition/proper-crossing`; o padrão `standard`
os mantém como avisos de recebimento de artefatos. Corredores de etapas colineares estão fora
da regra de cruzamento X adequado, mas um gate separado emite um aviso no modo `standard` e rejeita no
`showcase` quando fluxos não relacionados se sobrepõem por pelo menos 8px. Pontos finais semânticos
compartilhados, toques pontuais e sobreposições mais curtas permanecem válidos. O modo `showcase` também
rejeita qualquer segmento de rota com menos de 8px e qualquer segmento de curva interna com menos de 16px;
segmentos finais comuns de 8 a 15px permanecem válidos.