export const convertTime = (r) => {
    return r > 0 ? (r >= 10 ? r : `0${r}`) : "00";
}

export const renderTime = (remainingTime) => {
    const hours = Math.floor(remainingTime / 3600);
    remainingTime -= hours * 3600;
    const minutes = Math.floor(remainingTime / 60);
    remainingTime -= minutes * 60;
    const seconds = remainingTime;
    const hrs = convertTime(hours); 
    const secs = convertTime(seconds); 
    const mins = convertTime(minutes);
    const timer_string = `${hrs} : ${mins} : ${secs}`;
    return timer_string;
};

export const a = 12345;