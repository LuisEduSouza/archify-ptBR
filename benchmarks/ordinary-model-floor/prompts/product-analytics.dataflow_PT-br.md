# Product analytics data flow

Utilize a habilidade Archify neste repositório para criar um diagrama de fluxo de dados para análise de produtos. Clientes web e móveis enviam eventos para uma API de ingestão de borda. O consentimento é verificado antes que os dados de identidade entrem em um cofre protegido de PII. Os eventos aceitos entram em um fluxo, tornam-se fatos normalizados no data warehouse e alimentam painéis. Os dados agregados do data warehouse também alimentam um feature store e um modelo.

Elabore uma nova especificação de diagrama JSON tipado visando o perfil de qualidade `showcase`. Escolha seus próprios IDs internos estáveis e layout. Torne o limite de privacidade e o caminho de identidade restrito visualmente distintos do caminho de análise comum. Use a CLI do Archify incluída no pacote para validar e corrigir o candidato quando o acesso ao shell estiver disponível. O harness externo validará de forma independente o candidato congelado.

Grave o candidato final exatamente no arquivo `benchmark-candidate.json` na raiz do repositório. Não edite nenhum outro arquivo. O arquivo candidato, e não a resposta em texto, é o artefato da tentativa 1. Não copie um exemplo já registrado. Não afirme que a validação foi aprovada.
