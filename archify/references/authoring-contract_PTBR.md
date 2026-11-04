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


