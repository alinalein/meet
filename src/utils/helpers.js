export function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    return formattedDate;
}
