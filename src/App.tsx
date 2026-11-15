import { useState, type FormEvent } from 'react';
import { Scissors, Trash2 } from 'lucide-react';
import { AppointmentProvider, hourLabel, periods, slots, useAppointments, type Appointment } from './appointments';

function today() {
  const date = new Date();
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map((part) => String(part).padStart(2, '0')).join('-');
}

function BookingForm({ date, onDateChange }: { date: string; onDateChange: (date: string) => void }) {
  const { appointments, add } = useAppointments();
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');
  const occupied = new Set(appointments.filter((entry) => entry.date === date).map((entry) => entry.time));

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !date || !slots.includes(time) || occupied.has(time)) {
      setError('Informe o nome, a data e um horário disponível.');
      return;
    }
    add({ name: name.trim(), date, time });
    setName('');
    setTime('');
    setError('');
  }

  return <aside>
    <div className="brand"><Scissors size={22} aria-hidden="true" /> HairDay</div>
    <h1>Agende um atendimento</h1>
    <p>Selecione a data, o horário e informe o nome do cliente.</p>
    <form onSubmit={submit}>
      <label>Data do atendimento<input type="date" required value={date} onChange={(event) => {
        onDateChange(event.target.value);
        setTime('');
        setError('');
      }} /></label>
      <fieldset>
        <legend>Horários</legend>
        {periods.map(({ name, start, end }) => <div className="slot-group" key={name}>
          <span>{name}</span>
          <div className="slots">
            {slots.filter((slot) => slot >= hourLabel(start) && slot <= hourLabel(end)).map((slot) =>
              <button type="button" key={slot} disabled={occupied.has(slot)} aria-pressed={time === slot}
                onClick={() => setTime(slot)}>{slot}</button>
            )}
          </div>
        </div>)}
      </fieldset>
      <label>Cliente<input required maxLength={100} value={name} onChange={(event) => setName(event.target.value)} placeholder="Nome do cliente" /></label>
      {error && <p role="alert">{error}</p>}
      <button className="submit" type="submit">Agendar</button>
    </form>
  </aside>;
}

function PeriodList({ period, entries, onRemove }: {
  period: typeof periods[number]; entries: Appointment[]; onRemove: (id: string) => void;
}) {
  return <section className="period">
    <header><h3>{period.name}</h3><span>{hourLabel(period.start)} – {hourLabel(period.end)}</span></header>
    {entries.length ? <ul>{entries.map(({ id, time, name }) => <li key={id}>
      <time>{time}</time><span>{name}</span>
      <button type="button" aria-label={'Excluir agendamento de ' + name} onClick={() => onRemove(id)}>
        <Trash2 size={18} aria-hidden="true" />
      </button>
    </li>)}</ul> : <p>Nenhum agendamento neste período.</p>}
  </section>;
}

function Schedule() {
  const [date, setDate] = useState(today);
  const { appointments, remove } = useAppointments();
  const grouped = appointments.filter((entry) => entry.date === date)
    .sort((first, second) => first.time.localeCompare(second.time))
    .reduce<Record<string, Appointment[]>>((groups, entry) => {
      const period = periods.find(({ start, end }) => entry.time >= hourLabel(start) && entry.time <= hourLabel(end));
      if (period) (groups[period.name] ??= []).push(entry);
      return groups;
    }, {});

  return <div className="layout">
    <BookingForm date={date} onDateChange={setDate} />
    <main>
      <div className="agenda-heading">
        <div><h2>Sua agenda</h2><p>Consulte os atendimentos agendados por dia.</p></div>
        <label>Filtrar por data<input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
      </div>
      {periods.map((period) => <PeriodList key={period.name} period={period} entries={grouped[period.name] ?? []} onRemove={remove} />)}
    </main>
  </div>;
}

export default function App() {
  return <AppointmentProvider><Schedule /></AppointmentProvider>;
}
