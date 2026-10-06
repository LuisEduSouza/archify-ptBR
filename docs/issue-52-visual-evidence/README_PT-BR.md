Aceitação visual da Issue #52

Status da revisão no navegador: aprovado em 2026-08-02 com o Google Chrome headless em
1280px de largura. Os fixtures de origem são as duas reproduções da Issue #52.
“Antes” foi renderizado a partir de origin/main@a097c2d63eceeff9603a911a9075f0694d381f83;
“depois” foi renderizado a partir deste worktree.



Reprodução

Escuro

Claro

Resultado

Dataflow somente com o padrão

antes / depois

antes / depois

Depois mostra apenas data flow; as afirmações de PII, assíncrono, destaque e armazenamento de dados estão ausentes.

Ciclo de vida início → ativo → sucesso

antes / depois

antes / depois

Depois mostra start, active state e terminal success; espera e falha estão ausentes.

Os resultados do navegador em formato legível por máquina também confirmam zero
exceções de execução/chamadas a console.error, limites dentro do viewBox, funções interativas exatas
e nomes acessíveis, propagação de rótulos personalizados, tipos não utilizados forçados apenas
visualmente, ausência de sobreposição em rótulos longos e mistos e remoção completa do modo oculto.
O gate do navegador npm run test:webm também testa a navegação de teclado com roving,
contagens e seleção, limpeza canônica de SVG, comportamento de impressão/incorporação,
visualizações guiadas e a matriz Classic/Signal Flow/Blueprint/Editorial × escuro/claro.
Seu fixture de Dataflow comprova que um nó de banco de dados real expõe um botão
data store com contagem 1, enquanto a entrada adjacente da variante de fluxo permanece
apenas visual;a tecla Enter abre o Semantic Lens no tipo estável database e a exportação canônica
remove a decoração da ponte.

Verificações realizadas em ambos os temas:

rótulos e amostras da legenda estão visíveis, alinhados e dentro do SVG;

não há sobreposição ou corte de rótulos, nem região de legenda vazia inesperada;

a geometria de nós, estados, transições, etapas e fluxos permanece inalterada;

não há falha de renderização visível no navegador em nenhum dos dois temas.

Os PNGs são artefatos de evidência determinísticos; o HTML gerado não foi incluído no repositório
porque já é coberto pelos testes públicos do renderizador e sua inclusão duplicaria o runtime
completo do visualizador oito vezes.
