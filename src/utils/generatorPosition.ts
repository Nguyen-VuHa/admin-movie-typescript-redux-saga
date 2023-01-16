const generatorPosition = (min: number = 1, max: number = 10): number => {
    return Math.floor((Math.random())*(max-min+1))+min;
}       

const FIRT_STRING = 10;

const enCodeString = (str: string, arrHash: Array<string>) => {
    let _a = generatorPosition(1,5);
    let _b = generatorPosition(5,10);

    let strHash = '';

    strHash += [str.slice(0, 5).slice(0, _a), arrHash[0], str.slice(0, 5).slice(_a)].join('');
    strHash += [str.slice(5, 10).slice(0, _b), arrHash[1], str.slice(5, 10).slice(_b)].join('');

    if(str.length > 100) {
        let position = Math.floor((str.length - 20) / arrHash.length);

        str = str.slice(FIRT_STRING, str.length);

        let index = 0;
        for(let i = 1; i <= arrHash.length; i++) {
            let gnP = generatorPosition(index, i * position);
            strHash += [str.slice(index, i * position).slice(0, gnP), arrHash[i], str.slice(index, i * position).slice(gnP)].join('');
            index = i * position;

            if(i === arrHash.length) {
                strHash += str.slice(i * position, str.length);
            }
        }
        
    } else {
        let position = Math.floor((str.length - 20) / arrHash.length);
        let index = 0;
        for(let i = 1; i <= arrHash.length; i++) {
            let gnP = generatorPosition(index, i * position);
            strHash += [str.slice(index, i * position).slice(0, gnP), arrHash[i], str.slice(index, i * position).slice(gnP)].join('');
            index = i * position;

            if(i === arrHash.length) {
                strHash += str.slice(i * position, str.length);
            }
        }
    }
    
    return strHash;
}

export default enCodeString;