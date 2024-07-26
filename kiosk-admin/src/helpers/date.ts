export function formatLongDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("id-ID", options).format(date);
}

export const getStartOfMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

  const startDay = lastDayOfMonth === 31 ? 2 : 1;

  return new Date(year, month, startDay).toISOString().split("T")[0];
};

export const getToday = () => {
  return new Date().toISOString().split("T")[0];
};
