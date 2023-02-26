export const handleDebounce = (callback: Function, timeOut: number = 1000) => {    
    return setTimeout(() => callback && callback(), timeOut);
}