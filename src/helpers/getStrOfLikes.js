export function getStrOfLikes(num = 100) {
  const str = "лайк";
  switch (true) {
    case num === 0:
    case num >= 11 && num <= 20:
      return `${num} ${str}ов`;
    case num === 1:
    case num % 10 === 1:
      return `${num} ${str}`;
    case num % 10 >= 2 && num % 10 <= 4:
      return `${num} ${str}а`;

    default:
      return `${num} ${str}ов`;
  }
}
