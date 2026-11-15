# HairDay

Agenda de salão em React, TypeScript e Vite, com CSS responsivo. O formulário cadastra atendimentos por cliente, data e horário. A agenda filtra por data, agrupa por período e permite excluir cada atendimento.



Teste: 
<img src="tests/hairday%20localhost.png" alt="Preview do HairDay" width="700" />


## Executar

Use Node.js 22.12 ou superior.

```powershell
npm.cmd install
npm.cmd run dev
```

## Build e testes

```powershell
npm.cmd run build
npx.cmd playwright install chromium
npm.cmd test
```

O teste cobre cadastro, bloqueio de horário ocupado, troca de data, exclusão e largura mobile. As capturas são geradas em `test-results` quando os testes rodam.

## Como funciona

- `AppointmentProvider` usa `useState` para guardar os agendamentos e os compartilha pela Context API. O estado dura enquanto a página está aberta.
- `BookingForm` e `PeriodList` recebem dados e callbacks por Props.
- `filter` seleciona o dia, `reduce` agrupa os registros por período e `map` renderiza horários e agendamentos.
- A referência de layout exportada do Figma está em [docs/hairy day.svg](docs/hairy%20day.svg).

## Validação local

- O build de produção passou com dependências disponíveis localmente. O acesso ao registry do npm falhou com `ENOTFOUND`, então a instalação limpa e a geração do lockfile seguem pendentes.
- Dois cenários passaram com a suíte local do Playwright no Chrome. Como o ambiente isolado bloqueou a conexão com o servidor de desenvolvimento, a verificação serviu os arquivos de `dist` por interceptação das requisições no navegador.
- [Captura desktop](docs/desktop.png) e [captura mobile](docs/mobile.png).
- Em 15/11/2026, o Playwright MCP acessou diretamente `http://localhost:5173/` e validou cadastro às 13h, filtro por outra data, retorno e exclusão. Resultados e limites em [docs/evidencias-mcp.md](docs/evidencias-mcp.md). O build foi executado novamente e passou; o console do navegador registrou 404 do favicon.
- A conferência do board no Notion e as evidências do Context7 MCP seguem pendentes.
