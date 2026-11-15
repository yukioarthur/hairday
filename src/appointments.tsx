import { createContext, useContext, useState, type ReactNode } from 'react';

export const periods = [
  { name: 'Manhã', start: 9, end: 12 },
  { name: 'Tarde', start: 13, end: 18 },
  { name: 'Noite', start: 19, end: 21 },
] as const;

export const hourLabel = (hour: number) => String(hour).padStart(2, '0') + ':00';
export const slots = periods.flatMap(({ start, end }) =>
  Array.from({ length: end - start + 1 }, (_, index) => hourLabel(start + index)),
);

export type Appointment = { id: string; name: string; date: string; time: string };
type NewAppointment = Omit<Appointment, 'id'>;
type Agenda = {
  appointments: Appointment[];
  add: (appointment: NewAppointment) => void;
  remove: (id: string) => void;
};

const AppointmentContext = createContext<Agenda | null>(null);

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  function add(appointment: NewAppointment) {
    const entry = { ...appointment, id: crypto.randomUUID() };
    setAppointments((previous) =>
      previous.some(({ date, time }) => date === entry.date && time === entry.time)
        ? previous
        : [...previous, entry],
    );
  }
  function remove(id: string) {
    setAppointments((previous) => previous.filter((entry) => entry.id !== id));
  }
  return <AppointmentContext.Provider value={{ appointments, add, remove }}>
    {children}
  </AppointmentContext.Provider>;
}

export function useAppointments() {
  const agenda = useContext(AppointmentContext);
  if (!agenda) throw new Error('AppointmentProvider ausente');
  return agenda;
}
