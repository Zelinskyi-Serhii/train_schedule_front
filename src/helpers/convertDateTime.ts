export const convertDateTime = (dateTime: string) => {
  const [datePart, timePart] = dateTime.split("T");
  const timeWithoutMilliseconds = timePart.replace(/\.\d+Z$/, '').slice(0, -3);
  const [, month, day] = datePart.split("-");

  return `${month}-${day} ${timeWithoutMilliseconds}`;
};
