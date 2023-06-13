export const validDateValue = (date: string) => {
  const regex = /^(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1]) (20|21|22|23|[0-1]\d):([0-5]\d)$/;

  return regex.test(date);
};
