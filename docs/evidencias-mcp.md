# Evidências — Playwright MCP

Fluxo executado em 15/11/2026, entre 22:51 e 22:52 UTC (19:51–19:52 em São Paulo).

## Ambiente e método

- Endereço acessado: `http://localhost:5173/`, título `HairDay`.
- Servidor Vite confirmado pela presença de `/@vite/client` no documento.
- Viewport observado: 1036 × 647 px.
- Ferramentas efetivamente usadas: Playwright MCP (`browser_navigate`, `browser_fill_form`, `browser_click`, `browser_snapshot`, `browser_console_messages` e `browser_evaluate`).
- Interações realizadas na interface, na mesma página e sem recarregamento. As verificações abaixo usam os snapshots de acessibilidade retornados pelo MCP. Não houve interceptação de requisições nem substituição por arquivos de `dist`.

## Fluxo observado

| Etapa | Ação | Evidência observada no snapshot | Resultado |
| --- | --- | --- | --- |
| Estado inicial | Abrir o Vite | Data do atendimento e filtro em `2026-11-15`; Manhã, Tarde e Noite com “Nenhum agendamento neste período.” | Passou |
| Cadastro às 13h | Preencher Cliente com `Cliente Evidência MCP`, clicar `13:00` e `Agendar` | Filtro em `2026-11-15`; lista de Tarde com `13:00`, `Cliente Evidência MCP` e botão `Excluir agendamento de Cliente Evidência MCP`. Horário `13:00` desabilitado no formulário. | Passou |
| Outra data | Preencher `Filtrar por data` com `2026-11-16` | Ambos os campos de data mostram `2026-11-16`; os três períodos exibem “Nenhum agendamento neste período.”; cliente ausente da agenda e `13:00` disponível. | Passou |
| Retorno | Preencher o filtro com `2026-11-15` | Registro `13:00 — Cliente Evidência MCP` reaparece em Tarde com seu botão de exclusão; `13:00` volta a ficar desabilitado. | Passou |
| Exclusão | Clicar `Excluir agendamento de Cliente Evidência MCP` | Filtro permanece em `2026-11-15`; cliente e botão de exclusão desaparecem; Tarde volta a “Nenhum agendamento neste período.”; `13:00` disponível novamente. | Passou |

O retorno à data original confirmou que filtrar por outra data preservou o registro no estado em memória. Ao final, o registro criado neste teste foi excluído.

## Console e limites

O MCP registrou um erro de recurso: `GET http://localhost:5173/favicon.ico` com HTTP 404. Também exibiu a sugestão informativa do React DevTools; nenhum warning foi reportado. O fluxo solicitado foi concluído apesar do favicon ausente.

Esta execução cobre o fluxo acima no viewport informado. Mobile, navegação por teclado, Context7, board do Notion e comparação com o Figma não foram verificados nesta rodada. Os testes locais anteriormente descritos no README são verificações separadas.

## Compilação

`npm.cmd run build` passou (`tsc --noEmit && vite build`, Vite 7.3.7, 1943 módulos transformados). A primeira tentativa foi bloqueada por acesso negado do esbuild no isolamento; a repetição autorizada fora do isolamento concluiu com código 0.

## Context7 MCP

Consultas executadas em 15/11/2026. A chamada `resolve_library_id` buscou `React` com a consulta «Official React documentation useState, createContext and useContext». O retorno identificou `/reactjs/react.dev` como o site oficial de documentação.

| Chamada `query_docs` para `/reactjs/react.dev` | Retorno resumido | Referência retornada |
| --- | --- | --- |
| How does React useState accept a functional updater based on previous state for immutable array updates? | O setter aceita uma função pura que recebe o estado pendente e calcula o próximo. O exemplo cria um novo array com espalhamento. No HairDay, o Provider usa esse formato para adicionar e remover registros. | [useState](https://github.com/reactjs/react.dev/blob/main/src/content/reference/react/useState.md) |
| How do createContext, a context Provider, and useContext work together to share state with descendant components? | `createContext` cria o contexto, o Provider fornece seu valor e `useContext` lê o valor do Provider correspondente mais próximo acima na árvore. O HairDay disponibiliza agenda, cadastro e exclusão por meio de `AppointmentProvider` e `useAppointments`. | [createContext](https://github.com/reactjs/react.dev/blob/main/src/content/reference/react/createContext.md) e [useContext](https://github.com/reactjs/react.dev/blob/main/src/content/reference/react/useContext.md) |
