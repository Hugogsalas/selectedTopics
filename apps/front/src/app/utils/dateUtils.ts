export const getDate = (dateNumber: number) => {
  const dateObject = new Date(dateNumber);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  return `${day < 9 ? '0' + day : day}/${month < 9 ? '0' + month : month}/${year}`;
}
