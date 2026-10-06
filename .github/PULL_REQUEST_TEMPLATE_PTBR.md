## Problema e valor

Qual problema do usuário isso resolve? Link the issue or showcase evidence when one exists.

## Escopo

- O que mudou:
- O que deliberadamente não mudou:
- Não há alterações não relacionadas: <!-- confirm or explain -->

## Impacto na estabilidade

- Risco de compatibilidade e migração:
- Risco relacionado ao renderizador, validador, pacote ou artefato gerado:
- Comportamento em caso de falha e caminho de reversão:

## Testes executados

Liste os comandos exatos e os resultados. Não escreva apenas “os testes foram aprovados”.

## Evidência visual

Não aplicável. (Esta alteração afeta apenas a lógica de backend não visual, validação de esquema e geração de artefatos do pipeline).

## Artefatos gerados

Nenhum arquivo gerado (como `archify.zip`., páginas do Gallery ou provas de README) precisou ser atualizado como parte deste PR, pois as definições em Markdown fonte e os templates de documentação estática permaneceram inalterados e atualizados.

## Checklist

- [ ] Usei uma alteração mínima e focada e mantive o comportamento do JSON tipado existente, a menos que o problema exigisse uma alteração de contrato.
- [ ] Executei os testes direcionados relevantes e o comando `npm test` em `archify/`.
- [ ] Adicionei ou atualizei um teste de regressão para alterações comportamentais.
- [ ] Verifiquei os artefatos gerados e a atualização do pacote quando suas fontes mudaram.
- [ ] Removi segredos, conteúdo de repositório privado e dados de clientes de fixtures e capturas de tela.
