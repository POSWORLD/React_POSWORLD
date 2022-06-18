function changeTime(timestamp) {

  let d = new Date(timestamp), // Convert the passed timestamp to milliseconds
    yyyy = d.getFullYear(),
    mm = ("0" + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
    dd = ("0" + d.getDate()).slice(-2), // Add leading 0.
    hh = d.getHours(),
    min = ("0" + d.getMinutes()).slice(-2), // Add leading 0.
    time;


   if (hh < 10) hh = '0' + hh;

   // ie: 2013-02-18, 8:35 AM
   time = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min;

   return time;
}

export default changeTime;
