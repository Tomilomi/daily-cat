function dateDayNumber(date) {
    const start = new Date(date.getFullYear(), 0, 0); // 0 = 31 de diciembre del año anterior
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}


export default dateDayNumber