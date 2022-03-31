const timer = (deadline) => {
    const timers = document.querySelectorAll('.count-wrap') 
    timers.forEach(timer => {
        const timerDays = timer.querySelector('.count_1 > span');
        const timerHours = timer.querySelector('.count_2 > span');
        const timerMinutes = timer.querySelector('.count_3 > span');
        const timerSeconds = timer.querySelector('.count_4 > span');
        const text = timer.querySelector('.countdown-text');
    
        const getTimeRemaining = () => {
            const deadlineTime = new Date(deadline).getTime();
            const today = new Date().getTime();
            let timeRemaining = (deadlineTime - today) / 1000; // время до дедлайна в секундах
            let days = Math.floor( timeRemaining/60/60/24 );
            let hours = Math.floor( timeRemaining/60/60%24 );
            let minutes = Math.floor( timeRemaining/60%60 );
            let seconds = Math.floor( timeRemaining%60 );
            return {timeRemaining, days, hours, minutes, seconds};
        };
        const clearTimer = () => {
            text.innerHTML = `Акция закончилась!<div class="count-wrap">
            <div class="count count_1">Дней:</br> <span>00</span></div>
            <div class="count count_2">Часов:</br> <span>00</span></div>
            <div class="count count_3">Минут:</br> <span>00</span></div>
            <div class="count count_4">Секунд:</br> <span>00</span></div>
            </div>`;
            // timerDays.textContent = "00";
            // timerHours.textContent = "00";
            // timerMinutes.textContent = "00";
            // timerSeconds.textContent = "00";
        };
        const updateClock = () => {
            let getTime = getTimeRemaining();
            if (getTime.timeRemaining > 0) {
                if (String(getTime.days).length === 1) {
                    timerDays.textContent = "0" + getTime.days;
                } else {timerDays.textContent = getTime.days;}
    
                if (String(getTime.hours).length === 1) {
                    timerHours.textContent = "0" + getTime.hours;
                } else {timerHours.textContent = getTime.hours;}
    
                if (String(getTime.minutes).length === 1) {
                    timerMinutes.textContent = "0" + getTime.minutes;
                } else {timerMinutes.textContent = getTime.minutes;}
    
                if (String(getTime.seconds).length === 1) {
                    timerSeconds.textContent = "0" + getTime.seconds;
                } else {timerSeconds.textContent = getTime.seconds;}
            } else {
                clearInterval(idInterval);
                clearTimer();
            }
        };
        
        let getTime = getTimeRemaining();
        if (getTime.timeRemaining > 0) {
            updateClock();
            let idInterval = setInterval(updateClock, 1000);
        } else {
            clearTimer();
        }
    })
        
};
export default timer;