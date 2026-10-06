# Sequence Renderer

Converter arquivos JSON com `diagram_type: “sequence”` para o modelo HTML padrão do Archify
.

```bash
node archify/renderers/sequence/render-sequence.mjs input.sequence.json output.html
```

O renderizador valida as entradas em relação ao arquivo `archify/schemas/sequence.schema.json`
usando o validador independente incluído no pacote. Não é necessário instalar nenhuma dependência.

Se `output.html` for omitido, o renderizador usa `meta.output` do arquivo JSON
ou, caso contrário, recorre a `sequence.html` no diretório de trabalho atual.

## Input

Os arquivos JSON de sequence devem definir:

```json
{
  "schema_version": 1,
  "diagram_type": "sequence",
  "meta": {
    "title": "Cache Miss Request Sequence",
    "viewBox": [920, 760]
  },
  "participants": [],
  "segments": [],
  "messages": [],
  "activations": [],
  "cards": []
}
```

A linha do tempo se ajusta à altura da viewBox: um `meta.viewBox` mais alto oferece mais
espaço para a mensagem, enquanto um mais baixo reduz a faixa legível em vez de cortar o conteúdo. Um
exemplo prático completo está disponível em
`archify/examples/cache-miss-request.sequence.json`.

O schemas está localizado em:

```text
archify/schemas/sequence.schema.json
```

## Legend

A legenda visual padrão deriva os tipos de `messages[].variant` (omitir
`variant` significa `default`). As chaves `meta.legend.entries` suportadas, em ordem
estável, são `emphasis`, `return`, `security`, `dashed` e `default`. Estas são chaves de mensagem visual,
não controles do Semantic Lens; substituições de rótulo/visibilidade não criam fatos de borda.

## Layout budget

| Constant | Value |
|----------|-------|
| viewBox | default `[920, 760]`; schema minimum `[480, 480]` |
| Participant boxes | `fixed` (default): 86×54 at y 72; `spread`: viewBox-relative width from 86px up to 190px |
| Participant columns | `fixed`: centers at x = 62 + index×108; `spread`: columns distribute across the available viewBox width |
| Participant count | the last box must end at or before width − 40; layouts that cannot fit fail closed |
| Lifelines | from y 142 down to height − 65; band must be ≥120px tall |
| Message `y` range | `[160, height − 83]` |
| Message spacing | ≥28px vertical between messages that share horizontal space |
| Arrow span | ≥60px horizontal between the two participants |
| Segments | y pixel ranges with `to > from`, inside `[72, lifeline bottom + 20]` |
| Legend row | y = height − 54 |

`segments[].from/to` e `activations[].from/to` são coordenadas de pixels y, e não
IDs de participantes; as ativações também exigem que `to > from`.

### Column fit

Os diagramas de sequência utilizam `meta.column_fit: “fixed”` por padrão, para que os
documentos existentes mantenham suas coordenadas históricas. Use `“spread”` quando uma
viewBox larga deixaria espaço vazio à direita ou quando rótulos significativos
dos participantes não couberem nas caixas fixas de 86px. A opção “spread” calcula a largura da caixa
e a distância entre as colunas a partir da viewBox, preservando a ordem dos participantes,
as linhas de vida e a semântica das mensagens.

## Design Rules

- Coloque os participantes na parte superior, ordenados de acordo com a narrativa que o leitor deve
  acompanhar.
- O tempo avança para baixo.
- Use `emphasis` para o caminho principal da solicitação.
- Use `security` para chamadas relacionadas a autenticação, consentimento, permissão e políticas.
- Use `return` para mensagens de resposta silenciosas.
- Use `dashed` para rastreamento assíncrono, eventos, registro em log e tarefas não bloqueantes.
- Use segmentos como orientações leves de fundo; mantenha os rótulos dos segmentos curtos.
- Mantenha os rótulos concisos, mas experimente `meta.column_fit: “spread”` antes de encurtar um
  rótulo de participante significativo apenas para caber nas caixas fixas.

Violações de esquema retornam um valor diferente de zero com mensagens prefixadas por caminho e anotadas com o
ID ou rótulo do elemento. Além disso, o renderizador falha quando detecta
problemas de layout, incluindo participantes ausentes, IDs de participantes duplicados,
rótulos de participantes mais largos que sua caixa, pontos finais de mensagem desconhecidos, mensagens
fora da linha do tempo legível, espaçamento vertical excessivamente apertado entre mensagens
que se sobrepõem horizontalmente, segmentos ou intervalos de ativação inválidos, ou
participantes que excedem a viewBox. O contrato compartilhado do Clean Flow trata
os cabeçalhos dos participantes como caixas semânticas, ao mesmo tempo em que permite explicitamente que as mensagens
atravessem linhas de vida intermediárias, barras de ativação e quadros de segmento. A largura do texto é estimada levando em conta os caracteres CJK: glifos de largura total contam como duas unidades.

Defina `meta.quality_profile` como `showcase` para uma entrega aprimorada. Cruzamentos de mensagens “proper”
não relacionadas a X, então, falham com `composition/proper-crossing`; o padrão
`standard` as mantém como avisos de recebimento de artefatos. As mensagens ainda podem cruzar
linhas de vida intermediárias. Corredores colineares permanecem fora da regra `proper-X`,
mas um filtro separado emite um aviso no modo `standard` e rejeita no modo `showcase` quando mensagens não relacionadas
se sobrepõem por pelo menos 8px. Pontos finais semânticos compartilhados, toques pontuais
e sobreposições mais curtas permanecem válidos. O `showcase` também rejeita qualquer segmento de rota
com menos de 8px e qualquer segmento de curva interna com menos de 16px; os stubs comuns de pontos finais
entre 8 e 15px permanecem válidos.
