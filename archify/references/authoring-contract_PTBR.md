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


