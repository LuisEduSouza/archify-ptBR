# Enquanto está em execução

## O meio que importa

Um nome pode conter uma pequena filosofia, se você permitir. O tempo de execução não é o plano nem a memória. É o intervalo em que algo está realmente acontecendo: uma chaleira chegando ao ponto de ferver, uma criança amarrando o cadarço, uma conversa que ainda não encontrou seu fim.

Muitas vezes reservamos nossa atenção para o início e o fim. Anunciamos o que faremos. Mais tarde, decidimos se valeu a pena. As horas entre esses dois pontos são onde se passa a maior parte da vida, e elas exigem um tipo de cuidado mais silencioso.

## Simples o suficiente para ser vivido

Alguns textos se mantêm próximos da linguagem cotidiana. Não revestem um sentimento com palavras mais complexas do que o necessário. Um dia pode ser vivido da mesma maneira. Você não precisa transformar cada hora em uma lição. Você pode perceber o ônibus chegando na hora certa, a luz do vizinho ainda acesa, a maneira como a chuva suaviza a rua e faz as pessoas andarem um pouco mais próximas umas das outras.

Em 4 de novembro de 2026, com a luz já enfraquecendo rumo ao inverno, essa proximidade parece suficiente. Nada dramático precisa acontecer para que o dia seja real. A realidade é a parte que está acontecendo agora.

## O que fica conosco

- Uma porta segurada sem que ninguém peça
- Uma refeição compartilhada antes que esfrie
- Um silêncio que não precisa ser preenchido

São pequenas coisas, e não se anunciam. Ainda assim, é assim que a gentileza mantém seu ritmo.

*O significado não é guardado para mais tarde; é o que o presente já está fazendo.*
Gerado em 04/11/2026
um projeto @steipete



# Marcas

Utilize uma marca somente quando a identidade de um produto, fornecedor, família de modelos, canal ou
serviço real auxilie o leitor. O `type` semântico ainda explica o que o nó
faz; `brand` explica de quem é o produto.

## Fluxo de decisão do agente

1. Pesquise no catálogo integrado quando a solicitação mencionar uma marca reconhecível:

   ```bash
   node bin/archify.mjs brands “Claude” --json
   ```

2. Insira o ID canônico retornado no nó, participante ou estado:

   ```json
   {
     “id”: “planner”,
     “type”: “backend”,
     “label”: “Claude”,
     “brand”: “claude”
   }
   ```

3. Se não houver correspondência no catálogo e o usuário tiver fornecido o site oficial,
   capture seu ícone explicitamente:

   ```bash
   node bin/archify.mjs brands capture “https://partner.example.com” --json
   ```

   Insira o valor `brand` do comando, fixado pelo digest, no nó criado:

   ```json
   {
     “id”: “partner”,
     “type”: “external”,
     “label”: “Portal de parceiros”,
     “brand”: {
       “url”: “https://partner.example.com”,
       “sha256”: “0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef”
     }
   }
   ```

4. Se não houver correspondência e nenhuma URL fornecida pelo usuário, omita `brand`. Não invente uma
   URL nem atribua silenciosamente uma empresa visualmente semelhante.

URLs de marcas conhecidas são resolvidas para o vetor incluído no pacote, em vez de usar a rede.
Para atributos `href` de ícones descobertos, o Capture decodifica as referências nomeadas básicas
`amp`, `quot`, `apos`, `lt`, `gt` (e seus aliases em maiúsculas definidos), além de
referências numéricas decimais e hexadecimais, uma vez antes da resolução da URL. Assim,
`/icon.png?v=1&amp;size=32` solicita `/icon.png?v=1&size=32`. Os escapes percentuais da URL
permanecem intactos; escapes aninhados não são decodificados recursivamente. Esse decodificador limitado
não adiciona um analisador HTML geral nem oferece suporte a todas as entidades HTML nomeadas.
A leitura do HTML é interrompida em um final explícito do cabeçalho fora de comentários, elementos de texto bruto
e atributos entre aspas, inclusive quando esses tokens se estendem por blocos de rede. O
limite de 256 KiB para o cabeçalho e o prazo de captura ainda se aplicam; um corpo maior após o
cabeçalho não é lido para a descoberta de ícones.
Os candidatos a ícones provêm de tags `link` completas fora de comentários, texto bruto e
conteúdos de modelos. Valores de atributos e nomes semelhantes, como `data-href`,
não podem fornecer declarações de ícones; caracteres `>` entre aspas permanecem dentro de suas tags.
Para `text/html`, a descoberta trata o conteúdo de `noscript` como texto bruto, correspondendo à
análise de HTML com scripts habilitados; a captura não executa scripts. Essa exclusão
não se aplica a `application/xhtml+xml`, onde os links `noscript` permanecem
detectáveis. Elementos vazios do XHTML, como `<script />` e `<template />`, não
ocultam os links seguintes; a mesma barra final não fecha esses elementos em
`text/html`.
A captura de URLs desconhecidos aceita apenas formatos de imagem rasterizada restritos, bloqueia
credenciais, portas públicas não padronizadas e destinos privados ou locais de link,
utiliza concorrência restrita e um prazo total, e retorna o resumo do conteúdo
capturado. Operações posteriores de renderização e validação exigem esse resumo exato;
conteúdo bloqueado, indisponível, alterado, com tamanho excessivo ou inseguro resulta em falha com fechamento, em vez de
alterar silenciosamente o artefato.

A proveniência de marca remota em recibos de captura, metadados de nó e SVG/HTML mantém
o esquema HTTP(S), o host, a porta e o caminho da URL de origem, mas omite informações do usuário, strings de consulta
e fragmentos. O `brand.url` criado e todas as URLs de download/redirecionamento
permanecem inalteradas, de modo que os pins existentes ainda reproduzem os mesmos bytes e resumo.
URLs de download que contêm credenciais continuam sendo rejeitadas. Marcas integradas mantêm sua
proveniência de catálogo registrada.

O link de origem pública identifica o site/caminho original, não necessariamente um
recurso para download: remover uma consulta assinada ou um seletor de página baseado em consulta pode
tornar esse link inutilizável ou menos específico. É preferível capturar uma
página de destino pública estável que exiba o ícone pretendido, quando houver um disponível; não edite
a URL de um pin existente sem capturar e verificar essa fonte novamente. Os caminhos
são mantidos, portanto, essa normalização não é um limpador geral de segredos de URL.

Após a atualização a partir de uma versão que capturava marcação HTML inativa (incluindo
`noscript`), um pin de URL existente pode falhar com `brand/digest-mismatch` porque
a descoberta agora seleciona um ícone diferente. Verifique o ícone pretendido, execute novamente o
comando de captura acima para a mesma URL e substitua explicitamente o valor
`brand` definido pelo pin retornado. Os pins existentes não são reescritos
automaticamente, e a verificação do digest continua sendo exigida.

Para capturas ICO, cada entrada de diretório deve fazer referência a um intervalo de imagens não vazio
após o diretório completo e dentro do arquivo baixado. Essa verificação de limites
também se aplica ao reproduzir uma captura fixada. Cargas úteis PNG/DIB, múltiplas
imagens, intervalos compartilhados ou fora de ordem e bytes finais continuam sendo suportados;
a verificação não decodifica pixels nem garante que uma carga útil que, de outra forma, estaria dentro dos limites,
seja decodificável. Um candidato a ICO rejeitado não impede que se tente ícones posteriores.

Solicitações de página, ícone e redirecionamento enviam `Accept-Encoding: identity`. A captura
não descompacta os corpos das respostas: uma resposta bem-sucedida que declare outra codificação de conteúdo
é fechada e rejeitada explicitamente. Isso mantém os limites de bytes existentes
e o resumo fixado vinculados à representação não codificada. Um ícone utilizável posteriormente pode
ainda ser bem-sucedido; caso contrário, um erro de codificação é mantido em vez de ser ocultado
por um 404 de favicon não relacionado.

O artefato final nunca busca um recurso da marca quando aberto. Vetores predefinidos e
ícones de sites capturados e verificados por digest permanecem incorporados nas exportações em SVG, PNG, WebP, JPEG,
Share Card e WebM.

Use `node bin/archify.mjs brands --json` para inspecionar todos os IDs canônicos, aliases,
categorias, domínios e proveniência. As categorias atuais abrangem IA, nuvem,
engenharia, dados, colaboração, sistemas de negócios, canais, idiomas e
frameworks.



# Contrato de entrega

## Falha na finalização e reparo provisório

O `finalize` é interrompido no primeiro portão em que não é aprovado. Use a saída padrão compacta ou `evidence.summaryReceipt`; leia o sidecar completo somente quando o resumo não contiver as evidências necessárias para um reparo coerente. Um recibo com quatro verificações de artefatos é uma validação básica, não uma aceitação definitiva: exija todas as nove verificações, zero erros de composição e zero avisos. Corrija erros de `meta.quality_profile` e de esquema antes da geometria. Um ERD denso de esquema completo pode manter o nível `standard` em sua primeira passagem de campos completos: exija zero erros estruturais, nenhuma falha de aresta passando por nó, linhas de campo completas e uma grade agrupada legível, e registre avisos de composição em vez de gastar tempo ilimitado com eles.

Em caso de falha na validação, edite o JSON existente na vizinhança conectada indicada pelos diagnósticos antes de executar novamente um comando. Preserve a semântica solicitada, rótulos significativos, evidências de origem e topologia corrigida ou acordada. Várias rotas que compartilham nós exigem um reparo de posicionamento; leia [Reparo de layout de arquitetura](architecture-layout-repair.md) para esse caso. Reorganize um caminho principal bloqueado em vez de ajustar rótulos não relacionados. Mantenha a geometria não relacionada quando sua composição já estiver clara. Use `--layout-json` antes da edição apenas quando as evidências compactas não tiverem as medidas necessárias. O Workflow v2 usa seu recibo de compilador estável, e não os detalhes internos do solucionador, como evidência de criação.

Mantenha o melhor candidato que passou nas verificações de rota antes de uma correção da janela de visualização. Se essa correção introduzir novas colisões de rota, restaure o layout medido e resolva as restrições remanescentes de tela ou texto.

Após a edição, execute novamente o comando `finalize` completo com `--quality showcase` e, para trabalhos baseados em repositório, `--repo-root <repo-root>`. Se o caminho de saída já tiver evidências do navegador de outro candidato, use um novo `--out-dir <output-stem>.review-<revision>` tanto para o novo `finalize` quanto para qualquer `visual-check`. Omita um `--candidate-sha256` anterior após a edição, pois ele vincula o candidato anterior. Compare os diagnósticos por código, assunto, estágio e evidência, nunca apenas pela contagem de erros em declínio. Acompanhe o limite de reparos por problema persistente, utilizando esse código, assunto, estágio e evidência: um problema recém-detectado inicia sua própria sequência de reparos. Se um problema sobreviver a dois reparos direcionados, inspecione a geometria medida ou o contrato relevante; após uma nova tentativa baseada em evidências, relate a lacuna concreta.

Utilize o `validate` autônomo apenas para diagnósticos direcionados, passando `--repo-root` para trabalhos apoiados por repositório. Seu recebimento bem-sucedido marca `candidateFrozen: true`; execute `nextAction.arguments`, substituindo apenas `<output.html>`, sem editar, revalidar ou reler o candidato. Repita posteriormente as tentativas em caso de falhas ambientais ou de evidências em relação a esses bytes congelados. Um motivo justificado para editar cria um novo candidato e exige a execução completa de `finalize` sem o hash antigo.

## Validar e entregar

Os pontos de entrada `render` e do renderizador direto imprimem falhas de criação classificadas
no stderr como diagnósticos legíveis e saem com código de saída 1. Falhas na leitura de entrada ou na análise de JSON
devem usar `input/read` ou `input/json-parse`; falhas no sistema de arquivos de saída devem usar
`output/write` e identificar o caminho de saída. Falhas de esquema e layout mantêm
seus códigos de regra existentes. Use a interface anunciada `validate --json` ou
`deliver --json` para obter um recibo de máquina; `render` não possui o sinalizador `--json`.
Falhas inesperadas de implementação mantêm informações de depuração no modo legível
e permanecem como `internal/unclassified` nos recibos de máquina.

Cada saída entregue possui dois caminhos de metadados específicos do artefato. Quando um
tronco de saída é muito longo para esses nomes de arquivo derivados, o Archify o encurta e acrescenta um
hash estável:

- `<output-stem>.delivery.json` registra a última tentativa concluída.
- `<output-stem>.delivery-pending.json` é o diário de recuperação para uma tentativa
  em andamento.

Para um stem de artefato literal que já corresponda ao marcador de nome delimitado reservado do Archify,
um sidecar de proveniência bruta pré-namespace permanece como um recurso de fallback de leitura quando o
sidecar codificado estiver ausente. Um diário pendente bruto pré-namespace é uma barreira independente
do tipo “fail-closed”: ele bloqueia verificações e reenvio mesmo quando um diário pendente
codificado também existe, e nenhum dos diários é substituído silenciosamente.

Um arquivo `.archify-delivery-lock.json` para todo o diretório serializa todas as entregas que
se resolvem no mesmo diretório de saída físico. Isso impede deliberadamente que
diferenças de maiúsculas e minúsculas, normalização Unicode, nomes curtos do Windows e aliases de links simbólicos
criem proprietários independentes para um único local no sistema de arquivos. A desvantagem é que
as entregas para nomes de artefatos diferentes em um mesmo diretório também são executadas em série;
a proveniência e os diários pendentes permanecem específicos do artefato.

Para garantir a segurança da migração, o Archify também detecta e preserva um arquivo legado
`<output-stem>.delivery-lock.json` ao lado do artefato solicitado. Uma entrada
legada existente funciona como uma barreira de recuperação do tipo “fail-closed”. Enquanto uma nova entrega detém o
mutex do diretório, ela também mantém barreiras temporárias no formato legado para a grafia
solicitada e para a grafia do destino físico de um artefato existente. Ele adquire o
bloqueio do diretório primeiro, depois todas as barreiras de compatibilidade necessárias antes de gravar um
diário ou artefato, e remove o bloqueio do diretório antes dessas barreiras durante a
liberação. Isso impede que um binário mais antigo do Archify, usando
qualquer grafia conhecida, entre na entrega. Uma barreira legada cujo nome de arquivo bruto
da era HEAD exceda o limite de componentes do host é omitida porque o antigo
binário também não poderia criar esse bloqueio ou entregar esse artefato no host.

O `deliver` adquire o bloqueio por meio de um `open(..., “wx”)` exclusivo antes de criar ou
substituir o diário de recuperação. Uma criação exclusiva bem-sucedida gera uma
capacidade interna de propriedade opaca vinculada a essa tentativa. A criação do diário,
o registro de proveniência com falha, o commit em par, o rollback, a finalização do diário e
a liberação do bloqueio verificam, cada um, a capacidade atual dentro da operação que
alteraria o estado compartilhado. Um concorrente rejeitado não cria um diário nem
grava a proveniência com falha.

Um diretório existente ou um bloqueio legado é tratado sem recuperação automática:

| Estado observado do bloqueio | Resultado `deliver` necessário |
| --- | --- |
| Nenhuma entrada no diretório | Tentar a criação exclusiva; somente o sucesso concede a propriedade. |
| Bloqueio válido do esquema v1 cujo PID está em execução ou cuja interrupção não pode ser comprovada | Sair com código de saída 1 com `delivery/concurrent-attempt`; preservar todos os caminhos compartilhados. |
| Bloqueio válido do esquema v1 cujo PID se sabe que foi encerrado | Saída 1 com `delivery/lock-stale`; preservar exatamente o bloqueio, o artefato, o diário e a proveniência atual. |
| Entrada de bloqueio ilegível, malformada, link simbólico, link simbólico pendente, diretório ou outra entrada de bloqueio não regular | Saída 1 com `delivery/lock-invalid`; preservar a entrada e todos os outros caminhos compartilhados. |
| Uma capacidade adquirida não corresponde mais ao bloqueio ou diário atual | Saída 1 com `delivery/ownership-lost`; interrompa todas as alterações no caminho compartilhado. |
| O proprietário correspondente não pode remover seu bloqueio | Saída 1 com `delivery/lock-release`; preserve o bloqueio. |

Um diagnóstico `delivery/lock-stale` identifica os caminhos absolutos de saída e de bloqueio,
além do PID original e do ID do recibo. A recuperação é deliberadamente explícita
e serial: interrompa todas as tentativas de entrega para aquele diretório de saída físico,
confirme que nenhuma entrega ativa o possui e que a entrada obsoleta relatada
não foi substituída, remova apenas o bloqueio relatado e, em seguida, execute novamente `deliver`. Não
remova um artefato, proveniência atual ou diário pendente como parte da
recuperação de bloqueio obsoleto.

O protocolo de bloqueio é destinado ao Node.js 18 ou versões posteriores em um sistema de arquivos local com
processos Archify cooperativos. As comparações de PID, recibo e identidade de arquivo são
verificações defensivas, não uma operação atômica de “compare-and-swap”. As barreiras de compatibilidade abrangem
a grafia solicitada e uma grafia de destino físico existente; elas não podem
enumerar nomes arbitrários de links físicos ou aliases do sistema de arquivos anteriormente desconhecidos,
portanto, a entrega de versões mistas por meio desses aliases permanece fora do escopo. Este
contrato não garante a correção do bloqueio distribuído em NFS, SMB ou outros
sistemas de arquivos de rede, e não pode impedir que um processo externo que ignore
o protocolo substitua caminhos compartilhados.

Cada publicador HTML “no-clobber” (`render`, `deliver`, `compare` e `preview`)
captura a entrada de diretório solicitada, o slot de gravação canônico, o pai físico,
e o tipo de destino existente, a identidade do dispositivo/inode e o modo antes do preparo, e então
revalida esse instantâneo imediatamente antes da substituição. Um destino de gravação
existente deve ser um arquivo regular com exatamente um nome de link físico. Um destino com
vários nomes de links físicos falha com o código de erro `output/target-hardlinked`: a substituição
do nome solicitado não pode atualizar nomes de irmãos desconhecidos em uma única publicação.
Links físicos continuam sendo suportados para verificação de identidade de leitura e colisão de entrada/alias;
eles não são suportados apenas como destinos de gravação. Um link simbólico para um arquivo regular
com um único link continua sendo suportado: a publicação preserva a entrada do link simbólico e
aplica o mesmo protocolo ao seu destino resolvido. Casos envolvendo diretório, FIFO, soquete,
dispositivo, mudança de modo, novo requerente e identidade indeterminada falham
antes da substituição.

A publicação é uma substituição não-clobber e recuperável, e não uma substituição atômica que causa falha de um
destino existente. Para evitar sobrescrever um requerente que apareça após a última
verificação de identidade, o Archify primeiro retém o arquivo antigo vinculado em um backup privado de recuperação,
remove o nome público por meio de quarentena vinculada à identidade e, em seguida,
cria o novo nome público com um link físico exclusivo. Uma falha detectada é revertida
quando o slot público e a vinculação de recuperação ainda permitirem. Uma interrupção de processo
entre essas operações de namespace pode, em vez disso, deixar o caminho público
ausente, enquanto os bytes anteriores verificados permanecem em um backup de recuperação privado
adjacente. A publicação de artefato único registra a identidade original do slot/alias
e o inode do backup, o modo, o SHA-256 e a contagem de bytes no arquivo privado
`.archify-remove-*/publication-recovery-v1.json`, ao lado de `previous`. Para tornar uma
publicação interrompida específica visível novamente, interrompa os gravadores simultâneos e execute:

```bash
node bin/recover-output.mjs /caminho/absoluto/para/.archify-remove-<id> --json
```

Trata-se de uma recuperação explícita, não de um verificador de diretórios. Antes de criar o link, o auxiliar
verifica se há um pai ou alias alterado, um registro ou backup alterado/com link físico,
incompatibilidade de digest ou inode e qualquer destino público existente. Ele restaura apenas por meio de
link físico “no-clobber”, de modo que um novo reivindicante é preservado em vez de sobrescrito;
ele nunca remove recursivamente entradas desconhecidas. Uma recuperação concluída é
idempotente. O registro é uma evidência a ser verificada de forma independente, não uma
autoridade para restaurar bytes privados arbitrários: o auxiliar o aceita apenas do
filho gerado e registrado do pai do destino físico original, com a
mesma identidade de diretório. Indique o diretório exato relatado pelo processo interrompido
e inspecione manualmente um registro incerto. Um processo não cooperativo ainda pode
trocar nomes de caminho após essas verificações e antes do `linkSync` do Node.js; o Node
não expõe uma operação de link vinculada a descritores. A verificação de identidade pós-link
então falha com o estado “fechado” e retém a evidência de recuperação, em vez de reivindicar a recuperação
ou excluir um nome incerto. Se a própria recuperação for interrompida após a
ligação, os bytes públicos antigos e o backup privado podem permanecer; uma execução posterior de recuperação
preserva o destino público e requer resolução explícita do operador. O
registro é submetido a fsync antes que o nome público antigo seja retirado em plataformas que suportam
sincronização de diretórios, e a garantia testada é a recuperação após um processo encerrado;
isso não é uma garantia de durabilidade em caso de perda de energia, controlador de armazenamento, NFS ou SMB.
Fluxos emparelhados mantêm seu backup na fase de preparação de transações privadas. Para `deliver`,
o diário pendente e o bloqueio mantêm os verificadores estritos em modo “fail-closed”. A API portátil
do sistema de arquivos do Node.js não possui um mecanismo de
“compare-and-swap” de nome de caminho que tanto substitua um nome existente de forma atômica quanto se recuse a
sobrescrever um requerente posterior: `rename` fecharia a lacuna de visibilidade apenas
sobrescrevendo esse requerente.

Após o estabelecimento da propriedade, `deliver` cria o diário antes da renderização
e o mantém durante o commit recuperável do par HTML/sidecar. Ele remove o
diário somente após a conclusão desse commit. Uma falha na validação, na renderização ou no commit do par,
ou uma interrupção do processo, pode, portanto, deixar um diário. O diário
é uma barreira de segurança: `check`, `browser-check` e `visual-check` falham com status “fechado” quando qualquer entrada de diretório
existe no caminho do diário ou do bloqueio, incluindo um arquivo ilegível,
um link simbólico ou um link simbólico pendente. Execute entregas direcionadas ao mesmo diretório de saída físico
em série; uma tentativa deve ser concluída ou recuperada antes que outra
comece.

Um sidecar bem-sucedido possui `schemaVersion: 1`, `status: “current”`,
`command: “deliver”`, um `receiptId` exclusivo, o `type` do diagrama, um caminho absoluto
de `input`, um caminho absoluto de `output` correspondente ao artefato inspecionado
e as contagens de bytes e SHA-256 da especificação/artefato. Os verificadores tratam um
campo ausente, malformado, não suportado ou inconsistente como inválido. Eles também
rejeitam um link simbólico sidecar, incluindo um link pendente. Um verificador vincula a proveniência
aos bytes do artefato que ele realmente verifica e verifica esse vínculo novamente antes de
relatar sucesso; uma alteração simultânea de bytes resulta em falha. A própria entrada do diretório de proveniência
deve ser um arquivo regular com um único link: a verificação `deliver` e a verificação estrita falham
com o código de erro `delivery/provenance-hardlink-unsupported` quando há outro link físico,
sem procurar ou adivinhar o nome do arquivo irmão.

Se um proprietário atualmente verificado falhar após a existência de um HTML mais antigo, o Archify grava
um novo sidecar com `status: “failed”` e mantém o registro no diário até que a recuperação esteja
concluída. Um HTML antigo ilegível não impede esse marcador; seu hash do artefato
e a contagem de bytes podem estar ausentes. Se o sidecar estiver bloqueado ou de alguma forma não gravável,
o Archify mantém o sidecar anterior em vez de excluir as evidências, e o diário
impede que os verificadores confiem nele. Uma tentativa de bloqueio rejeitada por ser simultânea, obsoleta ou inválida
não grava a proveniência com falha. Se a propriedade for perdida, o Archify
relata `delivery/ownership-lost`, não sobrescreve nem remove o artefato, a proveniência,
o diário ou o bloqueio do sucessor, e não reivindica a proveniência com falha
registrada; um recibo de falha pode relatar `provenance: “unrecorded”`. Se todos os
caminhos de metadados estiverem indisponíveis, o mesmo status “não registrado” se aplica; nenhuma ferramenta pode
preservar esse fato entre processos. Restaure o acesso aos caminhos de metadados e conclua
um `deliver` bem-sucedido antes de confiar na saída.

Artefatos sem sidecar, diário ou bloqueio continuam sendo suportados por motivos de
compatibilidade com versões anteriores e para o comando `render` de nível inferior. Seus recibos de verificação
relatam `provenance: “unknown”`; use `--require-provenance` para transformar esse estado
em uma falha diferente de zero quando o fluxo de trabalho exigir um artefato entregue com sucesso
:

```bash
node bin/archify.mjs check <output.html> --require-provenance
node bin/archify.mjs browser-check <output.html> --json --require-provenance
```

## Contratos de caminho de saída

O Archify separa intencionalmente os caminhos de autoria duradouros dos caminhos da linha de comando:

- O campo `meta.output`, de preenchimento obrigatório, deve ser um caminho portátil relativo ao POSIX, como, por exemplo,
  `reports/diagram.html`. Ele utiliza `/`, termina com um nome base `.html` não vazio,
  e não pode conter um prefixo absoluto ou relativo à unidade de disco, URI, barra invertida,
  segmento vazio ou com ponto, caractere de controle, surrogado UTF-16 sem par, separador de
  ou caractere inválido de nome de arquivo, ponto
  ou espaço final, nome de dispositivo DOS, nem um componente que exceda o limite de 255 bytes do UTF-8 ou
  de 255 unidades de código do UTF-16. Ele é resolvido a partir do diretório de trabalho atual
  e deve permanecer fisicamente dentro desse diretório, com um destino `.html`,
  após o seguimento de links simbólicos. O perfil de saída/arquivamento durável também
  rejeita de forma conservadora nomes curtos no formato 8.3 do Windows, como `PROGRA~1`;
  caminhos POSIX descritivos de repositório/Git utilizam um perfil separado e estão isentos.
- Argumentos de saída explícitos da CLI utilizam a sintaxe nativa do host ativo. Eles podem
  ser relativos ou absolutos, utilizar separadores nativos e serem resolvidos fora do
  diretório de trabalho atual. No Windows, são suportados caminhos absolutos de unidade comuns, UNC e
  relativos (incluindo a navegação comum com `.` e `..`).
  Uma grafia 8.3 resolvida pelo sistema de um arquivo ou diretório existente é aceita
  quando o Archify pode comprovar sua identidade física; esse suporte nativo a aliases
  não flexibiliza a rejeição de nomes no formato 8.3 pelo perfil de saída/arquivamento durável.
  Caminhos de comprimento estendido são limitados às formas brutas apenas com barra invertida `\\?\C:\...` e
  `\\?\UNC\server\share\...`, sem segmentos de ponto; namespaces de dispositivos,
  raízes malformadas, caminhos relativos à unidade, como `C:file.html`, raízes da unidade atual
  como `\file.html`, fluxos de dados alternativos, nomes de dispositivos reservados,
  caracteres inválidos ou finais em nomes de arquivos e componentes excessivamente longos resultam
  em falha. Os caminhos da CLI POSIX mantêm as regras de nomes de arquivos POSIX, em vez de herdar
  as restrições ortográficas do Windows. Cada host rejeita NUL, substitutos não emparelhados
  e componentes que excedam seu limite suportado.

Esses contratos não são intercambiáveis: uma saída explícita da CLI não oculta
um `meta.output` durável inválido (incluindo um valor ausente), e `validate`
verifica a saída criada mesmo quando ela não é publicada nesse caminho. Uma
migração de fluxo de trabalho da v1 para a v2 pode receber explicitamente uma substituição portátil e durável
por meio de `migrate workflow old.json new.json --to-schema 2 --output
reports/diagram.html`; esse valor é gravado apenas em seu destino v2 separado e verificado
. Essa exceção candidata à migração não repara a fonte nem
ignora qualquer erro de esquema ou de compilador não relacionado à saída. Para todos os outros reparos, adicione um
caminho `.html` portátil relativo ao POSIX a `meta.output`; nenhuma alteração na versão do esquema
é necessária de outra forma.

Execute `finalize` diretamente em um primeiro candidato completo e após cada edição de reparo. Sua validação incorporada verifica o candidato antes da entrega; use o comando independente `validate` apenas para diagnóstico específico. Após uma edição, omita qualquer `--candidate-sha256` anterior, que vincula o candidato anterior. Os caminhos de saída HTML da CLI devem terminar em
`.html`, inclusive após a resolução de links simbólicos. Os caminhos de comparação de recibos devem
terminar em `.json`. Uma incompatibilidade de tipo falha antes da gravação com
`output/cli-extension` ou `output/cli-resolved-extension`. Essas verificações evitam
sobrescritas acidentais de tipo de arquivo; elas não isolam diretórios explícitos da CLI
nem impedem a substituição de um artefato existente do tipo esperado.

Use a entrega final verificada somente após o candidato estar congelado:

```bash
node bin/archify.mjs deliver <type> <candidate.json> <output.html> --quality showcase --json
```

O `deliver` lê a especificação uma vez, grava exatamente esses bytes em um snapshot privado do candidato no mesmo diretório, renderiza esse snapshot, executa o verificador completo de artefatos e só substitui o destino depois que todas as verificações de artefatos forem aprovadas. O recibo em JSON inclui SHA-256 e contagens de bytes tanto para `specification` quanto para `artifact`.

Para o caminho padrão de transferência do agente, dê preferência ao finalizador:

```bash
node bin/archify.mjs finalize <type> <candidate.json> <output.html> --quality showcase --json
```

O `finalize` invoca o `deliver` verificado uma vez, reutiliza o resultado de validação do showcase
incorporado e, em seguida, executa o `check --require-provenance` rigoroso e
`browser-check --require-provenance`. Ele interrompe na primeira etapa com falha ou ignorada
e preserva o recibo completo dessa etapa. Sua saída padrão (stdout) é um objeto JSON
compacto com status de portas, diagnósticos acionáveis delimitados, identidade do artefato
e caminhos de evidência. O mesmo objeto compacto é gravado atomicamente em
`<output-stem>.finalize-summary.json`; use esse arquivo para correção normal de falhas. Quando os diagnósticos são truncados, `diagnosticSummary.omittedByCode` conta as entradas não exibidas por código de diagnóstico, sem substituir seu assunto completo e as evidências de correção no recibo completo.
Os recibos completos das etapas e os tempos permanecem disponíveis para auditoria em
`<output-stem>.finalize.json`. Com `--out-dir`, ambos os arquivos são gravados nesse local (a menos que um `--receipt` explícito substitua o caminho do recibo final; o HTML do artefato permanece no caminho de saída solicitado);
`--receipt <path.json>` substitui o caminho do recibo completo e gera um
`<path>-summary.json`. Leia o recibo completo somente quando o resumo compacto estiver
truncado e os assuntos e evidências exibidos não puderem identificar um reparo local
coerente, ou quando evidências completas de auditoria tenham sido explicitamente solicitadas. O recibo
compacto relata `visualReview: “not-requested”`; o gate automatizado não cria imagens nem requer um revisor perceptivo. Uma `visualReviewRecommendation` compacta retém métricas positivas de cruzamento e desvio de rota da verificação rigorosa para que o autor possa aplicar a escalação de revisão abaixo sem ler o recibo completo. Uma recomendação não altera o código de saída da máquina nem afirma que a revisão ocorreu. Seu `affectedRoutes` identifica pares de cruzamentos e desvios (até oito de cada, com um sinalizador de truncamento); a `composition.routeReview` completa da verificação rigorosa retém todas as relações afetadas. Use esses IDs para rastrear as rotas na janela de visualização padrão capturada. Os desvios podem incluir `directCorridorBlockers`, identificando nós entre pontos finais alinhados. Essas são pistas geométricas de revisão, não novas falhas de validação ou semântica inferida do caminho principal. Para um caminho principal bloqueado ou várias rotas emaranhadas, siga [Reparo do layout da arquitetura](architecture-layout-repair.md) e reajuste a cena conectada antes de ajustar lados ou rótulos individuais. Preserve todos os fatos semânticos; mantenha posições não relacionadas somente quando a composição ao redor já estiver aceita.

Para uma Arquitetura automática medida com uma grande área de margem não utilizada, o
recibo compacto pode incluir `layoutReviewRecommendation`. Sua
evidência `composition.leadingSpace` leva em conta nós, títulos de limites,
rotas e rótulos. Verifique se esse espaço é intencional; caso contrário, reposicione
a cena conectada preservando o significado e a geometria definida pelo usuário e, em seguida,
finalize novamente. Essa sugestão não altera o status de nenhum portão ou saída e não requer
captura de tela. Uma tela fixa ou medição incerta não recebe sugestão.

Um relatório de finalização aprovado é evidência suficiente para todos os quatro portões. Apenas
nomear os portões ou exigir que cada um seja aprovado não requer a repetição de seus
comandos independentes. Repita um comando individual somente quando a solicitação
exigir explicitamente execuções separadas ou quando um diagnóstico focado de falha assim o exigir.

Os comandos individuais permanecem válidos e compatíveis com versões anteriores. Use-os
diretamente para diagnóstico focado, recuperação ou quando apenas um portão for
necessário. Uma falha na finalização não flexibiliza nenhum portão e não transforma um
artefato antigo preservado em uma entrega bem-sucedida atual.

O `finalize` detecta e inicia o Chrome privado somente após a entrega e a aprovação em
verificações rigorosas. Verificações com falha na entrada, nas evidências do repositório, na entrega ou no artefato
, portanto, não iniciam o navegador. Ele carrega o artefato somente após a
proveniência atual ser verificada. O mecanismo de controle do navegador mantém todas as verificações de janela de visualização, tema e
estabilidade; o navegador é fechado ao concluir ou em caso de falha na etapa do navegador.
Seu recibo completo da etapa registra `execution: “in-process”` e o equivalente
`command` independente para reprodução. A inicialização do Chrome não se sobrepõe mais às etapas anteriores,
portanto, execuções bem-sucedidas podem demorar um pouco mais. Isso evita inicializações desnecessárias
em candidatos inválidos; não corrige restrições da sandbox do host na
inicialização do Chrome nem flexibiliza o filtro do navegador.

O commit emparelhado é recuperável, não uma garantia de que dois caminhos do sistema de arquivos sejam alterados
de forma atômica ou sejam duráveis em caso de perda de energia. A finalização do diário faz parte
desse commit: uma falha detectada durante a verificação ou remoção do diário reverte
os arquivos substituídos quando possível e enquanto a propriedade permanecer atual. Se
a propriedade for perdida, a tentativa anterior interrompe imediatamente a renomeação, a reversão,
a finalização do diário, o registro da proveniência da falha ou a limpeza de caminhos
compartilhados. Qualquer preparação privada ou backups recuperáveis permanecem disponíveis e são
identificados pelo diagnóstico de falha. Se a restauração falhar por outro motivo,
o registro de falha também identifica os backups retidos para recuperação. Uma
interrupção do processo pode deixar o diário, os backups ou a preparação privada para trás;
os verificadores, então, falham com o processo encerrado. Siga as evidências de recuperação relatadas antes de executar novamente
`deliver` serialmente na mesma saída. Uma tentativa com falha retorna um valor diferente de zero e nunca invoca um abridor; ela nunca
autoriza a coleta de evidências visuais.

Se a criação exclusiva for bem-sucedida, mas a inicialização do bloqueio falhar, o Archify pode
registrar a proveniência da falha e remover o bloqueio incompleto apenas enquanto sua
capacidade ainda identificar essa entrada exata. Uma substituição é preservada.
Erros no sistema de arquivos e de limpeza são relatados separadamente de uma entrega simultânea ativa.
Um bloqueio ativo, obsoleto, não reconhecido ou preservado de outra forma
impede, de forma independente, que os verificadores aceitem o artefato anterior. Corrija o
erro relatado no sistema de arquivos antes de tentar novamente e use outro diretório de saída físico
se o caminho do bloqueio contiver dados não relacionados.

A liberação do bloqueio faz parte da conclusão da entrega. Se o par artefato/proveniência
tiver sido confirmado e o diário tiver sido finalizado, mas o bloqueio correspondente não puder ser
removido, o `deliver` sai com código de saída 1 com `delivery/lock-release`, preserva o bloqueio,
não exibe um comprovante de sucesso e não invoca um abridor. O bloqueio
preservado mantém os verificadores estritos em modo “fail-closed”. Somente após o commit do par, a
finalização do diário e a liberação do bloqueio serem bem-sucedidos é que `deliver` pode sair com código zero, exibir seu
recibo de sucesso ou executar `--open`.

Execute a verificação estrita `check` após o `deliver` sair com código de saída zero. Execute o `browser-check` ou o opcional
`visual-check` somente após essa verificação estrita sair com código de saída zero. Um marcador com falha,
um diário de recuperação ou um bloqueio de entrega faz com que todos os verificadores falhem antes de aceitar
o HTML preservado; relate os diagnósticos e conclua uma entrega de recuperação bem-sucedida
antes de coletar novas evidências do navegador.

A `verificação` estática usa a mesma análise de caminho SVG para relações inspecionadas e
quadros estruturais. Ela suporta `M/L/H/V/Q/Z`, suas formas relativas em minúsculas,
parâmetros repetidos e números finitos. Cada `M` inicia um subcaminho independente;
`Z` fecha apenas o subcaminho atual. Subcaminhos separados nunca criam segmentos de conexão
que estejam ausentes do desenho. Segmentos retos separados por um
`Q` não colinear também permanecem separados na análise de rota; pontos de amostragem de curvas
não se tornam microsegmentos em orçamentos de rota reta ou verificações de ritmo.
Os comprimentos e o alongamento dos segmentos são medidos por trecho contínuo, enquanto as
curvas reais são somadas por relação. Uma relação que exceda um orçamento é contada
uma única vez, e os limites internos dos trechos não recebem a exceção de tronco compartilhado curto
reservada para pontos finais semânticos.

Isso não significa que haja suporte completo aos comandos SVG: `A/C/S/T` geram
`artifact/svg-path-unsupported`; parâmetros ausentes, números inválidos e outros
erros de sintaxe geram `artifact/svg-path-malformed`. O verificador retorna um valor diferente de zero
em vez de ignorar um caminho inválido ou aguardar indefinidamente. Falhas no caminho acrescentam uma
verificação `svg_path_data`; artefatos válidos normais mantêm as nove verificações existentes.
Os diagnósticos contêm o `pathIndex` inspecionado, `role`, `id` de relação/quadro
disponível, `tokenOffset` de análise, `command` disponível e `reason`, para que a fonte
geradora possa ser localizada e reparada. O `pathIndex` é baseado em 1; o `tokenOffset` é um
deslocamento UTF-16 baseado em zero em `d` após a decodificação das referências numéricas de caracteres.
Tags aparentes em comentários, CDATA e texto de atributos são ignoradas. A aprovação em verificações estáticas
de caminho não garante a aceitação visual pelo navegador ou pela percepção do usuário.

<details>
<summary>Descrição em chinês</summary>

A verificação estática `check` utiliza o mesmo resultado de análise para caminhos SVG de linhas de relação e limites estruturais, suportando
`M/L/H/V/Q/Z` e suas formas relativas em minúsculas, parâmetros repetidos e valores finitos. Cada `M` inicia um
subcaminho independente, enquanto `Z` apenas fecha o subcaminho atual; os subcaminhos não são unidos para formar segmentos de linha inexistentes no gráfico.
As retas antes e depois de um `Q` não colinear também permanecem separadas, e os pontos de amostragem da curva não são contabilizados como microsegmentos no orçamento de rota reta ou
na verificação de ritmo. O comprimento dos segmentos e a taxa de alongamento são medidos por trechos contínuos, e o número real de curvas é somado à relação original; relações acima do orçamento
são contabilizadas apenas uma vez, e os pontos de interrupção em subcaminhos internos não se beneficiam da exceção de linhas curtas compartilhadas com pontos de início e fim semânticos.
Esta não é uma promessa de suporte completo ao conjunto de comandos SVG: `A/C/S/T` retornam
`artifact/svg-path-unsupported`; erros de formato, como falta de parâmetros ou valores inválidos, retornam
`artifact/svg-path-malformed`. A verificação é encerrada com um status diferente de zero, sem pular caminhos incorretos ou entrar em espera infinita.
Quando o caminho falha, é adicionada a verificação `svg_path_data`; produtos válidos comuns mantêm as 9 verificações originais.
O diagnóstico inclui o `pathIndex`, o `role`, os `id`s de relações/limites disponíveis do caminho em análise, bem como a posição de análise
`tokenOffset`, o `command` e o `reason` disponíveis, para localizar e corrigir a origem do caminho gerado.
O `pathIndex` começa em 1; o `tokenOffset` é a posição UTF-16, a partir de 0, na string `d`
decodificada a partir da referência de caracteres numéricos. Comentários, CDATA e pseudo-tags no texto de atributos não participam da verificação.
A aprovação na verificação estática de caminho ainda não significa aprovação na aceitação visual percebida pelo navegador.

</details>

A interface de entrega expõe quatro declarações distintas:

1. `deliver` comprova verificações determinísticas de artefatos e identidade de bytes.
2. `browser-check` coleta as evidências automatizadas necessárias do navegador a partir do artefato exato, sem capturar imagens.
3. `visual-check` adiciona, opcionalmente, capturas de tela vinculadas ao artefato e uma folha de contato.
4. A revisão visual perceptiva registra o julgamento de um revisor humano ou de um sistema capaz de analisar imagens.

A aprovação de uma reivindicação nunca implica nas outras. Nunca afirme que o recibo determinístico inclui evidências de revisão do navegador ou visual perceptiva.

## Recuperação de uma comparação com falha

`compare` confirma um artefato HTML e seu recibo JSON como um par. Se essa confirmação
falhar, ele tenta restaurar os arquivos anteriores. Uma reversão completa remove
o diretório temporário, como de costume.

Se um arquivo anterior não puder ser restaurado, o `compare` sai com código de saída diferente de zero, indicando
`delta/commit-rollback-failed`, e mantém o diretório de recuperação. No recibo de falha em JSON,
`diagnostics[].evidence.recoveryDirectory` identifica esse
diretório e `recoveryFiles` lista os caminhos `{ backup, target }` para os arquivos cuja
restauração falhou. Os diagnósticos legíveis por humanos também exibem os caminhos de recuperação.

Resolva o erro do sistema de arquivos, inspecione os destinos atuais e restaure cada
backup listado em seu destino correspondente antes de tentar novamente. Mantenha o diretório de recuperação
até que ambos os arquivos anteriores tenham sido recuperados e verificados; ele também pode
conter arquivos candidatos rejeitados, que não devem ser confundidos com backups.
Comparações bem-sucedidas e falhas antes do commit mantêm sua limpeza normal.

## Evidência automatizada do navegador

`finalize` executa a verificação obrigatória do navegador no HTML confiável exato, sem
re renderizá-lo ou modificá-lo. Para um diagnóstico focado, o comando autônomo equivalente
é:

```bash
node bin/archify.mjs browser-check <output.html> --json --require-provenance
```
O comando “zero-dependency” utiliza o Chrome/Chromium (ou o Microsoft Edge)
por meio do canal do DevTools. A variável `ARCHIFY_CHROME` é determinante quando definida, mesmo que
o caminho seja inválido: o Archify não recorre silenciosamente a outro navegador. A detecção automática
no Windows verifica primeiro todos os locais de instalação do Chrome/Chromium e o comando PATH,
depois o Edge em `%ProgramFiles(x86)%`, `%ProgramFiles%` e `%LocalAppData%`,
seguido por `msedge` no PATH. No macOS e no Linux, a detecção também verifica
o Chrome/Chromium primeiro, depois o pacote do aplicativo Edge (macOS) e
`microsoft-edge`/`microsoft-edge-stable` no PATH. Ele
mede a cobertura do tema claro em 1440×900, 1600×1000, 1920×1080 e
2048×1320, e verifica o tema claro solicitado em todas as quatro janelas de visualização, o tema escuro
em ambos os pontos finais e os estados de tempo de execução READ/Still. Um tema solicitado que
seja resolvido como um tema diferente falha com evidência medida. Ele cria um
recibo `<output-stem>.browser-check.json` e nenhuma captura de tela ou folha de contato.
Passe `--out-dir <dir>` para colocar o recibo em um diretório de evidências separado.
O recibo vincula o SHA-256 do artefato e a contagem de bytes, identifica
`evidenceKind: “automated-browser”` e relata
`visualReview: “not-requested”`.

O estouro horizontal sempre falha. A rolagem vertical normal no nível do documento é
aceita apenas com um contrato declarado pelo renderizador e texto legível medido.
Canvas automáticas declaram `data-reader-fit=“intrinsic-height”` (ajuste de altura)
ou `data-reader-fit=“width-first”` (largura de leitura em Sequência e Waterfall); seu Reader adaptativo
deve atingir sua largura legível e expor `data-reader-overflow=“authored”`.
A arquitetura com um `meta.viewBox` explícito, por sua vez, declara
`data-diagram-type=“architecture”` e `data-reader-fit=“authored-height”`:
suas coordenadas SVG, proporção e comportamento de largura do Reader existente permanecem
inalterados. Seu SVG completo deve permanecer dentro do painel do diagrama, sem
rolagem interna ou recorte, e o documento deve permitir a rolagem vertical.
O recibo registra `verticalScrollAccepted: true` e
`overflowDisposition: “readable-vertical-scroll”`. Declarações ausentes ou desconhecidas,
viewBoxes explícitos em outros modos, texto ilegível, transbordamento horizontal,
recorte e colisões com a interface do Viewer continuam sendo falhas. Não adicione um
rolador interno ao diagrama nem oculte o transbordamento.

`browser_evidence` na transferência registra apenas o resultado deste comando automatizado
:

- `passed` é mapeado a partir da saída 0 e do recibo `status: “pass”` após todas as medições exigidas serem concluídas e aprovadas.
- `failed` é mapeado a partir da saída 1 e do recibo `status: “fail”` quando a inspeção encontra um defeito, o comando falha ou um erro de tempo de execução deixa a evidência incompleta.
- `skipped` é mapeado apenas a partir da saída 2 e do recibo com `status: “skipped”` quando nenhum navegador compatível está disponível e a inspeção não é executada.

Falhas de tempo de execução deixam evidências incompletas e não devem ser normalizadas como
`skipped`. Elas não invalidam uma entrega determinística já bem-sucedida.
Repita a tentativa em caso de falha ambiental em um contexto de execução compatível com o navegador, quando
for viável. Mantenha o transporte empacotado inalterado, a menos que a falha se reproduza
por meio dessa interface em um ambiente compatível.

No Windows, as reinicializações do Chrome/Edge podem perder o canal herdado do DevTools
antes que qualquer resposta chegue. O Archify remove um
`__COMPAT_LAYER=DetectorsAppHealth` independente apenas do ambiente do filho do navegador
(nome e valor sem distinção entre maiúsculas e minúsculas); o ambiente pai, camadas desconhecidas,
camadas combinadas e configurações de compatibilidade relacionadas a privilégios permanecem inalteradas.
Isso visa o caso relatado de integridade do aplicativo no Git Bash sem privilégios elevados, e não todos os
modos AppCompat. Reinicializações com shell com privilégios elevados continuam sem suporte: reexecute a partir de um
PowerShell sem privilégios elevados aberto normalmente, fora de um pai com privilégios elevados ou no modo de compatibilidade.
O Archify não suprime a redução de privilégios do navegador nem desativa a sandbox
como uma solução alternativa para a reinicialização. Um diagnóstico de inicialização com resposta zero sugere essa
solução sem afirmar que a elevação ou o AppCompat causaram todas as falhas de pipe.

Uma falha de proveniência encerra o processo antes da inspeção do navegador e mantém um
registro de falha na verificação do navegador vinculado ao artefato tentado. Se o registro de falha
não puder ser gravado, o diagnóstico identifica essa evidência incompleta.

Ambos os comandos do navegador inspecionam o HTML exato entregue, sem modificá-lo ou renderizá-lo novamente.

## Revisão da largura da sequência

Uma chamada bem-sucedida de `finalize` pode relatar `layoutReviewRecommendation.action: “inspect-sequence-width”`. Sua `evidence` mede o espaço não utilizado à direita das colunas fixas dos participantes, após considerar os rótulos das mensagens, notas e títulos dos segmentos. Essa recomendação não adiciona nenhum aviso, falha, exigência de captura de tela ou alteração automática da geometria.

Um recibo aprovado de `validate --json`, `deliver` ou `finalize` pode conter entradas em `diagnostics[]` com `severity: “warning”` para alternativas de localização do Viewer (`i18n/*`). Elas não causam falha em nenhuma verificação. Quando o artefato precisar estar totalmente localizado, corrija as chaves listadas com base em sua `evidence` e execute `finalize` novamente.

Telas de sequência com `meta.column_fit` omitido usam `spread`, independentemente de `meta.viewBox` ter sido fornecido ou não. Uma viewBox definida pelo autor continua sendo a referência; uma capacidade inviável de participantes falha sem ampliá-la silenciosamente. `meta.column_fit: “fixed”` explícito preserva colunas fixas históricas. Para um candidato cuja sugestão de largura de coluna fixa permaneça, verifique primeiro se a geometria fixa é intencional. Somente quando uma alteração nessa geometria for autorizada, salve o candidato, defina apenas `meta.column_fit` como `“spread”` e execute novamente o `finalize` completo uma vez com `--out-dir <pasta>/width-review`. Mantenha a ordem dos participantes, as mensagens e suas posições y, rótulos, notas, fontes e dimensões da tela. Se essa tentativa falhar, restaure o candidato e finalize-o com `--out-dir <pasta>/width-restore`; relate a sugestão de layout restante em vez de iterar. Preserve a geometria fixa intencional e divulgue a sugestão quando uma alteração não for autorizada. Para manter as coordenadas fixas históricas de uma entrada mais antiga com ajuste omitido, defina `meta.column_fit: “fixed”` explicitamente. Esta revisão trata da composição horizontal; um recibo aprovado ainda não implica em aprovação perceptiva.

## Evidência de captura opcional

`visual-check` permanece compatível com versões anteriores para uma revisão perceptiva solicitada ou escalada:

```bash
node bin/archify.mjs visual-check <output.html> --summary --require-provenance
```

`--summary` retorna um JSON compacto com todos os diagnósticos e caminhos absolutos para o recibo completo, a folha de contato e todas as capturas de tela. Para uma revisão visual escolhida, inspecione as capturas relevantes; o sucesso da captura não significa aprovação perceptiva. `--json` mantém a saída completa do recibo para usuários existentes. Ambos os modos executam as mesmas verificações e mantêm o mesmo status de saída. Se a limpeza falhar após a publicação, o resumo mantém os diagnósticos finais de falha e os detalhes de recuperação da `publicação`; o recibo vinculado registra as evidências confirmadas anteriormente.

Ele realiza as mesmas medições automatizadas do navegador, captura capturas de tela em modo claro/escuro
nas resoluções 1440×900 e 2048×1320 e gera quatro arquivos PNG de viewport,
uma folha de contato em HTML com caminho relativo e um recibo em JSON. `--out-dir <dir>` move todos esses arquivos complementares para um único local.
Abra a folha de contato em HTML em um navegador ou inspecione os PNGs da janela de visualização com um visualizador de imagens. Seu recibo relata `visualReview: “pending”`, pois as capturas, por si só, não
fazem um julgamento perceptivo. Falhas de captura e de proveniência seguem as regras de propriedade abaixo.

O recibo, a folha de contato e os quatro arquivos PNG formam um conjunto de evidências de propriedade. Antes da
captura, `visual-check` congela cada entrada de diretório solicitada, seu
espaço de gravação canônico e pai físico, bem como o estado de ausência/arquivo do alvo,
tipo, identidade do dispositivo/inode e modo. Alvos de evidência com links físicos não são
alvos seguros para gravação. Todos os arquivos candidatos são criados exclusivamente dentro de um diretório de preparação aleatório e
privado, localizado abaixo do diretório de evidências físicas; o recibo
é publicado por último. Cada candidato em preparação deve ter exatamente um nome de link físico
antes da publicação. O link de publicação “no-clobber” atribui temporariamente aos nomes em preparação
e finais uma contagem de links igual a dois; ao desvincular o nome verificado em preparação, a entrada final deve
ficar com uma contagem de links igual a um. Um link físico externo inesperado
falha ao ser fechado e seu alias nunca é removido.

O Chrome inspeciona uma cópia do artefato capturado, cuja identidade e conteúdo foram verificados,
em um diretório temporário local privado, de modo que o carregamento de arquivos pelo navegador não dependa
do suporte a UNC ou a caminhos longos. Os seis candidatos à publicação permanecem no
volume de evidências. Ambos os diretórios temporários são limpos sem excluir recursivamente
conteúdos desconhecidos; as entradas retidas incluem seus locais de recuperação.

Imediatamente antes de confirmar qualquer ação, `visual-check` resolve novamente e verifica
o conjunto completo de seis caminhos. Um requerente de caminho ausente, substituição de caminho existente,
redirecionamento de link simbólico ou link pendente, alteração na topologia pai, link físico ou
identidade indeterminada falha e é fechada com `viewer/evidence-path-conflict`. O
requerente e todos os outros caminhos de evidência finais permanecem inalterados. A limpeza remove
apenas as entradas preparadas ou publicadas desta execução após uma nova verificação de suas
identidades capturadas; uma entrada alterada ou desconhecida é preservada.

Um conjunto de evidências visuais existente só pode ser substituído quando um recibo regular
de `visual-check` comprovar a propriedade do mesmo artefato e diretório de evidências,
e seu manifesto sidecar exato corresponder a todas as folhas de contato existentes
ou à contagem de bytes e ao resumo SHA-256 dos arquivos PNG. Um registro de propriedade ausente, malformado, desconhecido, incompatível
ou incompleto nunca autoriza a exclusão. Execuções com falha ou ignoradas
retiram capturas de tela/folhas de contato anteriores apenas como parte da mesma transação verificada
quando essa prova de propriedade for bem-sucedida; caso contrário, elas preservam todas as
evidências desconhecidas e relatam `viewer/evidence-path-conflict`.

Essa regra também se aplica quando o Chrome não está disponível ou a verificação de proveniência falha antes da
inspeção do navegador: nenhum dos caminhos pode excluir cegamente evidências que pareçam obsoletas. Um
conjunto de propriedade verificado pode ser retirado de forma recuperável antes da publicação de um recibo ignorado ou
com falha; evidências sem propriedade permanecem intactas. Esses resultados não invalidam uma entrega determinística já
bem-sucedida e não transformam uma revisão visual perceptiva
em aprovada ou reprovada. Repita uma tentativa em caso de falha ambiental por meio do comando
suportado em um contexto de execução compatível com navegador, quando for viável. Mantenha o
transporte empacotado inalterado, a menos que a falha se reproduza por meio dessa interface em
um ambiente compatível.

O `browser-check` aplica as mesmas regras de instantâneo privado, identidade, propriedade e “no-clobber” ao seu único recibo JSON. Seu namespace é separado do `visual-check`, portanto, uma reexecução apenas no navegador não pode remover evidências de captura.

## Um novo candidato em um caminho de saída existente

As evidências do navegador pertencem aos bytes exatos do artefato. Após editar um candidato cujo HTML anterior já possua evidências do navegador, escolha um novo diretório de evidências antes de executar o próximo `finalize`; isso preserva os recibos e capturas antigos sem uma repetição evitável devido a conflito de propriedade. `--out-dir` realoca o novo recibo do `browser-check` e, por padrão, o recibo e o resumo do `finalize`. Um `--receipt` explícito substitui o caminho do recibo de finalização; seu resumo segue esse caminho. A entrega bem-sucedida ainda reescreve o HTML solicitado e seu arquivo irmão `*.delivery.json`. Evidências anteriores do navegador ou visuais permanecem vinculadas aos bytes originais do artefato e não devem ser tratadas como evidências para o HTML alterado:

```bash
node bin/archify.mjs finalize architecture candidate.json diagram.html --quality showcase --repo-root <root> --out-dir diagram.review-2 --json
node bin/archify.mjs visual-check diagram.html --out-dir diagram.review-2 --summary --require-provenance
```

O diretório de evidências não é um arquivo do HTML. Copiar apenas o HTML para lá não vincula novamente os caminhos de recibos nem a proveniência. Se for necessário um instantâneo histórico, preserve o candidato e o artefato separadamente antes de sobrescrevê-los; não presuma que os recibos copiados validam um artefato realocado.

Mantenha o caminho do HTML solicitado estável. Use um novo diretório de revisão para cada candidato alterado e mantenha o mesmo diretório para novas tentativas de bytes inalterados. Para um diagrama sem evidência de repositório, omita `--repo-root`. Deixe que os comandos criem seu próprio diretório de saída. Uma falha de validação anterior que não produziu evidência HTML ou do navegador não requer um novo diretório. Nunca remova evidências desconhecidas para que uma nova tentativa seja bem-sucedida.

## Abertura opcional

Adicione `--open` somente quando o usuário desejar uma visualização local imediata. Ele é executado após
a conclusão do commit do par verificado, a remoção de seu diário de recuperação
e a liberação bem-sucedida do bloqueio de entrega. Ele utiliza um abridor do sistema operacional
com uma matriz de argumentos, com um limite de cinco segundos no macOS e no Linux, e um limite de quinze segundos
para a inicialização do PowerShell no Windows. O recibo registra `open.status`; tentativas de inicialização com falha ou
indisponíveis também incluem detalhes normalizados de `open.failure`.
Mantenha-o desativado para CI, agentes autônomos e ambientes não interativos.
Falha ou abertura não suportada não invalida a entrega; seu
status comprova apenas se a invocação do abridor local foi bem-sucedida.

## Última pré-visualização ativa válida

Apenas para um ciclo ativo de criação na área de trabalho:

```bash
node bin/archify.mjs preview <type> <input>.json <output>.html --quality showcase
```

A pré-visualização monitora uma entrada explícita no loopback, vincula cada resumo estável a um instantâneo privado e avança somente após a aprovação do pipeline de entrega verificado existente. Entradas inválidas, parcialmente escritas, excluídas ou substituídas mantêm a revisão verificada anterior na tela e no disco. Bytes idênticos não são reconstruídos nem recarregados.

O tempo de execução da pré-visualização é fornecido dentro do ZIP da Skill sem dependências e deve funcionar sem `node_modules`.

Nunca inicie o processo por padrão. Não o utilize para CI, agentes autônomos, compartilhamento remoto ou uso em dispositivos móveis. A opção `--no-open` destina-se apenas a usuários que irão acessar a URL local exibida ou para testes em loop. Interrompa-o com Ctrl-C antes da transferência. O primeiro Ctrl-C encerra a entrega ativa sem publicá-la; um segundo Ctrl-C força o encerramento de ambos os processos de entrega e das conexões HTTP, incluindo solicitações incompletas. O desligamento preserva o último artefato verificado e remove apenas arquivos de preparação cuja propriedade possa ser verificada. Se a entrega for interrompida antes que seu recebimento chegue à Visualização, arquivos não confirmados e material de recuperação podem permanecer no diretório privado de preparação; o desligamento não exclui recursivamente conteúdos desconhecidos. O estado do servidor, a porta, o caminho de origem, os diagnósticos, o texto de erro e os tokens de recarga nunca devem entrar no artefato gerado ou em qualquer exportação.

## Revisão perceptiva

O caminho automatizado termina com o gate determinístico do navegador e relata
`visual_review: not_requested`. A geração comum não requer capturas de tela
nem uma etapa de leitura de imagens, incluindo Arquitetura recém-criada ou reposicionada.
A revisão perceptiva é opcional; use-a para uma solicitação explícita ou uma investigação visual
concreta. Possíveis motivos incluem:

- o finalizador compacto inclui `visualReviewRecommendation` para cruzamentos ou desvios (recomendação, não um portão de entrega);
- o usuário solicita explicitamente uma revisão estética ou visual;
- uma alteração no modelo, renderizador ou visualizador requer evidência de regressão visual;
- um novo layout ou diagnóstico do navegador deixa um baixo nível de confiança;
- a execução é selecionada para auditoria por amostragem ou teste interno.

Para o visualizador de desktop autônomo padrão, meça 1440×900, 1600×1000, 1920×1080 e 2048×1320. Exija que `document.documentElement.scrollWidth <= window.innerWidth` em todos os tamanhos verificados. Dê preferência a `scrollHeight <= window.innerHeight`; aceite a rolagem vertical no nível da página apenas por meio da exceção de legibilidade declarada pelo Reader, definida acima. Na maior janela de visualização verificada, inspecione a composição renderizada em busca de uma faixa inferior vazia e evidente: o painel principal e os cartões de conclusão necessários devem utilizar a altura disponível como um todo equilibrado, sem se comprimir em uma faixa estreita. Em caso de transbordamento inesperado, corrija a composição criada removendo apenas conteúdo genuinamente redundante ou compactando o espaçamento antes de reduzir nós, rótulos ou o painel principal. Não oculte o transbordamento, não recorte o conteúdo, não introduza um rolagem interna no diagrama nem reduza a tipografia de nós/rótulos para que a medição seja aprovada. A contenção em telas estreitas/móveis pode manter a rolagem vertical da página.

Para uma escalação, execute `visual-check` no artefato finalizado atual, inspecione
sua folha de contato com um leitor de imagens adequado ou por uma pessoa, e verifique ambos os temas de endpoint,
a visualização READ padrão, cruzamentos de linhas/corredores, máscaras de rótulo, ajuste de nó/cartão,
fechamento de foco/busca/passaporte e limpeza da exportação. Essa revisão é
complementar e nunca altera `browser_evidence`. Uma análise rápida sem restrições no navegador
pode servir apenas para uma revisão perceptiva.

Em um diagnóstico ou transferência estruturada, relate um status verdadeiro de revisão opcional:


- `visual_review: not_requested` — nenhum gatilho de revisão se aplica; isso não é uma declaração de aceitação visual.
- `visual_review: aprovado` — somente após a inspeção do artefato renderizado.
- `visual_review: ignorado (leitor de imagens indisponível)` — uma revisão solicitada ou acionada não pôde ser executada.
- `visual_review: reprovado` — com o defeito visível concreto.

Para uma revisão escalada, use `correction_rounds: 0`, `correction_rounds: 1` ou
`correction_rounds: 2`; nunca exceda duas rodadas de correção focadas. Quando a revisão
não for solicitada, use `correction_rounds: 0`. Nunca relate
`visual_review: aprovado` sem inspecionar o artefato. Se a revisão perceptiva
alterar o candidato, execute novamente `finalize`, pois a especificação anterior e
os recibos do artefato não estão mais atualizados.

## Recibo de transferência

Para um diagnóstico solicitado ou uma transferência estruturada, extraia os seguintes detalhes
dos recibos existentes. Respostas comuns voltadas para o usuário seguem
[Saída](../SKILL.md#output); esta lista de verificação não é uma resposta padrão de chat.

```text
diagram_type: <tipo de diagrama real>
output: /caminho/absoluto/para/o/arquivo.html
specification_sha256: <valor do recibo>
artifact_sha256: <valor do recibo>
validação: <perfil de qualidade real, contagem de verificações, erros e avisos>
evidência_do_navegador: aprovado|reprovado|ignorado
revisão_visual: não_solicitada|aprovada|ignorada (leitor de imagens indisponível)|reprovada
rodadas_de_correção: 0|1|2
```

Derive `browser_evidence` apenas do recibo `browser-check` vinculado ao artefato mais recente,
normalmente a etapa incorporada por `finalize`. Registre capturas opcionais ou
trabalhos manuais no navegador separadamente com sua vinculação ao artefato, escopo de janela de visualização/tema
e observações; nunca use isso ou `visual_review` para sobrescrever o status
automatizado.

A abertura, o status de pré-visualização, os Cartões de Compartilhamento e outras exportações do visualizador não são reivindicações de validação.

A finalização da publicação do recibo utiliza o mesmo editor vinculado à identidade, sem sobrescrita, e os registros de recuperação explícitos descritos acima. Os recibos completos e resumidos devem ser distintos do recibo candidato, do artefato, dos metadados de entrega e do recibo do navegador. Seus destinos devem estar ausentes ou ser arquivos regulares com um único link; entradas de recibo com links simbólicos e destinos com links físicos falham na conclusão. Um requerente posterior ou um pai alterado interrompe a publicação e permanece inalterado. Os nomes padrão dos recibos compartilham o namespace físico do artefato e estão sujeitos ao limite de nome de arquivo do host. Os dois recibos são publicados individualmente, não como um par atômico em caso de falha; somente um comando concluído com sucesso constitui uma transferência bem-sucedida.



# Contrato de criação

Leia esta referência somente quando o caminho rápido de criação exigir mais detalhes. Os esquemas e exemplos continuam sendo a fonte oficial.

## Correção de composição

Ao corrigir a abstração de uma visão geral criada, mapeie cada função, direção de relação, protocolo, limite, condição e referência de origem afetados para seu nó ou relação remanescente antes de reagrupar. Uma citação inicial não comprova um protocolo de mensagem. Preserve as evidências inspecionadas de cada afirmação. Mantenha fixa a topologia fornecida pelo usuário ou acordada; o simples fato de haver menos rotas não justifica a fusão. Um limite em torno de um nó requer um fato de isolamento explícito e não deve se limitar a repetir seu rótulo.

## Correção de rótulos

Quando houver conflito entre rótulos de relações, mova o rótulo, ajuste a rota ou o espaçamento e, em seguida, encurte o texto, preservando o significado. Omita o texto somente quando ambos os pontos finais o impliquem totalmente e ele não transmita nenhum protocolo, ação, direção, comportamento síncrono ou assíncrono, nem mecanismo de cruzamento de limites. Espaçamento significa intervalo claro, e não distância central; a largura medida da máscara tem precedência. O orçamento de intervalo do primeiro rascunho está em [Layout e roteamento](authoring-defaults.md#layout-and-routing).

Para um subrótulo desproporcional, mantenha concisa sua função ou protocolo exato e coloque a informação complementar em uma nota ou cartão. Preserve todas as responsabilidades, protocolos e informações de limite necessárias. Use o orçamento de largura de nó da primeira versão em [Layout e roteamento](authoring-defaults.md#layout-and-routing).

## Consulta do esquema

Leia tanto o esquema do modo quanto o arquivo `schemas/common.schema.json`. Os esquemas dos modos utilizam `$ref`, portanto, o arquivo comum é onde residem as enums compartilhadas.

- `componentType`: `frontend`, `backend`, `database`, `cloud`, `security`, `messagebus`, `external`
- Documentos de entidade-relação usam `entities` e `relationships`; `key` aceita `pk`, `fk` ou `uk`, e `fromCardinality`/`toCardinality` aceitam `one` ou `many`.
- `variant`: `default`, `emphasis`, `security`, `dashed`
- IDs de relação usam o padrão de identificador compartilhado e devem ser únicos em sua coleção.

Não invente campos. Antes de criar qualquer novo campo, enumeração ou texto restrito, leia a definição do esquema, incluindo destinos comuns de `$ref`. Em particular, verifique os tipos de limite, a identidade do repositório e os formatos de referência de origem. Um exemplo demonstra a estrutura; ele não enumera todos os valores válidos. Crie novos IDs, redação, fatos e layout.

## Contratos de layout de fluxo de trabalho

Use o esquema v2 para novos fluxos de trabalho e mantenha o esquema v1 quando uma fonte existente precisar
manter a geometria fixa. Em ambas as versões, `col` permanece no intervalo `0..5` e os rótulos semânticos
das arestas nunca são excluídos como correção de espaçamento. Não altere apenas
`schema_version` quando houver coordenadas absolutas: siga o
[contrato canônico de migração e recebimento de layout](../renderers/workflow/README.md#migration-and-layout-receipt).
As invariantes normativas completas estão nos
[contratos de layout](../renderers/workflow/README.md#layout-contracts) do renderizador de fluxo de trabalho.
Para estágios sequenciais empilhados em um único contêiner, use uma faixa v2 e um grupo,
omita `meta.viewBox` e centralize os nós em torno do conteúdo da faixa com valores simétricos
de `yOffset`, como `-90 / 0 / 90`. Mantenha os rótulos semânticos das bordas e atue de acordo com
os diagnósticos do compilador.

## Contrato de legenda

Omita `meta.legend` para obter o padrão correto: `auto` lista apenas os tipos semânticos
presentes no IR tipado. Use `mode: “all”` para uma referência ao renderizador ou
`mode: “hidden”` para remover a legenda completa. Em `entries`, apenas as chaves listadas
pelo esquema de modo selecionado são válidas; cada chave aceita `label`, `visible` ou
ambos. `visible: true` pode exibir uma convenção suportada, mas não utilizada, enquanto
`visible: false` a oculta. `hidden` não pode ser substituído.

A substituição de um rótulo altera apenas o texto exibido ao leitor. Nunca se deve inferir um tipo a partir do texto nem
usar a legenda para compensar a ausência de nós, estados, mensagens ou fluxos.
Rótulos longos são medidos e quebrados em linhas determinísticas. A
viewBox automática implícita da arquitetura se expande a partir dessa mesma área medida, e uma
tela automática de ERD é dimensionada da mesma forma, de modo que sua legenda padrão esteja sempre no
conteúdo gerado. Por motivos de compatibilidade com versões anteriores, um documento legado sem
`meta.legend` pode omitir uma legenda automática implícita que não caiba em sua
viewBox explícita; isso nunca altera sua topologia tipada. Um ERD que define um
`meta.viewBox` mantém essa área fixa e informa a capacidade, em vez de
omitir a legenda. Adicionar `meta.legend` torna a apresentação intencional e
rigorosa: se seus rótulos resolvidos não couberem na viewBox definida, encurte-os ou oculte-os,
ou amplie a viewBox usando o diagnóstico emitido.

## Consistência de idioma

Escolha um idioma principal de criação. A escolha explícita do usuário prevalece; caso contrário,
use o idioma da solicitação ou o idioma dominante da conversa quando
a própria solicitação for neutra em termos de idioma. Escolha separadamente a localização do Visualizador.
Sempre escreva o `meta.locale` correspondente como uma tag de idioma bem formada: `“en”`
para inglês, `“zh-CN”` para chinês simplificado, `“es”` para espanhol ou qualquer
outra tag para outro idioma. O renderizador utiliza a localidade definida pelo autor sem inferir o idioma
a partir das strings do diagrama. Documentos que a omitem permanecem válidos e assumem o
inglês como padrão.

`meta.locale` controla apenas as superfícies de leitura pertencentes ao renderizador: `<html lang>`, o
sufixo do título do documento, a descrição SVG padrão e os rótulos de foco, os rótulos padrão da legenda
e os controles fixos do Visualizador, status, nomes de acessibilidade e erros.
Ele nunca traduz o conteúdo criado. Aplique o idioma principal separadamente a
títulos, subtítulos, texto de nós e relações, limites, faixas, grupos,
substituições de rótulos de legenda e cartões. Um diagrama bilíngue ainda
escolhe uma localidade principal para o Visualizador; siga uma solicitação explícita de idioma principal
e, em seguida, a ordem de solicitação ou a predominância na conversa.

Os catálogos do Visualizador incluídos estão registrados em `locales/manifest.json`: atualmente
`en`, `zh-CN`, `zh-TW`, `es`, `ko` e `ar`. Para esses, apenas `meta.locale` seleciona o
catálogo completo. As tags correspondem sem distinção de maiúsculas e minúsculas (`zh-cn` seleciona `zh-CN`), mas as variantes de região
e escrita são distintas: `zh-Hant`, `es-MX` ou `ko-KR` não selecionam nenhum
catálogo incluído no pacote.

`meta.translations` é uma substituição opcional por chave: um objeto que mapeia as
chaves de mensagem canônicas do renderizador (`locales/en.json` ou `catalogKeys()` em
`renderers/shared/i18n.mjs`) para strings traduzidas cujos tokens `{placeholder}`
correspondem exatamente à fonte em inglês. Cada mensagem é resolvida da seguinte forma: valor válido de
`meta.translations` → o catálogo integrado selecionado → inglês. Para uma
localidade integrada, forneça apenas as chaves cujo texto o diagrama precise alterar;
o restante do idioma é mantido. Omitir o campo ou fornecer `{}` significa que não há
substituição. Para um idioma sem catálogo integrado, forneça o catálogo aqui.
Reutilize traduções adequadas de `examples/locales/` ou de um catálogo revisado anteriormente,
traduza as chaves ausentes e use o texto original em inglês para verificar as chaves e
os placeholders.

Uma chave desconhecida ou um valor com placeholders incompatíveis é rejeitado e mantém
a mensagem de prioridade mais baixa; isso é relatado como `i18n/invalid-translation` no
stderr e como um aviso no `diagnostics[]` dos recibos de `validate --json`, `deliver` e `finalize`.
As Chaves que ainda são resolvidas para o inglês em uma
localidade que não seja em inglês são relatadas como `i18n/translation-coverage`, com as chaves ausentes
e seu texto-fonte em inglês; adicione exatamente essas chaves para corrigir a lacuna.
A cobertura descreve o catálogo final resolvido, não o tamanho da substituição.

Para um idioma solicitado para o qual você não possa fornecer `meta.translations`, não
escreva um `meta.locale` sem catálogo incluído e sem traduções. Mantenha todas as
sequências de texto criadas voltadas para o leitor no idioma solicitado, omita `meta.locale` para que
o renderizador use o inglês com segurança e informe explicitamente ao usuário que a
interface do Visualizador e o `<html lang>` permanecem em inglês e que o artefato não está totalmente localizado.
O recurso de fallback se aplica apenas às superfícies de propriedade do renderizador; ele nunca
permite que o texto de autoria recorra ao inglês. Não substitua silenciosamente
`zh-CN` por outro idioma ou localidade chinesa, e não traduza automaticamente
os valores de `meta.translations` sem divulgar que eles não foram revisados.

Mantenha intactos os nomes exatos de produtos, identificadores de código, comandos, protocolos, caminhos de API e
nomes de ambiente. Esses termos podem permanecer em inglês dentro do texto localizado,
mas o texto explicativo ao redor ainda deve usar o idioma selecionado.
Os rótulos padrão de legendas pertencentes ao renderizador seguem `meta.locale`; crie uma
substituição `meta.legend.entries.*.label` somente quando o diagrama precisar de uma
formulação diferente do domínio e mantenha essa substituição criada no idioma principal.

## Predefinição visual padrão

Omita `meta.visual_preset` por padrão. O renderizador, então, abre o diagrama no
modo `classic`, tanto no modo de cores claras quanto no escuro. O modo de cores e a predefinição visual são
independentes do estado do visualizador: a alternância entre Claro e Escuro deve preservar a
predefinição atual. Defina `signal-flow`, `blueprint` ou `editorial` apenas quando o usuário
solicitar explicitamente esse estilo visual.

## Padrão do perfil de engenharia

Omita `meta.engineering_profile` para uma arquitetura de sistema comum. Termos como região,
cluster e limite de segurança, por si só, não ativam um
perfil de engenharia. Ative `deployment-ownership` somente quando o usuário
solicitar explicitamente uma topologia de implantação em produção, transferência de propriedade ou
revisão de implantação com falha fechada, e os fatos de origem forem conhecidos. Uma vez ativado,
não remova o perfil de engenharia apenas para passar na validação; corrija os
fatos criados ou relate os diagnósticos com veracidade.

## Hierarquia de títulos

Use um título conciso e deixe que o diagrama transmita a explicação. Omita
`meta.subtitle` por padrão e nunca o utilize para repetir o título, nós, arestas
ou cartões. Inclua apenas uma breve linha de apoio quando o usuário solicitar explicitamente
um subtítulo; um subtítulo omitido ou em branco não deve deixar uma linha visual vazia
no visualizador gerado.

## Regras de geometria executável

Gere um artefato responsivo para laptops e monitores externos, preservando o SVG/viewBox criado, as proporções, a geometria semântica e o fluxo normal do documento. Use linhas de conteúdo significativas e o comportamento de rolagem de página legível declarado pelo Reader quando o diagrama completo precisar de mais altura; o ajuste à janela de visualização não autoriza topologia alternativa ou tipografia menor.

- As âncoras dos nós começam nos pontos médios laterais. `left`/`right` alteram o ponto final horizontal; `top`/`bottom` alteram o ponto final vertical. Para uma relação de Arquitetura automática, portas voltadas uma para a outra e desobstruídas, cujo deslocamento do eixo seja inferior a 16px, podem compartilhar um eixo horizontal ou vertical quando ambos os pontos finais mantêm a margem de canto de 16px. Se exatamente um ponto final pertencer a um grupo de expansão, apenas sua contraparte não compartilhada se move; relações que se expandem em ambos os pontos finais mantêm suas portas distintas e ponte externa, a menos que um par recíproco voltado um para o outro possa usar conjuntamente faixas retas separadas, preservando o espaçamento dos pontos finais, os rótulos e todas as distâncias de segurança em torno das rotas e obstáculos.
- Um lado é um contrato de direção. O primeiro e o último segmento da rota devem ser perpendiculares e voltados para fora/dentro na direção indicada.
- Em diagramas de arquitetura e de fluxo de dados, a especificação explícita `route: “straight”` solicita um segmento direto, que pode ser diagonal quando os lados dos pontos finais não estão fixados. O verificador de artefatos preserva essa intenção; lados explícitos, espaço livre em relação a nós opacos e outros critérios de qualidade ainda se aplicam. `via` tem precedência e mantém as regras existentes, incluindo a exigência do fluxo de dados para segmentos “via” ortogonais.
- A dispersão automática de portas é um comportamento padrão do renderizador para diagramas de arquitetura, fluxo de trabalho e fluxo de dados. Pontos finais automáticos compartilhados se dispersam de forma determinística e simétrica com uma margem de canto de 16px. Isso não se aplica a mensagens de sequência, relações únicas ou rotas explícitas `via`, `channelX`, `channelY`, `labelAt` ou rotas que não sejam `auto`.
- Destaque o ritmo da rota: todo segmento diferente de zero deve ter pelo menos 8 px; todo segmento interno deve ter pelo menos 16 px. Quando as portas distribuídas estão quase paralelas, o roteador usa um stub de ponto final de 24 px e uma ponte externa de 16 px, em vez de criar uma pequena curva em ângulo reto.
- Destaque a compactação da rota: uma rota de Arquitetura explícita falha com `composition/excessive-route-detour` quando seu comprimento ortogonal é pelo menos 2,5 vezes maior que uma rota válida que leva em conta obstáculos, acrescenta pelo menos 200px e envia um ponto de controle pelo menos 96px além do envelope de conteúdo. A evidência registra ambos os comprimentos, a proporção, o excesso, os limites e o desvio. Remova um `via` desnecessário ou mova o corredor diagnosticado para dentro, em vez de ampliar a tela. Relações relacionadas que se sobreponham no mesmo corredor externo em pelo menos 32px são tratadas como um ônibus intencional e permanecem válidas.
- Corredores com pontos finais compartilhados são permitidos apenas quando permanecem semanticamente inequívocos. Sobreposições colineares não relacionadas de 8 px ou mais resultam em falha na avaliação.
- As bordas do contêiner são geometria de passagem intencional, mas uma aresta longa que se estende ao longo de uma borda estrutural não é.
- Uma aresta que cruza um nó opaco não relacionado é sempre uma falha grave, independentemente do perfil de qualidade.

### Coordenadas explícitas de `via`

Use a âncora de partida resolvida `S = [sx, sy]` e a âncora de chegada
`T = [tx, ty]`. As âncoras começam nos pontos médios laterais, mas o roteamento automático e
o Port Spread podem movê-las conforme descrito acima; não presuma que uma âncora copiada
de uma rota automática seja a âncora de uma rota explícita recém-criada.
Rotas explícitas `via` não recebem Port Spread automático.

Para o primeiro ponto de passagem `F = via[0]` e o último ponto de passagem `L = via[via.length - 1]`,
use estes alinhamentos e direções (o eixo y do SVG aumenta para baixo):

| Lado | Partida (`fromSide`): `S` → `F` | Chegada (`toSide`): `L` → `T` |
| --- | --- | --- |
| `top` | `F[0] === sx`, `F[1] < sy` | `L[0] === tx`, `L[1] < ty` |
| `bottom` | `F[0] === sx`, `F[1] > sy` | `L[0] === tx`, `L[1] > ty` |
| `esquerda` | `F[1] === sy`, `F[0] < sx` | `L[1] === ty`, `L[0] < tx` |
| `direita` | `F[1] === sy`, `F[0] > sx` | `L[1] === ty`, `L[0] > tx` |

Por exemplo, dado um ponto de partida inferior `S = [180, 160]` e um ponto de
chegada à esquerda `T = [360, 260]`, este fragmento de relação sai para baixo
e entra no destino pela direita:

```json
{
  “from”: “source”,
  “to”: “target”,
  “fromSide”: “bottom”,
  “toSide”: “left”,
  “via”: [[180, 200], [300, 200], [300, 260]]
}
```

O caminho completo é `[180, 160] → [180, 200] → [300, 200] → [300, 260] → [360, 260]`.
Alterar apenas o primeiro ponto de passagem para `[200, 200]` torna a saída diagonal;
alterá-lo para `[180, 120]` mantém o eixo x alinhado, mas faz com que a rota saia para cima pela
origem, em vez de para fora pela parte inferior. Ambos violam `fromSide: “bottom”`
e geram `clean-flow/endpoint-side-direction`. O exemplo estabelece
apenas a direção do ponto final: mantenha a rota completa livre de nós não relacionados e
aplique as outras regras de geometria acima.

### Espaçamento e rótulos

Na arquitetura de demonstração, um rótulo de conexão não fixado mantém sua posição padrão
quando está livre. Se houver colisão, o renderizador tenta um conjunto limitado de posições próximas
ao longo da rota existente, evitando nós, títulos de limites, outros rótulos e
outras rotas dentro da tela resolvida. Valores explícitos de `labelAt`, `labelDx`, `labelDy`
ou `labelSegment` (incluindo zero) desativam esse recurso alternativo. As rotas e a topologia
permanecem inalteradas; se nenhuma posição próxima estiver livre, a validação reporta a
colisão original. Inspecione as legendas resolvidas com `--layout-json` antes de adicionar controles.
O posicionamento padrão mantém seu comportamento existente.

As recomendações de espaçamento referem-se a um espaço livre entre as caixas, não à distância entre os centros. Uma distância de 200px entre os centros de nós com 165px de largura deixa apenas 35px de espaço livre.

Para um rótulo de relação, é necessário:

```texto
espaço livre > largura da máscara do rótulo + 8px de margem
largura da máscara do rótulo ≈ 6,5px × unidades ASCII + 13px
Caracteres CJK contam como duas unidades
```

Rótulos de relação são dados semânticos. Se o espaço for muito pequeno, mova o rótulo,
ajuste a rota ou o espaçamento e, em seguida, encurte o texto preservando o significado.
Omita apenas o texto já totalmente implícito em ambos os pontos finais e que não contenha
protocolo, ação, direção, comportamento síncrono/assíncrono ou
mecanismo de transposição de limites. Preserve todos os rótulos significativos.
Excluí-lo não é uma correção de espaçamento. Se uma relação começar sem rótulo porque
seus pontos finais a implicam totalmente, explique por que o texto é redundante; essa é uma
escolha semântica de autoria, não uma correção de espaçamento. No fluxo de trabalho v2, permita que o compilador
aloque sua máscara medida antes de aplicar um `labelAt`,
`labelDx`/`labelDy` ou `labelSegment` diagnosticado. Aplique um controle de geometria diagnosticado por
vez, a menos que várias arestas compartilhem um canal restrito. Nesse caso, planeje a menor alteração acoplada a partir da geometria medida e
valide-a em conjunto. A arquitetura/fluxo de trabalho fornecem evidências de layout por meio de
`validate <type> <candidate.json> --layout-json`; para outros tipos, use diagnósticos de validação
e a geometria SVG renderizada.
Antes de adicionar rotas manuais, verifique se controles desnecessários adicionados pelo agente
desativam a distribuição automática de portas; preserve a intenção de rota exigida pelo usuário. Use as
regras de espaço livre medidas acima, em vez de adivinhar coordenadas.

### Evidências de correção

Para a arquitetura, `validate architecture <input.json> --layout-json` expõe as
caixas de componentes resolvidas, molduras de limite, pontos de conexão e posições de rótulos.
Um layout rejeitado mensurável também retorna esses campos, com `ok: false`,
`contract: “archify-architecture-layout-v1”`, diagnósticos e saída 1. Isso é
evidência de reparo, não aceitação do artefato; não gera HTML. Uma entrada malformada ou
uma falha de implementação mantém o recibo de falha comum, sem layout.

Use o lado com falha medido para `layout/boundary-out-of-bounds`. Coordenadas negativas à esquerda/topo
precisam de um deslocamento para dentro; aumentar a largura/altura da viewBox apenas
resolve o estouro à direita/parte inferior. Os limites podem envolver membros em várias linhas. Mantenha
a associação real intacta e verifique novamente as rotas conectadas após mover os membros.

As telas de arquitetura automáticas incluem pontos de rota, bem como nós, quadros
e rótulos. Uma viewBox definida pelo autor continua sendo a referência. Na vitrine,
`layout/route-out-of-bounds` identifica pontos de rota recortados; coordenadas negativas
exigem uma rota para dentro, enquanto o transbordamento à direita/na parte inferior também pode utilizar uma tela maior
definida pelo autor. Verifique novamente a legibilidade na área de trabalho após ampliar uma tela.

Quando vários diagnósticos de cruzamentos/corredores envolverem os mesmos nós, considere
colocá-los juntos antes de adicionar controles de rota. Aplique uma correção coerente e
valide-a; ajustes independentes nas etiquetas não conseguem resolver um gargalo compartilhado no layout.
Compare os diagnósticos por código, assunto e estágio, em vez de apenas pela contagem total.

### Ordem de correção

1. Corrija erros de `meta.quality_profile` ausentes ou inválidos e erros de esquema.
2. Corrija sobreposições de nós ou posicionamento fora do intervalo permitido.
3. Corrija erros de arestas que atravessam nós e de direção dos pontos finais.
4. Corrija cruzamentos, corredores ambíguos, trajetos ao longo de fronteiras, desvios excessivos e o ritmo da rota.
5. Corrija a distância entre rótulo e nó, entre rótulos e, em seguida, entre rótulo e rota.
6. Corrija rótulos que saem da tela: mova o rótulo com `labelAt`/`labelDx`/`labelDy`/`labelSegment` ou amplie `meta.viewBox`. Os valores sugeridos para `labelDx`/`labelDy` substituem o campo inserido pelo autor; eles não são adicionados a ele.

Após cada edição, execute novamente o `finalize` completo, conforme exigido pelo contrato de entrega; use `validate` apenas para diagnóstico específico entre as execuções do `finalize`. Analise `diagnostics[]` por `code` estável, `subject` exato, `evidence` medida e `supportedFixes`. Se o diagnóstico fornecer `labelAt`, use esse ponto em vez de estimar outro deslocamento.

## Posicionamento do modo

### Arquitetura

Escolha entre uma visão geral ou detalhes do mecanismo usando [Composição e significado](authoring-defaults.md#composition-and-meaning). Use um caminho de leitura principal óbvio, que pode atravessar linhas significativas quando a topologia solicitada precisar de espaço. Mantenha a visão geral legível no nível de abstração escolhido; expanda os detalhes de implementação quando eles responderem às perguntas do leitor. Agrupe apenas limites reais de propriedade, confiança, processo ou implantação. Limites não substituem relações.

O posicionamento em grade é preferível quando o esquema o suporta. Posições livres são apropriadas para uma exceção delimitada, não para o planejamento de coordenadas no nível da prosa. Mantenha atores externos fora do limite do sistema quando isso for factualmente verdadeiro. Um limite é traçado como uma caixa preenchida ao redor de todos os seus membros; portanto, posicione-os como um único agrupamento compacto alinhado aos eixos (sem espaços vazios que permitam que um não-membro fique dentro da moldura preenchida) e mantenha todos os não-membros fora dessa caixa; `layout/boundary-encloses-non-member` relata um componente que a caixa engloba com qualidade de apresentação. O padrão mantém seu comportamento de aceitação existente.

### Fluxo de trabalho

As faixas expressam responsabilidade ou fase. As colunas `0..5` expressam
progressão lógica. Inicie novos fluxos de trabalho no `readable-v2`; mantenha o `fixed-v1` apenas para
compatibilidade com geometria legada. No `readable-v2`, os nós podem compartilhar um `(lane, col)`
quando valores distintos de `yOffset` deixam espaço para seus retângulos completos, rótulos e
rotas de conexão. Mantenha o caminho ideal monotônico, preserve os rótulos semânticos das arestas,
e encaminhe novas tentativas e retornos de exceção para fora do corredor da pista principal.

#### Reparo da janela de visualização do fluxo de trabalho

Quando `viewer/viewport-overflow` incluir `workflowLanes`, inspecione os quadros renderizados mais altos
e seu intervalo de nós antes de alterar a fonte. As medidas
são em pixels CSS; o espaço acima/abaixo dos nós inclui títulos de faixas e roteamento, portanto,
não se trata de um espaço removível. Os IDs dos quadros identificam os índices das faixas renderizadas.

Execute `validate workflow <source.json> --layout-json` e combine esses quadros com
as faixas e nós da fonte. Verifique se muitas etapas compartilham a última coluna lógica
e usam valores grandes de `yOffset`. O Readable-v2 reserva espaço simétrico ao redor
dos deslocamentos. Com uma pilha vertical na mesma coluna, uma tela implícita e sem
marcadores absolutos de rota ou rótulo, ele mede cada faixa independentemente. Outros casos mantêm
a geometria de altura compartilhada por compatibilidade; consulte o
[contrato de medição de faixas](../renderers/workflow/README.md#readable-v2).

Quando a propriedade da fonte e a geometria explícita permitirem, redistribua as etapas
entre colunas lógicas e faixas significativas, mantendo o caminho principal monotônico.
Preserve todos os nós, relações, rótulos e verificações semânticas necessários. Se a propriedade
ou pinos absolutos impedirem o refluxo, relate essa restrição em vez de mesclar faixas
ou mover pinos automaticamente. Valide o JSON alterado, gere um HTML novo,
em seguida, execute novamente as verificações do navegador e inspecione a primeira tela; uma aprovação estática por si só
não garante o ajuste à janela de visualização. Estas são orientações de correção, não coordenadas garantidas.

### Sequência

Os participantes são ordenados de acordo com sua função na conversa. As mensagens mantêm sua própria ordem vertical. Use as variantes return/async/security para transmitir significado, não apenas como decoração; a sequência não utiliza o Automatic Port Spread. As arestas `from`/`to` de um segmento devem permanecer a pelo menos 4px de distância de cada seta de mensagem (`message.y`): uma aresta alinhada com uma seta impede que o leitor identifique a qual fase a mensagem pertence e gera relatórios de qualidade `sequence/segment-message-border-run`. O padrão mantém seu comportamento de aceitação existente.

Formato do primeiro rascunho: toda mensagem precisa de um `id`, `from`, `to`, `label` e um `y` inteiro de pelo menos 160. `from` e `to` devem ser participantes diferentes — mensagens para si mesmo não são suportadas (`sequence/self-message-unsupported`). Faixas de fase opcionais são `segments[]` com apenas `from`, `to` e `label` (sem `id` de segmento). Incorporar `pos`/`size` nos participantes falha na validação do esquema — a ordem por si só já os posiciona. Omita `meta.viewBox` para que a altura automática se ajuste à linha do tempo + legenda (faixa legível mínima de 327px) em vez de um limite mínimo fixo de 760px; assim, grupos de 2 a 3 participantes ficam abaixo do padrão de 920px quando os rótulos cabem (4 ou mais permanecem em 920px; rótulos longos ainda se alargam).

### Fluxo de dados

Os estágios expressam transformação ou custódia. As linhas separam fluxos paralelos. Atribua a cada fluxo um contrato de dados conciso ou um rótulo de movimento; escolha sua convenção visual usando os [padrões de criação de fluxo de dados](authoring-defaults.md#presentation-and-modes) exigidos.

Esboço inicial: declare `stages[]` (cada um como um `{label}`), depois posicione cada nó com `stage` e `row` inteiros — não `pos`/`size`. Os fluxos são `flows[]` com `from`, `to` obrigatórios e `label` não vazio.

Omita `meta.viewBox` para ajustar a largura da tela a todos os estágios e nós em qualquer perfil de qualidade,
incluindo larguras explícitas dos nós. A largura usa o conteúdo + preenchimento à direita de 24px
com um mínimo de 480px (cinco estágios padrão ainda precisam de ~1068); o estouro na borda esquerda
ainda requer um ajuste nos nós. Um viewBox definido pelo autor permanece fixo. O crescimento dos nós, a tipografia legível, a altura do conteúdo, as pontes de porta
e o posicionamento delimitado de rótulos se aplicam apenas quando a tela e todas as larguras dos nós são
omitidas. `--quality` substitui `meta.quality_profile`; sem ele, o renderizador
usa `ARCHIFY_QUALITY_PROFILE` quando definido; caso contrário, o perfil JSON.

### ERD

Trate um ERD de esquema tanto como um catálogo de tabelas quanto como um mapa de relações. Se o
esquema tiver mais de 8 tabelas ou 50 campos, trata-se de um mapa completo e denso do esquema: comece
com `meta.quality_profile: “standard”` para que a visibilidade completa dos campos não seja
sacrificada em troca de reparos repetidos na rota de exibição. Inclua todas as colunas físicas em
`attributes`, mantenha o tipo SQL de origem e preserve o
comentário em chinês do campo na string de tipo como `SQL_TYPE｜中文备注`, pois o
esquema não possui uma propriedade de comentário separada. O visualizador padrão exibe essas linhas no
nível `read`; não confie no hover/foco ou nos cartões para revelar campos físicos.
Os cartões podem explicar restrições, relações inferidas ou regras de domínio, mas nunca
substituem uma lista de campos.

Antes de posicionar as caixas, classifique as tabelas em domínios funcionais usando nomes de tabela
verificados, comentários, caminhos de módulos e o significado das chaves estrangeiras. Coloque o nome do domínio em
`tag` e atribua a cada domínio um retângulo sólido de células da grade: uma única linha, uma
única coluna ou um bloco retangular preenchido — não um L ou uma diagonal — com
cada célula do retângulo contendo uma de suas tabelas.
Todas as tabelas com a mesma tag permanecem juntas; não intercale tabelas não relacionadas
entre os membros. Um domínio que preencha um desses retângulos é desenhado como uma faixa rotulada
atrás de suas tabelas, de modo que o
agrupamento fique visível sem a necessidade de ler cada caixa;
uma tag cujas tabelas não preencham um retângulo não recebe nenhuma faixa e, como a faixa
é o único local onde o nome do domínio é desenhado, o renderizador reporta
`erd/domain-not-drawn` em vez de publicar um diagrama que não consiga nomear o
domínio. Coordenadas absolutas
não têm nenhuma célula da grade, portanto, uma tabela marcada sempre precisa de `row`/`col`.
Ordene as tabelas pai/principais
em direção ao limite compartilhado e
coloque seus filhos diretos ao lado ou abaixo delas. As colunas são lidas da esquerda para a direita e
as linhas, de cima para baixo; portanto, uma relação entre colunas vizinhas é um
corredor reto. Nunca coloque uma entidade não relacionada entre duas âncoras alinhadas;
o roteador pode contorná-la, mas o corredor livre é mais curto e facilita a
leitura. Uma tabela de junção tem dois pais: coloque-a em uma célula ao lado ou entre
ambos, não abaixo de um deles com tabelas empilhadas entre ela e a outra,
e mantenha todas as tabelas que compartilham sua tag de domínio em um retângulo contínuo de células. Uma relação deve conectar duas entidades diferentes; uma autorreferência, como `manager_id`, permanece como uma coluna de chave estrangeira (e, opcionalmente, um cartão), não como uma aresta `employees`→`employees`.
Use `row`/`col` para esse layout agrupado padrão e só use explicitamente
`pos`/`via` depois que um diagnóstico identificar um problema geométrico concreto.

Indique cada função-chave que uma coluna desempenha em `key` e as referências reais em
`references`. Uma coluna costuma desempenhar mais de uma função ao mesmo tempo — o
`tenant_id` de uma tabela de junção, por exemplo, faz parte tanto da chave primária quanto de uma chave estrangeira para `tenant.id` — portanto,
`key` aceita um papel ou uma lista (`[“pk”, “fk”]`), e excluir um papel representa uma restrição menor
do que a definida no esquema.
Um par muitos-para-muitos é um fato real do modelo; portanto, declare-o e identifique a tabela de junção
quando houver uma. Uma relação tem duas extremidades e cada uma declara seu próprio
máximo; assim, uma chave estrangeira `muitos`-para-`um` precisa tanto de `fromCardinality` quanto de
`toCardinality`; `fromOptional`/`toOptional` apenas reduz o mínimo dessa mesma extremidade
de um para zero (uma extremidade opcional `one` significa zero ou um, uma extremidade opcional `many`
significa zero ou muitos), e `identifying: false` desenha a linha tracejada não identificadora
e é responsável por esse traço — o esquema rejeita uma `variant` que desenharia a
relação contínua ao lado dela. A base se abre na direção da entidade que descreve, de modo que o
glifo desenhado indica o máximo da extremidade, não uma direção de deslocamento.

Um lado da tabela tem espaço limitado para um determinado número de extremidades: as portas se espalham, no máximo, a uma distância de `(extensão do lado
- 32) / (extremidades - 1)`, e um glifo de cardinalidade tem 14 unidades de altura. Se houver
mais extremidades de relação do que esse espaço permite, use `layout/marker-capacity`, que identifica
a tabela, o lado e as saídas — adicione campos para que o lado fique mais alto, espalhe
as relações ou reduza o número de entradas. Nunca corrija isso ocultando a cardinalidade.

Atribua uma coluna para cada domínio quando o modelo precisar ser visualizado inteiramente dentro da
janela de visualização de um laptop. O Reader dimensiona uma tela larga até a largura do leitor e
estreita uma tela alta até que a página inteira caiba; assim, as mesmas onze tabelas ocupam o mesmo
espaço de texto quando empilhadas como quatro domínios horizontais em vez de quatro verticais. Deixe um bloco inteiro da grade livre onde uma relação longa precise atravessar
um domínio: um trecho que atravessa uma célula ocupada força um desvio, e um desvio abaixo do
piso interior é uma falha de `composition/short-interior-segment`.

Uma tela automática é dimensionada de forma que a legenda padrão esteja sempre no conteúdo gerado,
e uma tela que o autor define com `meta.viewBox` informa sua capacidade de legenda
em vez de omitir a chave; consulte
[`../renderers/erd/README.md`](../renderers/erd/README.md) para o contrato de banda, porta e
leitor.

### Árvore

Uma árvore responde à pergunta “como isso é decomposto?”: uma raiz, e todos os outros nós nomeiam
exatamente um `pai`. Links significam apenas contenção; não use uma árvore para chamadas,
movimentação de dados ou dependências entre ramos. Nada é inferido: um
pai ausente (`tree/missing-parent`), zero ou várias raízes (`tree/root-count`), um
ciclo de pais (`tree/cycle`, que também abrange todos os nós presos abaixo dele)
e IDs duplicados são rejeitados. Os filhos são lidos na ordem de declaração.

Use `layout.direction: “down”` (padrão) para uma divisão rasa e equilibrada e
`“right”` para uma árvore profunda ou com muitas folhas, como um layout de repositório; uma árvore
para a direita alinha cada pai com seu primeiro filho e rola verticalmente no
visualizador. Os rótulos quebram entre as palavras. `collapsed: true` faz com que um ramo comece
colapsado no Visualizador; isso nunca remove conteúdo do artefato, e toda
exportação é a árvore completa. Para uma base de código real, ancore cada nó no
caminho observado e anexe `sources`. Consulte
[`../renderers/tree/README.md`](../renderers/tree/README.md).

### Classe

Um diagrama de classes explica os contratos dentro de um módulo: quais tipos existem,
quais membros são relevantes para a explicação e como os tipos se relacionam. Escolha os
membros necessários para a questão; um tipo pode não apresentar nenhum. Cada tipo indica seu `kind`
(`class`, `abstract`, `interface`, `enum`, `record`); todos os tipos, exceto `class`,
desenham sua palavra-chave UML, de modo que uma interface nunca é interpretada como uma classe vazia. Para uma
base de código real, fundamentem cada tipo, membro e relação em evidências do repositório e
anexem `fontes`.

Cada relação é representada como `de` -> `para` e seu `tipo` determina a notação:
`dependência` (`de` usa `para`, seta aberta tracejada), `associação` (`de` contém um
`para`, seta aberta contínua), `herança` (`de` estende `para`, triângulo oco
contínuo), `realização` (`de` implementa a interface `para`, triângulo oco
traçado), `composição` e `agregação` (`de` é o todo, losango preenchido ou
oco em `de`). A realização deve ter como alvo uma interface a partir de um
elemento que não seja uma interface; a herança não deve ultrapassar o limite da interface; um
ciclo de herança é rejeitado.

Posicione os tipos na grade `row`/`col` com os supertipos acima de seus subtipos. Duas
ou mais generalizações automáticas em um supertipo devem ser desenhadas como um único barramento de hierarquia
com um único triângulo. Os membros nunca são truncados: um tipo se expande até seu membro mais largo
até `layout.typeMaxW` e membros mais longos quebram nos limites dos parâmetros.
Consulte [`../renderers/class/README.md`](../renderers/class/README.md).

Estrutura da primeira versão: os tipos usam `row`/`col` (não `pos`/`size`), os campos ficam em
`attributes[]`, as operações em `methods[]` com `parameters` como uma única string, como
`“msg: Message”` (não um array de objetos). Os membros da enumeração são atributos com apenas
`name`. As relações precisam de um `id`, `from`, `to` e `kind`.

### Linha do tempo

Uma linha do tempo responde a “quando o quê aconteceu e com que intervalo?”. Cada evento
precisa de um `at` conforme a norma ISO 8601 com um deslocamento explícito `Z` ou `±HH:MM`; um carimbo de data/hora
sem esse deslocamento é rejeitado, em vez de ser estimado. `meta.timezone` (IANA, padrão
`UTC`) é o relógio de exibição para ticks e rótulos, e a legenda do eixo indica
isso. `meta.evidence` é obrigatório: `observed` para eventos registrados (logs, histórico do Git,
registros do pager) e `illustrative` para informações explicativas. Nunca marque
horários inventados ou aproximados como “observados” e nunca preencha lacunas com eventos que
a entrada não contenha.

Use `lanes` para fontes ou categorias (lançamento, monitoramento, resposta); cada
evento, então, indica uma delas. O texto visível de cada evento é `title` (não `label`). `kind`
(`default`, `change`, `alert`, `action`, `recovery`) apenas
colora o cartão; inventar valores como `milestone` falha na validação do esquema. Os eventos são desenhados em ordem cronológica, independentemente da ordem de criação;
eventos simultâneos e próximos são empilhados. Por padrão, um período de inatividade maior que 8×
o intervalo mediano e 10% do intervalo total é desenhado como uma quebra de largura fixa rotulada
com a duração omitida; `layout.breaks: “none”` mantém um eixo proporcional.
Consulte [`../renderers/timeline/README.md`](../renderers/timeline/README.md).

### Cascata

Uma cascata responde à pergunta “para onde foi o tempo?” para uma solicitação, tarefa ou execução de agente.
Cada intervalo possui `id`, `name`, `start` e `end` ou `duration` em
`meta.unit` (`us`, `ms`, `s`; padrão `ms`), além de `parent`, `status`,
`service` e `detail` opcionais. A posição e o comprimento da barra são determinados exclusivamente por esses números.
`meta.evidence` é obrigatório: `measured` apenas para tempos registrados (exportação de rastreamento,
logs, profiler, execução cronometrada); caso contrário, `illustrative`. Nunca infira uma duração
a partir da estrutura do código e nunca apresente números estimados como se fossem medidos.

Um intervalo sem fim registrado deve ter `status: “incomplete”`; ele é desenhado como um
limite inferior aberto até o último instante registrado. Fins/durações contraditórias,
um fim antes do início, um pai ausente ou um ciclo pai são rejeitados.
As porcentagens são sempre “do total do relógio de parede”; as durações de pai e filho
são inclusivas e nunca somadas. Não marque um caminho crítico ou tempo de espera
a menos que a entrada indique a dependência. Consulte
[`../renderers/waterfall/README.md`](../renderers/waterfall/README.md).

### Ciclo de vida

O Esquema v3 é o único contrato de ciclo de vida. `mainPath` lista o caminho normal a partir
do estado inicial; cada par consecutivo precisa de uma transição. O renderizador é responsável por
toda a geometria: o caminho principal é uma linha, as transições de volta a uma fase anterior
(ou avanços para a frente) tornam-se arcos acima dele, e todos os outros estados ficam abaixo do
estado do qual se ramificam, uma linha mais profunda a cada passo de distância do caminho principal.
Saídas equivalentes compartilham uma única seta somente quando seus rótulos, notas e variantes
coincidirem e exatamente um grupo de, no mínimo, duas fases do caminho principal se qualificar para
esse destino. Fases consecutivas recebem um quadro composto; fases não consecutivas
compartilham um barramento. Outras saídas permanecem separadas, incluindo notas distintas em
suas transições originais. Não remova nem copie notas para forçar o compartilhamento.
Não há faixas, colunas, tamanhos ou controles de roteamento. As tentativas de layout mantêm
o espaçamento mínimo do texto da transição e param de ampliar a linha do caminho principal quando sua
largura mínima excederia o limite original de legibilidade do texto; as verificações finais
de largura e espaçamento entre rótulos ainda se aplicam.

Mantenha o caminho principal para as fases que o leitor segue com, no máximo, cerca de seis estados,
e mantenha os rótulos de transição curtos. Uma falha recuperável requer uma transição real
de volta a um estado ativo; um cartão com a palavra “retry” não constitui topologia.

Escolha o `tipo` de cada estado com base no que o leitor deve perceber, já que a cor e o
símbolo no canto seguem esse tipo: `espera` para uma pausa relacionada a uma pessoa, tempo ou entrada;
`decisão` para uma revisão ou ponto de ramificação; `sucesso` ou `falha` para um resultado bom ou
ruim; `neutro` para estados em espera e resultados que não sejam nem um nem outro;
`externo` quando uma parte externa detém o trabalho; `ativo` nos demais casos. A partir de um
`stateDiagram` do Mermaid, `[*] -->` nomeia o primeiro estado do `mainPath`, um estado
com `--> [*]` é um resultado (`sucesso`, `fracasso` ou `neutro`; é desenhado como
final quando não possui outra transição de saída), e `<<choice>>` torna-se um
estado de `decisão`. Descomponha um `estado X { ... }` composto em seus estados internos
e repita sua saída de cada um deles com um único rótulo; fases consecutivas do caminho principal
que compartilham essa saída são enquadradas automaticamente. Regiões simultâneas (`--`)
não têm forma de ciclo de vida: desenhe um ciclo de vida por região.

## Evidências do repositório

Quando o diagrama precisar refletir o código real, verifique os pontos de entrada do repositório,
os limites de tempo de execução, o armazenamento, os transportes e a configuração de implantação antes
da elaboração. Registre apenas as evidências que você realmente verificou. `--repo-root <caminho>` é
aceito por `render`, `validate`, `deliver` e `preview` para todos os tipos de diagrama,
por `compare` de arquitetura e por `migrate` de fluxo de trabalho; todos os modos verificam `meta.repository` e
o nó `sources` da mesma maneira. A migração de um fluxo de trabalho baseado em fonte requer o mesmo
`--repo-root` para que seu candidato seja verificado antes de substituir o destino.
Nunca infira causalidade de tempo de execução apenas pela proximidade dos arquivos
ou pela nomenclatura.

Declare `meta.repository.url` e uma `revisão` completa de 40 caracteres; em seguida, anexe
`sources` à coleção de nós do modo (Arquitetura `components[]`, Fluxo de Trabalho
e Fluxo de Dados `nodes[]`, Sequência `participants[]`, Ciclo de Vida `states[]`) com
`path` relativo ao repositório, `line`, `end_line` e `label` opcionais.
A verificação lê blobs naquele commit, independentemente das edições na árvore de trabalho.
A verificação ignora referências de substituição locais do Git, incluindo aquelas selecionadas por
`GIT_REPLACE_REF_BASE`, e sempre lê os objetos originais no SHA fixado.
Ela não altera a configuração do repositório nem exclui referências de substituição.
Uma origem local correspondente, um commit disponível, um caminho delimitado,
um blob e um intervalo de linhas válido são necessários em todos os modos de link. A verificação é
local e não faz solicitações remotas; ela não estabelece disponibilidade pública
nem os direitos de acesso do leitor atual.

O `link_mode` tem como padrão `web`. As URLs de repositórios HTTPS do GitHub, Gitee e GitLab
geram links fixados por revisão; os hosts públicos github.com, gitee.com e
gitlab.com selecionam o provedor automaticamente. Os valores opcionais `provider: “github”`,
`“gitee”` ou `“gitlab”` devem corresponder a um host público. Um host GitLab autogerenciado
declara `provider: “gitlab”`; o Archify nunca entra em contato com o host para detectar
seu forge. As declarações existentes do GitHub e os campos padrão de confirmação de entrega
permanecem compatíveis.

URLs do GitLab podem nomear grupos aninhados (`grupo/subgrupo/projeto`). Links de fonte usam
`<url>/-/blob/<revisão>/<caminho>#L<linha>-<fim_da_linha>` e o link do repositório
usa `<url>/-/tree/<revisão>`. Uma fonte Markdown (`.md`, `.markdown`) com um
intervalo de linhas vincula-se à visualização simples (`?plain=1`), de modo que as linhas citadas sejam
destacadas em vez do documento renderizado. Os caminhos dos repositórios do GitLab são comparados
sem distinção entre maiúsculas e minúsculas, assim como no GitHub.

```json
{
  “url”: “https://gitee.com/team/service”,
  “revision”: “0123456789abcdef0123456789abcdef01234567”,
  “provider”: “gitee”
}
```

```json
{
  “url”: “https://git.example.com/platform/payments/service”,
  “revision”: “0123456789abcdef0123456789abcdef01234567”,
  “provider”: “gitlab”
}
```

Para uma plataforma interna ou não suportada, selecione `link_mode: “local-only”`. O
Visualizador mantém marcadores SRC, caminhos de arquivos pesquisáveis, intervalos de linhas e rótulos de revisão
sem hiperlinks para o repositório ou a fonte. O comprovante de evidência adiciona
`linkMode: “local-only”`. O campo `url` continua sendo obrigatório como identidade de origem esperada;
a opção “local-only” desativa os links, não a verificação de identidade. Um repositório sem uma
origem não é compatível.

```json
{
  “url”: “http://git.internal:3000/Platform/Services/service”,
  “revision”: “0123456789abcdef0123456789abcdef01234567”,
  “link_mode”: “local-only”
}
```

A opção “local-only” aceita endereços HTTP(S), `git@host:path` e `ssh://git@host[:port]/path`,
incluindo namespaces aninhados. Declare um endereço sem credenciais;
as credenciais HTTP(S) na origem do checkout são ignoradas para fins de identificação e
suprimidas dos diagnósticos. A comparação de nomes de host não diferencia maiúsculas de minúsculas; os caminhos dos repositórios
mantêm a distinção entre maiúsculas e minúsculas, exceto no GitHub e no GitLab. Uma barra final
é normalizada e removida. Apenas o GitHub, o Gitee e o GitLab (gitlab.com ou um host declarado
com `provider: “gitlab”`) normalizam um `.git` terminal e mapeiam o padrão
HTTPS/443 para Git SSH/22 no mesmo host; um endpoint SSH do GitLab em outro host
ou porta não é inferido. Para outros hosts, use o endereço de clonagem real:
o transporte, a porta, o sufixo `.git` e os caminhos relativos ao remoto versus absolutos devem
coincidir. Por exemplo, `git@host:Team/repo` difere de
`ssh://git@host/Team/repo`; `git@host:/Team/repo` corresponde ao último. Caminhos no estilo SCP
preservam os caracteres de escape de porcentagem literais, enquanto caminhos URI os decodificam. Aliases de host SSH
e prefixos de navegação/clonagem específicos do Forge não são adivinhados.
Links da web do Gitea/Forgejo/Bitbucket não estão implementados nesta versão;
use apenas links locais até que um provedor de links testado esteja disponível. Provedores de web desconhecidos
apresentam falha com um diagnóstico, em vez de gerar um link adivinhado.

## Fallback definido manualmente

Utilize apenas quando nenhum renderizador puder ser executado. Comece pelo arquivo `assets/template.html`, mantenha as classes CSS semânticas, preserve a estrutura SVG/acessibilidade embutida e execute a lista de verificação visual de entrega. Nunca introduza cores literais embutidas que quebrem a paridade entre os temas escuro e claro.

## Ícones de nós

Para diagramas específicos de domínio, defina um `icon` opcional nos componentes de arquitetura,
nos nós de fluxo de trabalho/fluxo de dados, nos participantes de sequência ou nos estados do ciclo de vida. Escolha
`calendar`, `clock`, `person`, `briefcase`, `flag` ou `moon` para conceitos cotidianos;
o catálogo completo (incluindo símbolos técnicos e de ciclo de vida existentes) está em
`common.schema.json#/$defs/nodeIcon`. Use `icon: “none”` para ocultar o símbolo de canto.
A omissão de `icon` mantém o padrão baseado no tipo; os estados de ciclo de vida `start`, `active` e
`neutral` têm como padrão a ausência de símbolo. Esses símbolos SVG embutidos são
de propriedade do renderizador e são exportados com o diagrama; URLs e SVG bruto não são aceitos.

A seleção do ícone altera apenas o símbolo do canto. O tipo do nó ainda determina
a cor e o agrupamento semântico; as marcas de identidade permanecem independentes. Para um
fluxo de trabalho de férias, combine `type: “backend”, icon: “calendar”` com
`meta.legend.entries.backend.label: “假期”` e use `icon: “briefcase”` mais
um rótulo de legenda apropriado para trabalho de reposição. Mantenha o rótulo do nó significativo:
os ícones são decorativos e ficam ocultos para tecnologias assistivas.

Consulte [planejamento de feriados](../examples/holiday-planning.workflow.json) para ver um exemplo completo de fluxo de trabalho.
