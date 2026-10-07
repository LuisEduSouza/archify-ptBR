# Contribuindo com o Archify

Obrigado por ajudar o Archify a tornar os diagramas de engenharia mais confiáveis e úteis. O Archify prioriza o Agente: as pessoas descrevem o sistema que desejam explicar, enquanto a Skill, o contrato JSON tipado, os renderizadores, os validadores e os recibos de entrega tornam o resultado reproduzível.

A estabilidade vem antes da quantidade de recursos. Uma pequena alteração com reprodução real, um contrato explícito e evidências do artefato final é mais fácil de revisar e mais segura de ser lançada do que uma reescrita abrangente.

## Escolha o caminho certo

- Encontrou um problema em um renderizador, validador, pacote ou visualizador? Use [o formulário de relatório de bug](.github/ISSUE_TEMPLATE/bug-report.yml).
- Criou um diagrama útil para o mundo real? Use [o formulário de destaque](.github/ISSUE_TEMPLATE/showcase.yml).
- Deseja alterar um esquema, contrato de renderizador, regra de validação, caminho de instalação, exportação ou outro comportamento do produto? Abra ou vincule uma issue antes de implementá-la. Chegue a um acordo primeiro sobre o valor para o usuário, os limites de compatibilidade e o que não se pretende alcançar.
- Encontrou uma vulnerabilidade de segurança? Siga [a política de segurança](SECURITY.md). Não publique detalhes de exploração nem segredos.

Pequenas correções na documentação e correções de teste de escopo restrito não exigem uma issue de planejamento. Grandes áreas da documentação, sim: prefira aprimorar a Skill canônica, o contrato, o diagnóstico ou o guia existente em vez de criar uma segunda explicação para o mesmo comportamento.

Não inclua segredos, tokens de acesso, credenciais, conteúdo de repositórios privados, dados pessoais ou dados de clientes em prompts, fixtures JSON, logs, capturas de tela, artefatos gerados ou testes de pacotes.

## Antes de escrever código

Comece a partir do `main` mais recente. Verifique-o novamente antes da revisão final: uma alteração simultânea pode já ter resolvido o problema ou alterado o contrato relevante. Um resultado de teste proveniente de uma base antiga não constitui evidência de integração.

Mantenha cada pull request focado em um único comportamento ou em uma parte da entrega intimamente relacionada. O PR deve indicar:

- o problema do usuário e a issue associada, quando houver;
- o que muda e o que deliberadamente não muda;
- compatibilidade e impacto na migração;
- comportamento em caso de falha e caminho de reversão;
- testes exatos e evidência do artefato final.

Pull requests em rascunho são bem-vindos para feedback técnico inicial. Marque o PR como “pronto” somente quando seu escopo estiver estável, ele estiver atualizado com o `main`, seus artefatos gerados forem intencionais e as verificações declaradas tiverem sido efetivamente executadas.

## Contratos de produto e compatibilidade

O comportamento público do Archify vai além de uma função de renderização. Trate-os como contratos:

- O JSON tipado do schema-v1 existente permanece válido, a menos que uma alteração revisada introduza explicitamente uma regra de quebra de compatibilidade e um caminho de migração.
- A geometria criada explicitamente, como `via`, rotas nomeadas, canais, lados e posicionamento de rótulos, permanece como referência, a menos que o contrato indique o contrário. Não reescreva silenciosamente a topologia ou a intenção definida.
- `standard` preserva ampla compatibilidade. Uma nova falha `showcase` deve identificar um defeito real e reparável, evitar rejeitar roteamentos necessários e retornar um diagnóstico estável e legível por máquina.
- Falhas voltadas para agentes devem constar em `diagnostics[]`: use um `code` estável, um `subject` preciso, uma `evidence` concreta e `supportedFixes` executáveis. Não exija que usuários comuns ou agentes tenham que extrair informações de textos descritivos dos logs.
- “Agente em primeiro lugar” não significa “sem documentação”. Significa um contrato canônico por comportamento. Crie um link para essa fonte em vez de copiar etapas da CLI em evolução, campos de recibos ou tabelas de códigos de erro para manuais paralelos.
- Um SVG válido não é automaticamente um bom diagrama. Geometria, texto projetado, ordem z, máscaras, interação, exportação e layout real do navegador podem falhar independentemente.

Se uma regra de validação refletir uma preferência pessoal em vez de critérios de correção, comece com uma indicação ou um aviso. Antes de transformá-la em um erro grave, teste exceções legítimas, como obstáculos, portas compartilhadas, roteamento explícito, limites aninhados e exemplos já registrados no sistema.

## Configuração local

O pacote do renderizador está localizado em `archify/` e é compatível com o Node.js 18 e versões posteriores. A integração contínua (CI) abrange o Node.js 18, 20, 22 e 24.

```bash
cd archify
npm ci
npm test
```

Durante o desenvolvimento, execute primeiro o teste relevante mais restrito e, em seguida, o conjunto completo de testes antes de solicitar a revisão final. Correções comportamentais devem incluir um teste de regressão com falha que demonstre o problema antes das alterações na implementação.

Teste o comportamento público por meio de uma interface compatível sempre que possível: `archify render`, `validate`, `deliver`, `visual-check` ou o SVG/HTML final. Testes auxiliares privados são úteis para casos extremos, mas não substituem um teste de regressão na CLI ou no nível do artefato.

## Evidências por tipo de alteração

### Renderizador, layout e validação

Inclua o menor JSON tipado e redigido possível que reproduza o comportamento. Verifique tanto a correção pretendida quanto as exceções plausíveis. No mínimo:

1. Execute os testes de regressão específicos.
2. Execute a versão candidata contra exemplos relevantes que foram check-in e fixtures de compatibilidade congelados.
3. Execute `npm test` a partir de `archify/`.
4. Para alterações visíveis, renderize o HTML final e execute `visual-check`.
5. Inspecione as capturas de tela geradas ou o HTML em um ambiente visual adequado.

Verificações estáticas de SVG/XML não podem comprovar a legibilidade na área de trabalho, a ordem de sobreposição, o posicionamento das fontes ou a interação. Quando o layout do leitor ou visualizador adaptativo mudar, execute o teste no navegador real com o Chrome disponível:

```bash
cd archify
ARCHIFY_CHROME="/path/to/chrome" node --test test/desktop-reader-browser.test.mjs
```

Um teste de navegador que foi ignorado porque o Chrome não estava disponível é **ignorado**, não aprovado. Relate as evidências automatizadas do navegador independentemente da revisão visual perceptiva. Siga o [contrato de entrega](archify/references/delivery-contract.md) ao registrar o trabalho manual suplementar no navegador; uma análise superficial sem restrições serve apenas para a revisão perceptiva.

### CLI, recibos e entrega

Preserve o comportamento de saída diferente de zero e os recibos legíveis por máquina. Um `validate` bem-sucedido não comprova a entrega atômica, e um `deliver` bem-sucedido não comprova a qualidade perceptiva. Siga [o contrato de entrega](archify/references/delivery-contract.md) e teste o estágio de falha que você alterou.

### Pacotes, plug-ins e versões

Os artefatos publicados devem ser reproduzíveis a partir do conteúdo do repositório rastreado.

- Nunca empacote recursivamente a árvore de trabalho ativa com um `cp`, `rsync` ou operação equivalente sem restrições.
- Use um caminho de preparação que contenha apenas arquivos rastreados e seja seguro para links simbólicos ou uma lista de permissões explícita.
- Adicione um teste negativo que comprove que um arquivo não rastreado e um link simbólico externo não possam entrar no arquivo.
- Teste o pacote extraído fora do repositório e, quando aplicável, em todos os hosts anunciados ou tipo de sistema operacional.
- Considere uma versão publicada como imutável. Se os bytes de um plugin ou de uma Skill visíveis ao host forem alterados, utilize a identidade da próxima versão acordada e mantenha todos os manifestos relevantes sincronizados. Não reutilize uma tag ou versão para conteúdos diferentes.

Não altere versões de lançamento, tags ou identidades de distribuição em um PR de recurso comum, a menos que a issue ou um mantenedor inclua explicitamente o trabalho de lançamento no escopo.

## Artefatos gerados

Revise o código-fonte e os testes antes de inundar um PR com resultados gerados. Regenerar apenas os artefatos cujas entradas oficiais tenham sido alteradas, de preferência uma vez após a aceitação da implementação.

A partir da raiz do repositório, os principais construtores são:

```bash
node scripts/build-gallery.mjs docs
node scripts/build-guide.mjs docs/guide.html
node scripts/build-start.mjs docs/start.html
node scripts/build-readme-showcase.mjs
scripts/build-zip.sh /tmp/archify-contrib.zip
```

O ambiente de execução segue a versão do Node especificada em `archify/package.json`, mas os bytes canônicos do contêiner `archify.zip` são compilados apenas com o Node 22. O compilador rejeita outras versões principais do Node, de modo que uma biblioteca zlib empacotada diferente não pode publicar uma segunda representação em bytes
do mesmo conteúdo do pacote.

Alterações no exemplo ou no visualizador incluídos normalmente exigem a recompilação da Galeria. Alterações no runtime da skill, no esquema, no renderizador ou no arquivo `SKILL.md` publicado exigem a verificação da atualidade do `archify.zip` e o commit de um arquivo recompilado quando o conteúdo do pacote registrado for diferente.

Alterações em exemplos incluídos ou no visualizador normalmente exigem a recompilação da Galeria. Alterações no tempo de execução da skill, no esquema, no renderizador ou no arquivo `SKILL.md` publicado exigem a verificação da atualidade do `archify.zip` e o envio de um arquivo recompilado quando o conteúdo do pacote registrado for diferente.

Liste todos os arquivos regenerados na descrição do PR. Não regenere HTML, GIFs, capturas de tela, manifestos ou arquivos não relacionados apenas para fazer com que o branch pareça atualizado. Os artefatos gerados são evidências e cargas úteis de entrega, não um substituto para a revisão da alteração no código-fonte.

## Correções de bugs

Um relatório de bug ou correção útil contém:

1. A versão exata do Archify ou o commit, o método de instalação, o comando e o ambiente.
2. O menor JSON digitado e editado que ainda reproduza a falha.
3. O recibo de validação completo legível por máquina ou o erro exato.
4. O comportamento esperado em comparação com o real.
5. Uma captura de tela do artefato final apenas quando o problema for visual.

Não substitua evidências determinísticas por uma captura de tela. Para defeitos visuais, mantenha tanto o resultado do validador quanto a evidência final renderizada.

## Envios para a vitrine da comunidade

Os casos apresentados na vitrine devem ser provas reproduzíveis, e não capturas de tela promocionais. Envie o prompt original, o agente/cliente, o modelo exato, a versão do Archify, o JSON digitado com partes ocultadas, o artefato, o comprovante de validação e o status verdadeiro da revisão visual por meio do arquivo `.github/ISSUE_TEMPLATE/showcase.yml`.

Os mantenedores podem solicitar um arquivo-fonte menor, refazer a validação ou recusar um caso que não possa ser publicado com segurança. A inclusão não é garantida. Os casos aceitos devem preservar a atribuição do autor e não devem ser apresentados como prova da qualidade do modelo sem um protocolo de benchmark controlado.

## Antes de solicitar a revisão

- Faça um rebase ou uma fusão com o `main` mais recente, resolva os conflitos de artefatos gerados recompilando a partir do código-fonte final e execute novamente as verificações afetadas.
- Preencha o arquivo `.github/PULL_REQUEST_TEMPLATE.md` com os comandos exatos e os resultados numéricos; não escreva apenas “testes aprovados”.
- Adicione ou atualize um teste de regressão para alterações de comportamento.
- Confirme se os exemplos públicos existentes e os fixtures de compatibilidade ainda se comportam conforme o esperado.
- Indique `revisão visual: aprovada`, `reprovada` ou `ignorada` de forma verdadeira para alterações visíveis.
- Confirme se a CI remota foi realmente executada no head atual. Verificações locais com resultado verde não significam que a CI do GitHub foi aprovada, e zero verificações não é considerado verde.
- Remova do diff arquivos não relacionados, saídas de depuração, caminhos locais, ruído gerado e dados confidenciais.

Os mantenedores podem solicitar que um PR de grande porte seja dividido ou reconstruído a partir do `main` atual quando artefatos gerados, histórico desatualizado ou implementações sobrepostas tornarem difícil revisar o comportamento com segurança.

## Licença

Ao contribuir, você concorda que sua contribuição é fornecida sob a [Licença MIT](LICENSE) do repositório. Envie apenas trabalhos que você tenha criado ou sobre os quais tenha o direito de contribuir.
