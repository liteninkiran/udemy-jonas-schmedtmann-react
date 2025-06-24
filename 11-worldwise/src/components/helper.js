const defaultFormat = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
};

export const formatDate = (date, format) =>
    new Intl.DateTimeFormat('en', format ?? defaultFormat).format(
        new Date(date)
    );
