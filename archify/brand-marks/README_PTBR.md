# Marcas incorporadas

O Archify traz um catálogo limitado de 107 marcas comumente usadas para nós de arquitetura, fluxo de trabalho (workflow), sequência, fluxo de dados (data-flow) e ciclo de vida (lifecycle). A marca é uma identidade autoral opcional: ela nunca substitui o tipo semântico (`type`), a cor, o rótulo ou os relacionamentos do nó.

Sites desconhecidos são tratados por um fluxo de trabalho explícito em duas etapas. Execute `node bin/archify.mjs brands capture <url> --json` e, em seguida, defina o valor de `brand` vinculado ao digest retornado. Os comandos normais de renderização e validação não realizam capturas não vinculadas, e conteúdos alterados ou indisponíveis falham por segurança (fail-closed).

A maioria dos caminhos vetoriais e metadados de marcas são gerados a partir do Simple Icons 16.28.0. A marca da OpenAI é traçada de acordo com as diretrizes oficiais de marca da própria OpenAI. Cada entrada gerada registra sua fonte e, quando disponível na origem, suas diretrizes e metadados de licença em `renderers/shared/generated-brand-marks.mjs`.

Nomes de marcas e logotipos podem ser marcas registradas de seus respectivos proprietários. A licença CC0 do Simple Icons cobre o trabalho de sua coleção, não cada marca registrada ou obra de arte subjacente. Os colaboradores devem revisar a fonte registrada, as diretrizes de marca atuais e o uso referencial pretendido antes de adicionar ou atualizar uma marca. O Archify não sugere patrocínio, endosso ou parceria.

Edite `catalog.json` e, em seguida, gere novamente o pacote de dependência zero em tempo de execução (zero-runtime-dependency bundle) commitado:

```bash
npm run generate:brand-marks
npm run check:brand-marks
```

Não edite manualmente o arquivo `renderers/shared/generated-brand-marks.mjs`.
