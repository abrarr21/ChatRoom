export const time = (dateString: string) => {
  const date = new Date(dateString);
  const hours = AddZeroToSingleDigit(date.getHours());
  const minutes = AddZeroToSingleDigit(date.getMinutes());

  return `${hours}:${minutes}`;
};

const AddZeroToSingleDigit = (number: number) => {
  return number.toString().padStart(2, "0");
};
