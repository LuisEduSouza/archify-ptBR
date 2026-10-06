# Cache-miss request sequence

Use a habilidade Archify neste repositório para criar um diagrama de sequência para uma solicitação de painel. Um navegador chama uma API, a API valida o JWT e, em seguida, lê o Redis. O Redis retorna uma falha de cache; assim, a API consulta o PostgreSQL em busca de dados de perfil e métricas, armazena o resultado de volta no Redis, emite um rastreamento e retorna JSON para o navegador renderizar.

Elabore uma nova especificação de diagrama JSON tipado voltada para o perfil de qualidade `showcase`. Escolha seus próprios IDs internos estáveis e layout. Preserve a direção da mensagem e diferencie chamadas, retornos, verificações de segurança e emissão assíncrona de rastreamento. Use a CLI do Archify incluída no pacote para validar e corrigir a versão candidata quando houver acesso ao shell. O ambiente de teste externo validará de forma independente a versão candidata congelada.

Grave o candidato final exatamente no arquivo `benchmark-candidate.json` na raiz do repositório. Não edite nenhum outro arquivo. O arquivo candidato, e não a resposta em texto, é o artefato da tentativa 1. Não copie um exemplo já registrado. Não afirme que a validação foi aprovada.
