export const formatTime = (dateString: string | null) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleString();
};

export const formatSeconds = (seconds: number) => {
  if (seconds < 60) return `${seconds} ${seconds === 1 ? "second" : "seconds"}`;

  const mins = Math.floor(seconds / 60);
  const second = seconds % 60;

  if (second > 0) {
    return `${mins} ${mins === 1 ? "minute" : "minutes"} and ${second} ${second === 1 ? "second" : "seconds"}`;
  }

  return `${mins} ${mins === 1 ? "minute" : "minutes"}`;
};
