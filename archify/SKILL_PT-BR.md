---
name: archify
description: Crie diagramas refinados e validados de arquitetura, fluxos de trabalho, sequências, fluxo de dados e ciclo de vida/estados como arquivos HTML independentes e exploráveis, com SVG embutido, temas claro/escuro, animação de rastreamento opcional e exportação para PNG/JPEG/WebP/SVG/WebM. Aceite requisitos em linguagem natural ou entradas coladas de fluxogramas, diagramas de sequência e diagramas de estado no formato Mermaid; inspecione as evidências do repositório quando o diagrama precisar refletir o código real. Use quando o usuário solicitar a visualização da arquitetura do sistema, infraestrutura, topologia de nuvem/segurança/rede, fluxos de trabalho técnicos, sequências de chamadas de API, ciclos de vida de solicitações, pipelines de dados, ETL/ELT, linhagem de dados, máquinas de estados ou a conversão/aprimoramento de arquivos Mermaid.
license: MIT
metadata:
  version: "2.17"
  author: tt-a1i
  based_on: Cocoon-AI/architecture-diagram-generator (MIT, v1.0)
---

# Archify

Crie um diagrama HTML interativo e autocontido a partir de uma pequena especificação JSON tipada. A saída estática é o padrão; habilite o movimento somente quando o usuário solicitar uma demonstração ou apresentação.

## Caminho rápido de criação

Utilize este caminho limitado para a geração comum. Não leia a referência opcional ao Viewer Runtime, a menos que o usuário pergunte sobre esses recursos.


1. Escolha `architecture`, `workflow`, `sequence`, `dataflow` ou `lifecycle` de acordo com a solicitação.
2. Leia um esquema correspondente em `schemas/`, `schemas/common.schema.json` e um exemplo JSON correspondente em `examples/`. Leia somente esses arquivos. Uma nova criação deve utilizar IDs estáveis, terminologia relacionada ao domínio e um novo layout; use o exemplo para entender a estrutura dos campos, não para copiar informações. Novas fontes de workflow usam `schema_version: 2` e seu contrato de layout legível; mantenha `schema_version: 1` somente ao preservar a geometria fixa de um workflow existente. Quando a identidade real de um produto for importante, execute `node bin/archify.mjs brands "<name>" --json`; leia `references/brand-marks.md` somente para uma marca desconhecida com uma URL fornecida pelo usuário.
3. Primeiro, o artefato: a próxima ação da ferramenta deve gravar o candidato. Grave o candidato antes de inspecionar o funcionamento interno do renderizador. Não defina coordenadas exatas em texto. Comece com um caminho principal claro, ramificações laterais curtas, rótulos esparsos e, no máximo, 12 nós primários. Defina meta.quality_profile como “showcase”, a menos que o usuário solicite explicitamente um mapa padrão denso. Comece com rotas e rótulos automáticos. Não adicione via, channelX, channelY ou labelAt antes que um diagnóstico indique a necessidade; aplique, no máximo, um controle de geometria diagnosticado por correção.
4. Valide após cada edição do candidato e imediatamente antes da entrega:

   ```bash
   node bin/archify.mjs validate <type> <candidate.json> --quality showcase --json
   ```

   Um recibo com apenas 4 verificações de artefato é uma validação básica, nunca uma aprovação `showcase`. Uma aprovação `showcase` deve relatar todas as 9 verificações de artefato, com 0 erros de composição e 0 avisos. Se o candidato omitir ou escrever incorretamente o campo `meta.quality_profile`, corrija-o antes da geometria. Para um diagnóstico de geometria de workflow v2, execute `node bin/archify.mjs validate workflow <candidate.json> --layout-json` e use o recibo estável do compilador; os detalhes internos do solver não são controles de autoria. Uma validação final aprovada congela o candidato: nunca o edite depois disso.
5. Para um HTML entregue, `deliver` é o comando final de aceitação:

   ```bash
   node bin/archify.mjs deliver <type> <candidate.json> <output.html> --quality showcase --json
   ```

   Uma saída diferente de zero nunca pode ser descrita como sucesso. Uma entrega com falha preserva qualquer saída anterior; portanto, não execute `visual-check` nesse caminho: ele inspecionaria o artefato anterior válido, e não o candidato que falhou. Se a validação falhar, altere somente o `subject` diagnosticado, verifique `evidence`, escolha entre `supportedFixes` e execute novamente. Continue a correção focada enquanto a contagem objetiva de erros atingir um novo mínimo. Se duas rodadas consecutivas não melhorarem essa melhor contagem, pare e relate os diagnósticos não resolvidos com precisão.

## Atualizações

Depois que o primeiro candidato for identificado, execute o script de verificação incluído no pacote `scripts/check-update.mjs`, uma vez com o `scripts/check-update.mjs` com Node e continue o workflow solicitado. Se o comando não puder ser executado, continue sem mencionar a verificação.

- Para `silent`, continue sem mencionar a verificação de atualização.
- Para `update_available`, mostre um aviso compacto no idioma de conversação do usuário, informando a versão instalada, a versão mais recente, o resumo local corrigido pelo verificador e o link oficial para as notas de lançamento e o link oficial das notas de versão. Quando `severity` for `security`, identifique claramente como uma atualização de segurança e use um marcador de aviso discreto; isso altera apenas a ênfase, nunca a autonomia do usuário. Diga explicitamente que o Skill instalado não foi alterado e que o usuário decide se e quando atualizar. Você pode traduzir essa frase local fixa, mas nunca cite, resuma ou traduza o resumo do manifesto remoto. Depois que o aviso estiver visível, reconheça seu `eventKey` exato executando o mesmo verificador com `--ack "<eventKey>"` e continue a tarefa original do usuário.

O aviso é apenas uma informação, não permissão. Mantenha a versão instalada inalterada; este workflow v0.1 nunca baixa, instala ou executa uma atualização, e silêncio nunca significa consentimento.

Não leia `renderers/shared/geometry.mjs`, o código-fonte dos renderizadores, o código-fonte do validador, testes ou benchmarks antes do primeiro candidato. Inspecione a implementação somente para um diagnóstico interno não suportado ou depois que duas correções focadas falharem.

Nota sobre workflows: utilize o schema v2 para novos workflows; preserve schema v1 quando uma fonte existente precisar de geometria legada corrigida. Mantenha os rótulos semânticos das arestas e siga o diagnóstico do compilador. O layout canônico, o pin, a migração e o contrato de recebimento estão em [`renderers/workflow/README.md`](renderers/workflow/README.md#layout-contracts).

Nota sobre ciclo de vida: as colunas de fase `0..4` ocupam a trilha principal; a coluna de evento/terminal `N` em `0..2` se alinha exatamente abaixo da coluna principal `N + 2`. Um estado recuperável usa `type: "failure"` junto com uma transição real de volta ao estado ativo.

## Roteador de tipos

| Tipo | Usar para |
|---|---|
| `architecture` | Componentes, serviços, limites de nuvem/segurança, infraestrutura |
| `workflow` | Processos, etapas de aprovação, chamadas de ferramentas, runbooks, CI/CD |
| `sequence` | Cadeias de chamadas de API, ciclos de vida de solicitações, rastreamentos assíncronos, retornos |
| `dataflow` | Pipelines, ETL/ELT, linhagem, governança, consumidores |
| `lifecycle` | Transições de estado/status, novas tentativas, espera e estados terminais |

Em caso de ambiguidade, execute `node bin/archify.mjs guide "<scenario>" --json`. Os exemplos de validação de cenários são referências estruturais, não fatos a serem copiados.

## Entrada Mermaid

Leia o Mermaid para entender a topologia e o significado; depois crie um JSON Archify novo. Não renderize mecanicamente o estilo do Mermaid.

- `flowchart` / `graph` → `workflow`, ou `architecture` para um mapa de componentes.
- `sequenceDiagram` → `sequence`; os participantes tornam-se participantes semânticos e as setas tornam-se mensagens.
- `stateDiagram` → `lifecycle`; estados e transições mantêm seu significado, não o estilo do Mermaid.

## Invariantes de autoria

- Um caminho principal óbvio; as side branches saem do main-path node mais próximo do . Remova arestas de baixo valor antes de adicionar controles de roteamento.
- Omita `meta.visual_preset` por padrão para que todo diagrama seja aberto em `classic`, independentemente de seu modo de cor definido ser claro ou escuro. O modo de cor e o preset visual são independentes: alternar Claro/Escuro deve preservar o preset atual. Defina `signal-flow`, `blueprint` ou `editorial` somente quando o usuário solicitar explicitamente esse estilo visual.
- Omita `meta.subtitle` por padrão. Nunca crie um subtítulo que repita o título, os nós ou os cartões; inclua uma única linha curta de apoio somente quando o usuário solicitar explicitamente.
- Trate o visualizador desktop independente como um artefato de primeira tela por padrão, não como uma faixa superficial. Gere um único artefato responsivo para laptops e monitores externos — nunca HTML específico por dispositivo ou uma topologia alternativa. O visualizador deve adaptar somente a largura externa de leitura a partir da altura da janela atual; deve preservar o SVG/viewBox definido, as proporções, a geometria semântica e o fluxo normal do documento. Em um desktop largo ou alto, se um ritmo vertical definido de forma que o painel do diagrama e os cartões de conclusão necessários ocupem a tela como um conjunto equilibrado; o escalonamento em tempo de execução não pode corrigir um layout Y excessivamente comprimido ou um `meta.viewBox` explícito pequeno demais. Antes da entrega, abra o HTML real em 1440×900, 1600×1000 e 1920×1080; verifique também 2048×1320 quando a composição for destinada a uma tela desktop de grandes dimensões. Exija `document.documentElement.scrollWidth <= window.innerWidth` e `scrollHeight <= window.innerHeight` em todos os tamanhos verificados, ao mesmo tempo em que se verifica visualmente se o diagrama permanece confortavelmente legível e verticalmente equilibrado no maior viewport verificada. Corrija o overflow removendo somente conteúdo realmente redundante ou compactando o espaçamento antes de reduzir nodes, rótulos ou o painel principal. Se o maior viewport ainda apresentar uma faixa inferior vazia e visível no limite de largura do visualizador, redistribua as posições Y criadas e aumente a altura do viewBox proporcionalmente; não adicione texto de preenchimento nem cartões decorativos. Nunca simule uma aprovação com `overflow: hidden`, conteúdo cortado, um scroller interno do diagrama, altura de SVG esticada ou tipografia menor. Layouts estreitos/móveis podem rolar verticalmente quando o containment exigir.
- Omita `meta.legend` para o padrão verdadeiro `auto`. Quando necessário, use somente `mode: auto|all|hidden` e `renderer-supported entries.<kind>.label|visible`; os rótulos nunca alteram a semântica.
- Escolha um idioma principal de autoria a partir de uma escolha explícita do usuário; caso contrário, siga a solicitação ou o idioma predominante da conversa. `meta.locale` controla somente a interface do Viewer pertencente ao renderizador: use `"en"` ou `"zh-CN"` para o idioma principal correspondente suportado. Para qualquer outro idioma, omita `meta.locale` e informe explicitamente que a interface fixa do Viewer e `<html lang>` usam inglês como fallback. O renderizador nunca traduz o conteúdo criado. Consulte `references/authoring-contract.md` para obter detalhes.
- Mantenha os nomes exatos dos produtos, identificadores de código, comandos, protocolos, caminhos de API e nomes de ambientes. Eles podem permanecer em inglês dentro do texto localizado, mas nunca justificam deixar o texto explicativo ao redor em outro idioma.
- A identidade da marca é opcional e explícita. Coloque um ID canônico integrado em `brand` quando o nó nomear esse produto real. Se nenhum preset corresponder e o usuário tiver fornecido a URL HTTP(S) oficial, primeiro execute `node bin/archify.mjs brands capture "<url>" --json`, depois crie o objeto `brand` com o digest retornado e fixado. Renderização e validação nunca executam uma captura sem fixação. Caso contrário, omita `brand`. Nunca deduza uma marca a partir de uma função vaga como "database" e nunca permita que um emblema substitua o `type`, o rótulo ou os fatos de relacionamento semânticos.
- Para diagramas de sequência, omita `meta.column_fit` para o layout estável `fixed`. Defina como `"spread"` quando um viewBox amplo deixar espaço horizontal sem uso ou quando rótulos significativos dos participantes não couberem nas caixas fixas; não encurte rótulos semânticos antes de tentar a opção `spread`.
- Os tipos de componentes são `frontend`, `backend`, `database`, `cloud`, `security`, `messagebus` e `external`; as variantes são `default`, `emphasis`, `security` e `dashed`.
- Os rótulos de relacionamento são dados semânticos. Quando um deles colidir, mova o rótulo, ajuste a rota ou o espaçamento e depois encurte o texto, preservando o significado. Omita somente um texto que já esteja totalmente implícito em ambos os pontos finais e que não contenha protocolo, ação, direção, comportamento síncrono/assíncrono ou mecanismo entre fronteiras. Preserve todo rótulo significativo; excluí-lo não é uma correção de geometria. Se um relacionamento começar sem rótulo porque seus pontos de extremidade o tornam totalmente implícito, explique por que o texto é redundante; essa é uma escolha semântica do autor, não uma correção de geometria.
- Omita `meta.engineering_profile` por padrão. A terminologia de região, cluster e limite de segurança não o habilita por si só. Habilite `deployment-ownership` somente quando o usuário solicitar explicitamente uma topologia de implantação em produção, uma transferência de responsabilidade ou uma revisão de implantação fail-closed, e quando os fatos de origem forem conhecidos. Uma vez habilitado, não remova o perfil de engenharia apenas para passar na validação; corrija os fatos ou relate os diagnósticos com precisão.
- Espaçamento significa espaço livre, não distância entre centros. Para um rótulo de relacionamento, o espaço livre deve ser maior do que a largura medida da máscara; siga a ordem de correção que preserva o rótulo.
- AAs rotas automáticas possuem seus próprios lados de extremidade. Um lado é um contrato de direção: o primeiro e o último segmento devem sair/entrar perpendicularmente a esse lado.
- O Automatic Port Spread é um comportamento padrão do renderizador para arquitetura, workflow, fluxo de dados e ciclo de vida. Ele ignora relacionamentos únicos e `via`, `channelX`, `channelY`, `labelAt` explícitos ou rotas diferentes de `auto`. Portas próximas e paralelas usam uma ponte externa para que o roteamento automático não crie um segmento menor que 8px ou uma curva interna menor que 16px. A arquitetura mantém separadamente as portas automáticas desobstruídas e voltadas uma para a outra (`left`/`right` ou `top`/`bottom`) em um único eixo compartilhado quando seu deslocamento for inferior a 16px e ambas mantiverem espaço livre nos cantos. Se exatamente um ponto de extremidade tiver sido distribuído, somente o ponto não compartilhado poderá se mover para esse eixo; se ambos tiverem sido distribuídos, mantenha a ponte externa para que as portas concorrentes permaneçam distintas.
- Nunca aceite uma aresta que atravesse um nó opaco não relacionado, um corredor compartilhado ambíguo ou um rótulo de relacionamento que oculte outra rota.

Leia `references/authoring-contract.md` somente quando precisar de enumerações de campos, cálculos de espaçamento, regras de correção de geometria, evidências do repositório ou posicionamento específico por modo.

## Entrega

Use `validate` durante a correção e `deliver` uma única vez para a aceitação final. A entrega congela os bytes exatos da especificação em um snapshot privado no mesmo diretório, renderiza e verifica esse snapshot, confirma o HTML de forma atômica e gera um relatório com o SHA-256 e a contagem de bytes tanto para a especificação quanto para o artefato. Isso é uma evidência determinística do artefato; não executa o Viewer em um navegador.

Depois da entrega, colete evidências desktop limitadas sem modificar ou renderizar novamente o HTML confiável:

```bash
node bin/archify.mjs visual-check <output.html> --json
```

`visual-check` coleta evidências automatizadas do navegador a partir do HTML exato entregue, sem modificá-lo ou renderizá-lo novamente. Suas medições legíveis por máquina e capturas de tela não levam em conta o refinamento perceptivo. Siga `references/delivery-contract.md` para conhecer os campos canônicos do recibo, cobertura, arquivos auxiliares, comportamento de saída e requisitos de registro manual suplementar.

Mantenha as três afirmações separadas: `deliver` comprova verificações determinísticas do artefato, `visual-check` comprova comportamento limitado em um navegador real e a revisão visual perceptual exige um revisor humano ou capaz de analisar imagens. Relate as evidências do navegador e a revisão perceptual separadamente. Uma análise visual não restrita pode apoiar somente a revisão perceptual; use o contrato canônico de entrega ao registrar trabalho manual suplementar no navegador ou lidar com uma falha ambiental.

Adicione `--open` somente quando o usuário quiser uma prévia local imediata. Para um ciclo ativo de autoria no desktop, o comando opcional é:

```bash
node bin/archify.mjs preview <type> <input>.json <output>.html --quality showcase
```

Nunca inicie a prévia por padrão. Leia o arquivo `references/delivery-contract.md` ao usar preview, evidências do repositório, recibos de exportação, revisão visual ou abertura após commit.

## Recursos opcionais do Viewer

O HTML gerado já contém alternância de tema, pan/zoom, pesquisa, foco, rastreamento de relacionamentos, visualizações semânticas, apresentação e exportações verdadeiras. Esses são recursos do leitor, não trabalho adicional de criação. `meta.animation: "trace"` é opcional; `meta.views` é opcional e deve conter no máximo cinco capítulos selecionados.

Leia `references/viewer-runtime.md` somente quando o usuário solicitar explicitamente Share Cards, cartões Route/Reach, o recurso de movimento, histórias guiadas, deep links, apresentação, pesquisa/foco ou outro recurso do Viewer Runtime.

## Configuração e fallback

Nenhuma instalação é necessária dentro do pacote do skill. Verifique com:

```bash
node bin/archify.mjs doctor
node bin/archify.mjs demo <output-directory>
```

Quando o acesso ao shell não estiver disponível, insira manualmente o SVG de arquitetura em `assets/template.html`, use classes semânticas de CSS em vez de cores inline e siga o contrato de revisão visual descrito no arquivo `references/delivery-contract.md`.

## Saída

Retorne o caminho do HTML verificado, o tipo de diagrama, o resumo da validação, o recibo da especificação/artefato, o status das evidências do navegador e o status verdadeiro da revisão visual. Não declare sucesso para um comando com saída diferente de zero nem afirme que realizou uma inspeção visual que não foi feita.
