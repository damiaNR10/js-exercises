function slowRand(n, onSuccess, onError, ms = 1000) {
    if(n < 1) {
        setTimeout(() => onError(new Error("n has to be greater than 1")), ms);
    } else {
        // setTimeout(() => onSuccess(Math.floor(Math.random() * n) + 1), ms);
        setTimeout(() => onSuccess(-6), ms);
    }
}

function makeOdd(n, onSuccess, onError, ms = 100) {
    if(n < 0) {
        setTimeout(() => onError(new Error("n can't be negative"), ms));
    } else {
        setTimeout(() => onSuccess((n % 2 === 0) ? n : n + 1, ms));
    }
}

//slowRand(6, (result)=>{console.log(result)}, () => {console.log('Error handled')});
//makeOdd(6, (result)=>{console.log(result)}, () => {console.log('Error handled')});
//slowRand(6, 
    //(randResult) => makeOdd(randResult, 
        //(oddResult) => console.log(oddResult), 
        //() => console.log('odd error handled')), 
    //() => console.log('rand error handled')
//);

//Stwórz funkcję sleep(ms, onSuccess, onError) która ma uruchomić callback onSuccess po wybranej ilości milisekund, 
//chyba że użytkownik zażąda mniej niż 5 a więcej niż 4000. W takim przypadku ma uruchomić callback onError.

function sleep(ms, onSuccess, onError) {
    if (ms > 5 && ms < 4000) {
        setTimeout(() => onSuccess(ms), ms);
    } else {
        setTimeout(() => onError(new Error("ms must be between 5 and 4000"), ms));
    }
}

//sleep(3, (ms) => console.log(ms), (ms) => console.log(ms))