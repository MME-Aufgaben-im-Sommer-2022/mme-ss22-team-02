/**
 *
 * @param {Date} date
 */
export function formatDate(date){

    let minutes = date.getMinutes();
    if(minutes < 10) {
        minutes = "0"+ minutes;
    }
    let month = date.getMonth()+1;

    if(month < 10) {
        month = "0"+ month;
    }

    return `${date.getHours()}:${minutes} ${date.getDate()}.${month}.${date.getFullYear()}`;
}
