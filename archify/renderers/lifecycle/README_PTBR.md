# Lifecycle Renderer

Converter arquivos JSON com `diagram_type: “lifecycle”` para o modelo HTML padrão do Archify.


```bash
node archify/renderers/lifecycle/render-lifecycle.mjs input.lifecycle.json output.html
```

O renderizador valida as entradas em relação ao arquivo `archify/schemas/lifecycle.schema.json`
usando o validador independente incluído no pacote. Não é necessário a instalação de nenhuma dependência.

Se `output.html` for omitido, o renderizador usa `meta.output` do arquivo JSON
ou, caso contrário, recorre a `lifecycle.html` no diretório de trabalho atual.

## Input

Os arquivos JSON de lifecycle devem definir:

```json
{
  "schema_version": 1,
  "diagram_type": "lifecycle",
  "meta": {
    "title": "Agent Run Lifecycle",
    "viewBox": [980, 660]
  },
  "lanes": [],
  "states": [],
  "transitions": [],
  "cards": []
}
```

Os identificadores das faixas são semânticos e reservados: é necessário uma faixa com o identificador `main`, que se mapeia
para a faixa de fase superior; `terminal` se mapeia para a faixa de resultado inferior; todos os demais
identificadores de faixa (até 4 faixas no total) compartilham a única faixa de evento do meio. Os três
cabeçalhos das faixas são gerados a partir dos rótulos das faixas — a faixa do meio une os rótulos de
todas as faixas de eventos com ` + `. Um exemplo completo em funcionamento está disponível em
`archify/examples/agent-run.lifecycle.json`.

O schemas está localizado em:

```text
archify/schemas/lifecycle.schema.json
```

## Legend

A legenda padrão obtém os tipos a partir de `states[].type`. As chaves
`meta.legend.entries` suportadas, em ordem estável, são `start`, `active`, `waiting`,
`decision`, `success`, `failure`, `neutral` e `external`. Os rótulos e
a visibilidade podem ser substituídos por meio do contrato de legenda compartilhada; apenas os tipos
associados a estados renderizados recebem controles da Legenda Semântica.

## Layout budget

| Band | Lane id | Top y | Column centers | Default state |
|------|---------|-------|----------------|---------------|
| Phase | `main` (required) | 126 | `col` 0–4 → x = 94, 248, 402, 556, 710 | 118×62 |
| Event | any other id | 278 | `col` 0–2 → x = 402, 556, 710 | 126×58 |
| Outcome | `terminal` | 450 | `col` 0–2 → x = 402, 556, 710 | 118×58 |

As colunas de eventos e terminais estão intencionalmente deslocadas em relação ao trilho principal:
a coluna de evento/terminal `col: N` usa a mesma coordenada x que a coluna principal `col: N + 2`.
Por exemplo, as colunas 0, 1 e 2 da faixa inferior se alinham abaixo das colunas principais 2, 3
e 4, respectivamente.

| Constant | Value |
|----------|-------|
| viewBox | default `[980, 660]`; schema minimum `[420, 566]` |
| State area | x within `[32, width − 32]`; state bottom at or above `height − 122` |
| State spacing | ≥10px between any two states — checked across lanes, because all event lanes share one band; separate same-band states with `col` or `yOffset` |
| Transition length | ≥32px between endpoints |
| Legend row | final baseline y = height − 36; extra measured rows wrap upward |

A linha-guia do lifecycle principal segue ao longo da faixa de fase e se estende até a
coluna de fase ocupada mais distante. Predefinições de rota para transições: `straight`,
`drop` (curva em `channelY`, com padrão no ponto médio vertical),
`bottom-channel`, `top-channel`, `right-channel`, `left-channel`, pontos
`via` explícitos ou o padrão `auto`. Transições com múltiplos segmentos têm
cantos arredondados; ajuste-os com `cornerRadius` (padrão 10, `0` para curvas fechadas).

## Design Rules

- Trate os diagramas de ciclo de vida como um mapa de fases, e não como um gráfico denso de transição de estados.
- Coloque o lifecycle principal em uma linha horizontal, utilizando a faixa `main`.
- Use rótulos `step` para fases ordenadas, como `01`, `02` e `03`.
- Use as faixas inferiores apenas para interrupções, recuperação e saídas finais.
- Mantenha os rótulos de transição fora do SVG principal, a menos que o rótulo seja essencial;
  dê preferência a rótulos de nós, tags, entradas na legenda e cartões de resumo.
- Evite linhas diagonais e cruzadas. As saídas finais devem descer verticalmente a partir
  de seu evento de origem sempre que possível.
- Use `success` para conclusão, `failure` para falhas/saídas finais,
  `waiting` para pausas e `decision` para portas de qualidade.

Violações de esquema retornam um valor diferente de zero com mensagens prefixadas por caminho e anotadas com o
ID ou rótulo do elemento. Além disso, o renderizador falha quando detecta
problemas de layout, incluindo a ausência da faixa `main`, IDs de estado duplicados,
faixas desconhecidas, pontos finais de transição desconhecidos, estados fora da área do lifecycle,
estados sobrepostos (inclusive entre faixas), rótulos que colidem com estados ou
outros rótulos, rótulos mais largos que seu estado, transições curtas a ponto de serem ilegíveis ou
transições que atravessam estados não relacionados (espaço livre de 2px no Clean Flow). As faixas de
lifecycle permanecem como contêineres de passagem intencionais.
A largura do texto é estimada levando em conta os caracteres CJK: glifos de largura total contam como duas unidades.

Defina `meta.quality_profile` como `showcase` para uma entrega refinada. Cruzamentos “proper-X” não relacionados
então falham com `composition/proper-crossing`; o padrão `standard`
os mantém como avisos de recebimento de artefatos. A verificação final de artefatos analisa
cantos arredondados de `Q`. Corredores colineares permanecem fora da regra de cruzamentos corretos, mas
um filtro separado emite um aviso em `standard` e reprova em `showcase` quando transições não relacionadas
se sobrepõem por pelo menos 8px. Pontos finais semânticos compartilhados, toques pontuais
e sobreposições mais curtas permanecem válidos. O `showcase` também rejeita qualquer segmento de rota
com menos de 8px e qualquer segmento de curva interna com menos de 16px; os stubs comuns de pontos finais
entre 8 e 15px permanecem válidos.
