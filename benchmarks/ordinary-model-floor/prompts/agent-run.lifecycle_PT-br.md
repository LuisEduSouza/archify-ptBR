# Agent-run lifecycle

Utilize a habilidade Archify neste repositório para criar um diagrama de ciclo de vida de uma execução de agente. Mostre as principais fases ordenadas, desde a fila até o planejamento, execução, revisão e conclusão. A execução pode ser pausada para aprovação humana ou falhar de forma recuperável. A revisão pode ficar bloqueada enquanto aguarda entradas. Uma execução bloqueada pode expirar, e uma aprovação em espera pode ser cancelada pelo usuário. As saídas finais devem permanecer distintas dos estados ativos e em espera.

Elabore uma nova especificação de diagrama em JSON tipado, visando o perfil de qualidade `showcase`. Escolha seus próprios IDs internos estáveis e layout. Mantenha legíveis as atividades em andamento, interrupções, recuperação e resultados finais. Use a CLI do Archify incluída no pacote para validar e corrigir o candidato quando houver acesso ao shell. O harness externo validará de forma independente o candidato congelado.

Grave o candidato final exatamente no arquivo `benchmark-candidate.json` na raiz do repositório. Não edite nenhum outro arquivo. O arquivo candidato, e não a resposta em texto, é o artefato da tentativa 1. Não copie um exemplo já registrado. Não afirme que a validação foi aprovada.
