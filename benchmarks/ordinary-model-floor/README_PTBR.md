# Ordinary-Model Floor v1

Este benchmark avalia uma questão específica do produto: um agente de codificação comum é capaz de produzir um diagrama Archify que seja utilizável na primeira tentativa, sem que um ser humano precise corrigir o JSON?

Trata-se de um critério de aprovação, não de um ranking de modelos. Uma execução é considerada `firstPassUsable` somente quando todos os três critérios forem atendidos:

1. Os requisitos semânticos estão presentes e corretamente conectados.
2. A CLI real do Archify é aprovada no comando `validate --quality showcase --json`.
3. Um revisor designado inspeciona o artefato renderizado final, registra `passed` e não relata nenhum defeito.

Um diagrama válido para o renderizador, mas semanticamente incorreto, é considerado uma falha. Um diagrama visualmente agradável que falha na validação determinística também é considerado uma falha. A ausência de uma revisão visual é relatada com veracidade, nunca sendo reclassificada como aprovada.

## Suite

O arquivo `manifest.json` contém cinco tarefas delimitadas: arquitetura, fluxo de trabalho, sequência, fluxo de dados e ciclo de vida. Cada caso declara chaves semânticas, rótulos técnicos aceitos, tipos de funções visuais aceitos — nos casos em que mais de uma renderização é válida — e relações obrigatórias. O modelo mantém a liberdade de escolher IDs internos e layout. Os aliases de vocabulário nunca substituem a topologia: cada nó obrigatório deve ser vinculado uma vez e cada relação obrigatória deve continuar existindo na direção declarada.

Os fixtures de referência registrados comprovam apenas que o conjunto de testes e o verificador estão conectados corretamente. **Os fixtures de referência não constituem evidência de benchmark** e não devem ser publicados como resultados do modelo.

Verifique a integridade do conjunto de testes a partir da raiz do repositório:

```bash
node benchmarks/ordinary-model-floor/benchmark.mjs check --manifest benchmarks/ordinary-model-floor/manifest.json
```

## Fair-run protocol

Todas as configurações comparadas devem usar o mesmo prompt, o mesmo commit do repositório, a mesma habilidade e o mesmo esquema do Archify, o mesmo limite de tempo, acesso idêntico às ferramentas e um caminho de saída do candidato limpo. Registre os nomes exatos do agente e do modelo. Uma invocação completa do agente é a tentativa 1; o arquivo `benchmark-candidate.json` resultante é congelado quando a invocação termina. O agente pode usar a CLI do Archify incluída no pacote para validar e reparar seu candidato durante essa invocação; o harness externo revalida independentemente o arquivo congelado e permanece como a autoridade final. Preserve esse candidato sem edições e não permita edições posteriores, incluindo edições feitas por humanos, antes da verificação.

Execute a geração de candidatos a partir da **raiz da habilidade empacotada** extraída produzida por esse commit, não a partir da raiz do repositório de desenvolvimento. Mantenha o harness de benchmark, os casos, os prompts e os fixtures de referência fora da árvore de trabalho visível ao modelo; entregue o prompt selecionado por meio do executor externo. Isso testa a interface que os usuários realmente instalam e impede que os internos do benchmark alterem o custo de exploração ou vazem evidências de avaliação.

Não permita que uma correção posterior substitua a tentativa 1. Tentativas de correção podem ser retidas para diagnóstico, mas o relatório da primeira passagem aceita apenas os registros da tentativa 1. Execute todos os casos do manifesto para cada configuração; uma matriz incompleta ou duplicada não é elegível como evidência.

O harness deliberadamente não inicia os provedores de modelos. O executor externo é responsável pela autenticação, seleção de modelos, tempos de espera, entrega imediata e retenção de transcrições brutas. Isso mantém o código e os segredos dos provedores fora do Archify, ao mesmo tempo em que torna as verificações de artefatos determinísticas.

## Verify one run

Crie um arquivo de metadados da execução depois que o agente tiver gerado seu candidato:

```json
{
  "schema_version": 1,
  "case_id": "web-runtime-architecture",
  "agent": "agent-name",
  "model": "model-name",
  "attempt": 1,
  "visual_review": {
    "status": "passed",
    "reviewer": "reviewer-name",
    "defects": []
  }
}
```

Em seguida, verifique o candidato original:

```bash
node benchmarks/ordinary-model-floor/benchmark.mjs verify --case benchmarks/ordinary-model-floor/cases/web-runtime.architecture.case.json --candidate /path/to/candidate.architecture.json --run /path/to/run.json
```

O comando gera um recibo legível por máquina no stdout. O código de saída `0` significa que o candidato é utilizável na primeira passagem, `1` significa que o candidato falhou em um ou mais critérios, e `2` significa que as entradas ou a invocação do benchmark eram inválidas.

Se a invocação do agente terminar sem um candidato, preserve o registro operacional bruto do provedor e use `record-failure` para emitir um recibo de falha na primeira passagem, em vez de descartar a execução:

```bash
node benchmarks/ordinary-model-floor/benchmark.mjs record-failure --case benchmarks/ordinary-model-floor/cases/web-runtime.architecture.case.json --run /path/to/run.json --failure timeout
```

Os motivos permitidos são `timeout`, `no_candidate` e `provider_error`. Esses resultados são contabilizados para a cobertura completa da matriz e para o conjunto de falhas operacionais, mas os filtros semânticos, de validação e de revisão visual permanecem, de fato, como `not_run` ou `skipped`. Nunca transforme um candidato ausente em um arquivo JSON inválido inventado.

## Visual review

Analise o artefato final do navegador ou a imagem raster canônica, e não apenas o JSON de origem:

- `passed`: nenhum defeito visível, com uma identidade de revisor não vazia.
- `failed`: foram observados um ou mais defeitos concretos.
- `skipped`: não havia revisor ou leitor de imagens qualificado disponível.

Use tags curtas para defeitos, como `clipping`, `node-overlap`, `label-overlap`, `hidden-route`, `stacked-edge`, `weak-hierarchy`, `unbalanced-whitespace` ou `theme-contrast`. Uma revisão com status `skipped` nunca pode resultar em `firstPassUsable: true`.

## Report a complete matrix

Armazene um recibo do verificador por linha em um arquivo JSONL e, em seguida, agregue-o ao manifesto:

```bash
node benchmarks/ordinary-model-floor/benchmark.mjs report --results /path/to/results.jsonl --manifest benchmarks/ordinary-model-floor/manifest.json
```

O relatório distingue os grupos de falhas operacionais, semânticas, de validação determinística e de revisão visual. `evidenceEligible` é verdadeiro apenas quando cada configuração de agente/modelo possui exatamente um comprovante de tentativa válida 1 para cada caso do manifesto. O relatório não comprova que uma transcrição externa seja autêntica; mantenha os prompts brutos, os arquivos candidatos, o commit do repositório e as evidências do revisor juntamente com qualquer afirmação publicada.

Nenhum resultado de modelo ou classificação é registrado até que as execuções correspondentes e as revisões visuais tenham realmente ocorrido.

## Dated evidence

A primeira execução completa com três modelos está armazenada em
[`results/2026-07-26-pi-three-models.json`](results/2026-07-26-pi-three-models.json).
Todos os 15 candidatos da tentativa 1 utilizam o commit `66414c7` do repositório e o mesmo
SHA-256 da skill empacotada. O verificador calibrado relata 10/15 resultados utilizáveis na primeira passagem, com cinco
falhas determinísticas de qualidade visual e nenhuma falha semântica ou operacional.
Esta é uma amostra de diagnóstico fixa, não um ranking de modelos nem uma afirmação de latência.

A execução pós-fixada correspondente é mantida em
[`results/2026-07-26-pi-three-models-postfix.json`](results/2026-07-26-pi-three-models-postfix.json).
Ele utiliza o commit de geração `2dce766`, preserva todos os 15 candidatos e transcrições congelados da tentativa 1
e registra a revisão no navegador apenas para os candidatos que
passam na validação determinística do showcase. O verificador atual, além disso,
exige que uma falha recuperável do ciclo de vida gere uma transição de nova tentativa real.
Sob esse mesmo verificador atual, tanto a matriz original quanto a matriz pós-correção
obtêm 8/15: a amostra única **não** demonstra uma melhoria geral.
A distribuição pós-correção é MiniMax 4/5, DeepSeek 2/5 e Qwen 2/5. Uma correção automática e limitada
da rota da arquitetura transforma a candidata à arquitetura Qwen congelada
de uma falha de micro-stub de 3,5 px em uma aprovação revisada pelo navegador, mas as
falhas restantes se concentram no fluxo de dados complexo e no roteamento do ciclo de vida. A duração do tempo de execução
é registrada apenas no contexto operacional e não constitui um critério de usabilidade.

A execução do ciclo de vida com prioridade na qualidade está armazenada em
[`results/2026-07-26-pi-three-models-quality-first.json`](results/2026-07-26-pi-three-models-quality-first.json).
Ele utiliza o commit de geração `7eef4db`, a mesma skill empacotada para todos os 15
candidatos da tentativa 1 e nenhum limite de latência. O vocabulário exatamente equivalente foi
calibrado somente após o congelamento de cada candidato; tipo de nó, direção da relação,
topologia exigida, validação determinística e revisão no navegador
continuam sendo obrigatórios. A reverificação mantém o resultado geral em 8/15
(MiniMax 3/5, Qwen 3/5, DeepSeek 2/5), portanto, ainda **não** demonstra uma
melhoria geral. O caso de ciclo de vida direcionado melhora de 0/3 para 1/3 e o
caso de arquitetura de 2/3 para 3/3, enquanto o fluxo de trabalho e o fluxo de dados regredem nesta
amostra. A latência de geração continua sendo uma questão de contexto, e não uma falha de qualidade.
