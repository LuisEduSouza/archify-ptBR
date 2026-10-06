# Política de Segurança

O Archify aceita relatórios de segurança responsáveis. Por favor, relate suspeitas
de vulnerabilidades de forma privada para que os mantenedores possam investigar e coordenar
a correção antes da divulgação pública.

## Versões suportadas

O Archify está em desenvolvimento ativo. Por favor, relate vulnerabilidades que afetem
a versão estável mais recente ou o `main` atual.

Relatos que afetem versões mais antigas também são bem-vindos. Inclua a versão exata
ou o commit para que os mantenedores possam determinar o escopo afetado. Esta política
não garante manutenção ou backports para versões mais antigas.

## Como relatar uma vulnerabilidade

Utilize o sistema privado de relatório de vulnerabilidades do GitHub para este repositório quando essa
opção estiver disponível.

Inclua, quando disponível:

- a versão ou commit do Archify afetada;
- o método de instalação, sistema operacional, versão do Node.js e
  host ou agente relevante;
- o comando, componente ou ponto de entrada afetado;
- uma reprodução mínima ou prova de conceito;
- o impacto na segurança e as condições necessárias para reproduzi-la;
- uma sugestão de mitigação ou solução alternativa, se conhecida.

Utilize uma reprodução mínima e com informações ocultadas. Não publique detalhes de exploração,
credenciais, tokens de acesso, segredos, conteúdo de repositórios privados, dados pessoais
ou dados de clientes em issues públicas, discussões, pull requests, logs,
capturas de tela, artefatos gerados ou testes de pacotes.

Caso não haja um canal privado para relatar vulnerabilidades, abra uma solicitação pública pedindo
aos mantenedores um contato privado de segurança. Não inclua detalhes da vulnerabilidade
nessa solicitação.

## Divulgação coordenada

Mantenha os detalhes da vulnerabilidade em sigilo enquanto o relatório estiver sendo avaliado
e, quando aplicável, enquanto uma correção estiver sendo preparada.

Coordene a divulgação pública com os mantenedores por meio do canal privado de
relato, para que os usuários afetados possam receber orientações precisas sobre como resolver o problema.

## Bugs não relacionados à segurança

Use [o formulário de relatório de bug](.github/ISSUE_TEMPLATE/bug-report.yml) para
defeitos funcionais, de renderização, validação, compatibilidade, empacotamento ou documentação
que não causem impacto na segurança.

Se você não tiver certeza se uma descoberta é sensível à segurança, relate-a de forma privada.
