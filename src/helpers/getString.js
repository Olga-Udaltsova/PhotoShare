export function getString(num = 100, str = "лайк") {
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

export function getStringOfFollowers(num = 100) {
  switch (true) {
    case num === 0:
    case num >= 5 && num <= 20:
      return `${num} подписок`;
    case num === 1:
    case num % 10 === 1:
      return `${num} подписка`;
    case num % 10 === 0:
    case num % 10 >= 5 && num % 10 <= 9:
      return `${num} подписок`;
    case num % 10 >= 2 && num % 10 <= 4:
      return `${num} подписки`;
    default:
      return `${num} подписки`;
  }
}
