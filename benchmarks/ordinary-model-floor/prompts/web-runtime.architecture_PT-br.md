# Web runtime architecture

Use a habilidade Archify neste repositório para criar um diagrama de arquitetura para um aplicativo web em produção. Os usuários do navegador acessam por meio de uma CDN via HTTPS; em seguida, o tráfego chega a um balanceador de carga e a uma API do aplicativo. A API verifica a identidade com um provedor de autenticação, lê os dados do cache Redis, consulta um banco de dados primário PostgreSQL e enfileira tarefas em segundo plano para um worker. Os recursos estáticos são servidos a partir do armazenamento de objetos.

Elabore uma nova especificação de diagrama em JSON tipado, visando o perfil de qualidade `showcase`. Escolha seus próprios IDs internos estáveis e layout. Preserve as funções do sistema e as relações técnicas rotuladas. Use a CLI do Archify incluída no pacote para validar e corrigir a versão candidata quando houver acesso ao shell. O ambiente de teste externo validará de forma independente a versão candidata congelada.

Grave o candidato final exatamente no arquivo `benchmark-candidate.json` na raiz do repositório. Não edite nenhum outro arquivo. O arquivo candidato, e não a resposta em texto, é o artefato da tentativa 1. Não copie um exemplo já registrado. Não afirme que a validação foi aprovada.
