const moment = require('moment');

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

exports.validateRow = (row) => {
    if (!row[0]) {
        return "invalid Region";
    } else if (!row[1]) {
        return "invalid Country";
    } else if (!row[2]) {
        return "invalid Item Type";
    } else if(!row[3]) {
        return "invalid Sales Channel";
    } else if(!row[4]) {
        return "invalid Order Priority";
    } else if(!row[5] || !moment(row[5], "M/D/YYYY").isValid()) {
        return "invalid Order Date";
    } else if(!row[6] || !Number.isInteger(Number(row[6]))) {
        return "invalid Order ID";
    } else if(!row[7] || !moment(row[7], "M/D/YYYY").isValid()) {
        return "invalid Ship Date";
    } else if(!row[8] || !Number.isInteger(Number(row[8]))) {
        return "invalid Units Sold";
    } else if(!row[9] || isNaN(parseFloat(row[9]))) {
        return "invalid Unit Price";
    } else if(!row[10] || isNaN(parseFloat(row[10]))) {
        return "invalid Unit Cost";
    } else if(!row[11] || isNaN(parseFloat(row[11]))) {
        return "invalid Total Revenue";
    } else if(!row[12] || isNaN(parseFloat(row[12]))) {
        return "invalid Total Cost";
    } else if(!row[13] || isNaN(parseFloat(row[13]))) {
        return "invalid Total Profit";
    }
    return true;
}
