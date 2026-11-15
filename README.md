# HairDay

Agenda de salão em React, TypeScript e Vite, com CSS responsivo. O formulário cadastra atendimentos por cliente, data e horário. A agenda filtra por data, agrupa por período e permite excluir cada atendimento.

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
- O layout atual é provisório. A conferência com o Figma oficial, as capturas e as evidências do Context7 MCP e Playwright MCP estão pendentes.
