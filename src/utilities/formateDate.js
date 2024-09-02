export function formatDate(dateString) {
    // Create a new Date object from the provided dateString
    const date = new Date(dateString);

    // Array of month names in Uzbek
    const uzbekMonths = [
        'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
        'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
    ];

    // Get the day, month, and year from the date object
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
    const month = uzbekMonths[date.getMonth()]; // Get month name in Uzbek
    const year = date.getFullYear();

    // Return the formatted date string
    return `${day} ${month} ${year}`;
}
