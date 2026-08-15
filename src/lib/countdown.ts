export type RemainingTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
};

const MS_SECOND = 1000;
const MS_MINUTE = MS_SECOND * 60;
const MS_HOUR = MS_MINUTE * 60;
const MS_DAY = MS_HOUR * 24;

export function getRemainingTime(
  targetDate: Date,
  now: Date = new Date(),
): RemainingTime {
  const totalMs = Math.max(0, targetDate.getTime() - now.getTime());

  const days = Math.floor(totalMs / MS_DAY);
  const hours = Math.floor((totalMs % MS_DAY) / MS_HOUR);
  const minutes = Math.floor((totalMs % MS_HOUR) / MS_MINUTE);
  const seconds = Math.floor((totalMs % MS_MINUTE) / MS_SECOND);

  return { days, hours, minutes, seconds, totalMs };
}

export function formatCountdownAriaLabel(remaining: RemainingTime): string {
  const parts: string[] = [];

  if (remaining.days > 0) {
    parts.push(
      `${remaining.days} ${remaining.days === 1 ? "dia" : "dias"}`,
    );
  }

  parts.push(
    `${remaining.hours} ${remaining.hours === 1 ? "hora" : "horas"}`,
    `${remaining.minutes} ${remaining.minutes === 1 ? "minuto" : "minutos"}`,
    `${remaining.seconds} ${remaining.seconds === 1 ? "segundo" : "segundos"}`,
  );

  return `Faltam ${parts.join(", ")}`;
}

export function padCountdownUnit(value: number): string {
  return String(value).padStart(2, "0");
}
