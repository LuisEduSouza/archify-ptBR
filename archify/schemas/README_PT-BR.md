# Esquemas IR em JSON do Archify

Cada renderizador tipado consome uma representação intermediária (IR) em JSON validada com base em um dos esquemas desta pasta antes que qualquer trabalho de layout ocorra.

## Arquivos

| Esquema | Governa | Arrays estruturais |
|--------|---------|-------------------|
| `workflow.schema.json` | `diagram_type: "workflow"` | `lanes`, `phases`, `groups`, `mainPath`, `nodes`, `edges` |
| `sequence.schema.json` | `diagram_type: "sequence"` | `participants`, `segments`, `messages`, `activations` |
| `dataflow.schema.json` | `diagram_type: "dataflow"` | `stages`, `nodes`, `flows` |
| `lifecycle.schema.json` | `diagram_type: "lifecycle"` | `lanes`, `states`, `transitions` |
| `architecture.schema.json` | `diagram_type: "architecture"` | `components`, `boundaries`, `connections` |
| `common.schema.json` | Apenas `$defs` compartilhados (sem documento de nível superior) | — |

Cada esquema de diagrama exige `schema_version`, `diagram_type`, `meta` (com `title`) e seus arrays estruturais — exceto `segments`, `activations` e `cards`, que são opcionais — e define `additionalProperties: false` em todos os níveis, de modo que campos desconhecidos são rejeitados em vez de silenciosamente ignorados.

Todo objeto `meta` também aceita `animation: "trace"` para movimento em SVG/CSS opcional no HTML gerado. Omita-o ou defina como `"none"` para a saída estática padrão.
Também aceita `locale: "en" | "zh-CN"`. Esse campo seleciona a interface fixa do Visualizador (Viewer UI), as legendas e textos de acessibilidade padrão mantidos pelo renderizador, o sufixo do título do documento e o valor do atributo `<html lang>`; ele não traduz cadeias de caracteres (strings) criadas pelo autor. Omiti-lo preserva o comportamento legado e resulta em inglês. Valores de localidade não suportados falham na validação do esquema em vez de serem adivinhados ou silenciosamente reescritos.
`visual_preset` aceita `classic` (o padrão estável), `signal-flow` (apresentação luminosa focada em movimento), `blueprint` (revisão de engenharia de alto contraste) ou `editorial` (revisão de design e documentação em estilo de publicação acolhedor).
Os conjuntos predefinidos (presets) alteram apenas o estilo do visualizador; eles não alteram IDs semânticos ou geometria.
O `meta` do diagrama do tipo Sequence aceita adicionalmente `column_fit`. O padrão `fixed` mantém o espaçamento histórico de coluna de 108px e caixas de participantes de 86px, para que um diagrama criado seja renderizado nas mesmas coordenadas, independentemente de quão largo seja o seu viewBox. O valor `spread` deriva o espaçamento e a largura da caixa a partir do viewBox, o que transforma uma tela larga em distância de coluna e espaço para rótulos, em vez de espaço em branco à direita. A ordem das raias (lanes), IDs e semântica de mensagens permanecem inalteradas em ambos os casos.

Pode também incluir até cinco visualizações guiadas (`views`). Cada visualização possui um `id` exclusivo, um rótulo `label` voltado ao leitor, uma lista `focus` não vazia de IDs de nós semânticos existentes e uma nota curta `note` opcional.

### Contrato de apresentação de legenda

Todo objeto `meta` aceita o mesmo formato de legenda opcional sem alterar a versão do esquema já selecionada para aquele renderizador:

```json
"legend": {
  "mode": "auto",
  "entries": {
    "security": { "label": "restricted data", "visible": true }
  }
}
```

O campo `mode` pode ser `auto` (o padrão), `all` ou `hidden`. `auto` inclui apenas os tipos presentes no IR tipado; `all` inclui o catálogo estável completo do renderizador; `hidden` remove a legenda completa e tem precedência sobre as sobreposições de entradas.
Documentos de arquitetura que omitem um tamanho explícito de `viewBox` calculam esse viewBox automático a partir da mesma ocupação de legenda resolvida e medida usada para o layout SVG final. Em todos os renderizadores, documentos legados que omitem `meta.legend` usam um comportamento implícito `auto` seguro para compatibilidade: se a legenda resolvida não couber em um viewBox explícito do autor sem sobreposição, o Archify omite a legenda completa em vez de transformar um documento schema-v1 anteriormente válido em uma falha crítica.
Assim que o autor adiciona `meta.legend` (incluindo o modo explícito `mode: "auto"`), o layout torna-se intencional e rótulos ou faixas inadequadas falham com um diagnóstico prefixado pelo caminho. Uma entrada pode definir um `label` delimitado e não vazio, um valor booleano `visible`, ou ambos.
`visible: false` remove uma entrada resolvida e `visible: true` força um tipo suportado, porém não utilizado, a aparecer na legenda visual. Tipos e propriedades desconhecidos falham na validação estrita.

As chaves suportadas pertencem a cada renderizador:

| Renderizador | Chaves para `meta.legend.entries` |
|---|---|
| Architecture | `frontend`, `backend`, `database`, `cloud`, `security`, `messagebus`, `external` |
| Workflow | `frontend`, `backend`, `security`, `messagebus`, `database`, `cloud`, `external` |
| Sequence | `emphasis`, `return`, `security`, `dashed`, `default` |
| Dataflow | `emphasis`, `security`, `dashed`, `database`, `default` |
| Lifecycle | `start`, `active`, `waiting`, `decision`, `success`, `failure`, `neutral`, `external` |

Os rótulos (labels) destinam-se apenas à apresentação: eles não renomeiam o tipo estável, não alteram nós/relacionamentos, nem criam fatos de aresta no Semantic Lens. Mensagens de Sequence e variações de fluxo de Dataflow são chaves visuais. Entradas de componentes/estados respaldadas por fatos compilados exatos de nós recebem a ponte interativa da Legenda Semântica; isso includes `database` em Dataflow quando existe um fato real `nodes[].type: "database"`.

Toda coleção de relacionamentos (`connections`, `edges`, `messages`, `flows` e `transitions`) aceita um `id` opcional controlado pelo autor usando o padrão de ID compartilhado. O renderizador mantém sua chave em tempo de execução na ordem de origem separadamente, enquanto o ID definido pelo autor permite um link estável no visualizador `#relation=<id>` que sobrevive à reordenação dos arrays. Documentos sem ID permanecem válidos e a fixação de seus relacionamentos permanece local na página atual.

Toda coleção de nós semânticos (`components`, `nodes`, `participants` e `states`) também aceita uma marca opcional `brand`: seja uma string canônica retornada por `archify brands --json`, ou um objeto `{ "url", "sha256" }` com hash fixo retornado por `archify brands capture <url> --json`. IDs conhecidos e domínios de marcas conhecidas usam o catálogo vetorial integrado. URLs desconhecidas devem ser capturadas por esse comando explícito antes da autoria; as etapas de renderização e validação nunca realizam uma captura de rede sem hash fixo. Conteúdos não seguros, indisponíveis, alterados ou não suportados falham imediatamente com um diagnóstico de marca. A omissão de `brand` preserva a saída anterior.

## Política de `schema_version`

O tipo Workflow suporta as versões 1 e 2 do esquema. A versão 1 permanece como o contrato de compatibilidade para layout fixo; a versão 2 adota o compilador legível de workflow e pode ser gerada explicitamente com `archify migrate workflow ... --to-schema 2`.
Os outros quatro esquemas de diagrama mantêm `schema_version` fixado em `1`.

O Workflow também aceita a propriedade opcional `semanticChecks`. `allowedRoots` e `allowedTerminals` fecham o conjunto de origens (sources) e destinos (sinks) intencionais do grafo; `requiredEdges` exige relacionamentos exatos definidos pelo autor; e `requiredPaths` exige alcançabilidade direcionada ao mesmo tempo em que permite nós intermediários. O compilador avalia esses fatos antes do layout e retorna diagnósticos tipados `workflow/*`. O campo é aditivo e neutro quanto à geometria: omiti-lo preserva o comportamento existente do workflow, e incluir um contrato satisfeito não altera o SVG nem os bytes de confirmação do layout.

Um arquivo que valida hoje deve continuar validando e renderizando dentro da sua versão declarada ao longo de toda a linha de lançamentos 2.x. Melhorias aditivas de visualizador, acessibilidade e apresentação podem aprimorar o HTML gerado, mas não devem reinterpretar a IR do autor nem transformar um arquivo v1 sem perfil anteriormente válido em uma nova falha crítica de layout. Alterações incompatíveis (breaking changes) na IR exigem uma nova versão; campos aditivos e compatíveis com versões anteriores não exigem.

## Definições compartilhadas (common.schema.json)

Os cinco esquemas de diagrama referenciam `common.schema.json#/$defs/...`:

- `id` — identificadores de elementos, padrão `^[a-zA-Z][a-zA-Z0-9_-]*$`
- `point` — um par de números `[x, y]` (usado por `via` e `labelAt`)
- `componentType` — `frontend`, `backend`, `database`, `cloud`, `security`, `messagebus`, `external`
- `locale` — a localidade delimitada do renderizador, `en` ou `zh-CN`
- `brandMark` — um ID de marca embutido opcional ou URL explícita de site HTTP(S)
- `variant` — `default`, `emphasis`, `security`, `dashed` (mensagens de sequência estendem essa lista localmente com `return`)
- `legendMode` e `legendEntry` — o modo estrito compartilhado e os formatos de sobreposição de rótulo/visibilidade usados por cada mapa de chaves mantido pelo renderizador
- `guidedViews` — os caminhos de leitura delimitados e somente leitura aceitos em `meta.views`
- `cards` — os blocos de cartões de resumo renderizados abaixo do SVG

O tipo de estado de Lifecycle (`type`) é específico do modo (`start`/`active`/`waiting`/...) e permanece em `lifecycle.schema.json`.

## Validação em tempo de execução

Durante o desenvolvimento, o script `scripts/generate-validators.mjs` compila todos os cinco esquemas com o gerador independente ajv (draft 2020-12) utilizando `strict: true` e `allErrors: true`. O arquivo gerado `renderers/shared/generated-validators.mjs` é versionado e distribuído junto com a skill, de modo que a validação em tempo de execução não possui dependências do npm ou de rede. O arquivo `renderers/shared/validator.mjs` aplica o validador independente correspondente antes das verificações de layout do próprio renderizador.
O carregador compartilhado verifica então os fatos entre coleções que o JSON Schema não consegue expressar de forma simples: IDs de visualização duplicados, IDs de foco duplicados, IDs de foco que não existem na coleção semântica do diagrama e IDs de relacionamentos duplicados criados pelo autor dentro da coleção de relacionamentos do modo.

O diagrama de Arquitetura suporta adicionalmente evidências de repositório opcionais e fixadas à revisão. `meta.repository` indica uma URL pública do GitHub e o SHA completo do commit; um componente pode conter de uma a três origens `sources` com caminhos POSIX relativos ao repositório, intervalos de linhas opcionais e rótulos opcionais. A estrutura é verificada pelo esquema; em seguida, o renderizador exige `--repo-root`: a origem do Git local deve coincidir, e o Git deve comprovar o commit, os blobs e as linhas solicitadas. Evidências verificadas são embutidas fora do SVG canônico para o Passaporte Semântico e Localizador de Nós; documentos ordinários e exportações visuais não carregam evidências de repositório.

## Qualidade visual e integridade de engenharia

`meta.quality_profile` e `meta.engineering_profile` respondem a perguntas diferentes. `quality_profile` está disponível em todos os cinco modos e controla a rigidez com que o Archify julga a composição. `engineering_profile` é um contrato semântico opcional exclusivo para Arquitetura; omiti-lo preserva o comportamento v1 comum.

O primeiro perfil de engenharia é `deployment-ownership`. Ative-o apenas quando o usuário desejar uma revisão de implantação com falha estrita e os fatos de origem forem conhecidos. Ele exige que cada componente não externo nomeie um proprietário em `tag` e pertença a exatamente uma região `region`; o documento deve conter as fronteiras de `region` e `security-group`; cada banco de dados `database` deve estar dentro de um `security-group`; cada grupo de segurança deve conter membros de uma única região compartilhada; e cada conexão cuja região ou pertencimento a um grupo de segurança mude deve nomear o mecanismo real de travessia em `label`.

O perfil valida apenas a IR criada pelo autor. Ele não descobre infraestrutura, não infere proprietários nem prova que um diagrama corresponde a um ambiente ativo. Se um fato for desconhecido, deixe o perfil não definido ou obtenha o fato em vez de inventá-lo.

O comando `npm test` executa o gerador no modo de verificação e falha se os validadores versionados estiverem desalinhados com seus esquemas.

## Formato de erro

Violações de esquema encerram a execução com código diferente de zero. Cada erro do ajv é relatado em sua própria linha como o caminho da instância — anotado com o `id` ou `label` do elemento delimitador mais próximo —, seguido pela mensagem e parâmetros:

```text
workflow schema validation failed:
  /nodes/3 (id/label: "router") must NOT have additional properties {"additionalProperty":"colour"}
```

Os esquemas identificam erros de formato (tipos, enumerações, faixas de valores, campos desconhecidos); problemas de geometria, como sobreposições e colisões de rótulos, são responsabilidade dos renderizadores.
