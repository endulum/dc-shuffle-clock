let intervalID;

function countTime() {
    const now = new Date();
    const minute = parseInt(now.getMinutes());
    const second = parseInt(now.getSeconds());
    // checkTime(minute, second);
    printTime(minute, second);
}

// function checkTime(minute, second) {
//     if (second % 10 == 0) {
//         console.warn('multiple of ten');
//     }
// }

function printTime(minute, second) {
    if (minute < 10) minute = "0" + minute;
    if (second < 10) second = "0" + second;
    console.log(minute + ":" + second);
}

function start() {
    if (!intervalID) {
        countTime();
        intervalID = setInterval(countTime, 999);
    } else console.warn('clock is already started');
}

function stop() {
    if (intervalID) {
        clearInterval(intervalID);
        intervalID = null;
    } else console.warn('clock is already stopped');
}