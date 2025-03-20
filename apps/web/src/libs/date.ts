export const getContextualDate = (date: Date, locale: string) => {
  if (date.getFullYear() === new Date().getFullYear()) {
    return new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
    }).format(date);
  } else {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
    }).format(date);
  }
};
