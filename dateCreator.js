var today = new Date();
var ss = today.getSeconds();
var mm = today.getMinutes();
var hh = today.getHours();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = mm+'-'+dd+'-'+yyyy+'T'+hh+'-'+mm+'-'+ss;

module.exports = today;