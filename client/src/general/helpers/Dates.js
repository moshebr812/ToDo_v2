export const formatDateTimeNoSec = 'dd-mmm-yyyy HH:MM';     // date + time but without seconds
export const formatDateOnly = 'dd-mmm-yyyy';                // date only
export const dateFormatForDatePicker = 'yyyy-mm-dd';        // date that complies with input type="date" datepikcer

export function convertDateFormat (inputDate, format) {
    // alert (inputDate + '/ ' + format);

    let myYear = inputDate.getFullYear();

    let myMonth = parseInt(inputDate.getMonth()) + 1;
    myMonth = (myMonth<10) ? '0'+myMonth : myMonth;
    
    let myCalendarDay = parseInt(inputDate.getDate());
    myCalendarDay = (myCalendarDay<10) ? '0'+myCalendarDay : myCalendarDay;

    let MyHour = parseInt(inputDate.getHours());
    MyHour = (MyHour<10) ? '0'+MyHour : MyHour;

    let MyMinute = parseInt(inputDate.getMinutes());
    MyMinute = (MyMinute<10) ? '0'+MyMinute : MyMinute;
    // console.log ('myDate = ' + myDate);
    // console.log ('myMonth = ' + myMonth);
    // console.log ('myCalendarDay = ' + myCalendarDay);

    if (format === 'SHORT_1') {
        // YYYY-MM-DD
        return ( myYear.toString() + '-' + myMonth + '-' + myCalendarDay );
    }

    if (format === 'FULL_1_NO_SEC') {
        // YYYY-MM-DD HH:MM
        return ( myYear.toString() + '-' + myMonth + '-' + myCalendarDay +' ' + MyHour + ":" + MyMinute);
    }

    // No format specified
    return inputDate; 
}
export default { 
    convertDateFormat,          // function
    formatDateTimeNoSec,        // format
    dateFormatForDatePicker,    // format
}