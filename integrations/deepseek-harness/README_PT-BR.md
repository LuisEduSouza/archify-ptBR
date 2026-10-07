@tt-a1i/archify-dsh

Integração comunitária do DeepSeek Harness para Archify. Este não é um produto oficial da DeepSeek e não implica qualquer endosso por parte da DeepSeek.

A versão v0.1.0 oferece compatibilidade experimental com a versão de prévia para desenvolvedores @deepseek-ai/dsh@0.1.0-rc.6 no Node.js ^22.19.0 || >=24.0.0. Isso não representa uma garantia de compatibilidade estável entre diferentes versões.

O pacote é um conjunto composto apenas por uma Skill: ele insere um único provedor de Skill do sistema de arquivos chamado archify-plugin e disponibiliza o snapshot do Archify 2.14 lançado com este pacote. Ele não registra ferramentas nativas de renderização/validação/entrega, um cliente Web personalizado, a interface de Arquivos Produzidos, telemetria, acesso à rede, gerenciamento de credenciais, serviços em segundo plano ou hooks prepare / install / postinstall.

A manutenção das versões lançadas é imutável: reconstruir a versão 0.1.0 lê seu conteúdo a partir da tag archify-dsh-v0.1.0. Alterações posteriores no Archify, incluindo o notificador de atualizações integrado, são intencionalmente excluídas até que uma versão do DSH, autorizada separadamente, receba uma nova versão.

Instalação

Use o pacote npm pré-compilado com uma versão específica. Não instale a partir do código-fonte do Git.

dsh plugin --profile web add @tt-a1i/archify-dsh@0.1.0

Uso

Peça ao DSH para carregar o Archify pelo nome:

Use a skill archify para mapear a arquitetura de execução deste repositório.
Mostre de 8 a 12 componentes principais, um caminho principal, dependências externas e limites de confiança.
Coloque os detalhes complementares em cartões em vez de adicionar mais conexões.
Após a entrega, retorne os caminhos exatos no workspace do JSON de especificação e do artefato HTML.

O Archify, então, é executado pelos caminhos normais de Skill, shell e sistema de arquivos do DSH. Os arquivos JSON e HTML gerados são arquivos normais do workspace.

Limitação dos Arquivos Produzidos

Os arquivos criados por comandos shell não aparecem automaticamente na faixa "Arquivos Produzidos da Web". Peça ao agente para fornecer os caminhos exatos no workspace do JSON de especificação e do artefato HTML e, em seguida, abra esses arquivos a partir do workspace.

Desinstalação

dsh plugin --profile web remove @tt-a1i/archify-dsh

O comando padrão do plugin remove a dependência do adaptador e a camada do pacote. O perfil base continua utilizável.

Postura de segurança

Sem telemetria, cliente de rede, gerenciamento de credenciais ou serviço em segundo plano

Sem scripts prepare, install ou postinstall

O código do adaptador carregado pelo host não gera processos nem abre um segundo caminho de permissões

Erros de resolução do pacote, carregamento do provedor e composição falham durante a inicialização normal do DSH
