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
