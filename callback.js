//Asynchroniczne funkcje z wykorzystaniem Callback
// function slowRand(n, onSuccess, onError, ms = 1000) {
//     if(n < 1) {
//         setTimeout(() => onError(new Error("n has to be greater than 1")), ms);
//     } else {
//         // setTimeout(() => onSuccess(Math.floor(Math.random() * n) + 1), ms);
//         setTimeout(() => onSuccess(-6), ms);
//     }
// }

// function makeOdd(n, onSuccess, onError, ms = 100) {
//     if(n < 0) {
//         setTimeout(() => onError(new Error("n can't be negative"), ms));
//     } else {
//         setTimeout(() => onSuccess((n % 2 === 0) ? n : n + 1, ms));
//     }
// }

// //slowRand(6, (result)=>{console.log(result)}, () => {console.log('Error handled')});
// //makeOdd(6, (result)=>{console.log(result)}, () => {console.log('Error handled')});
// //slowRand(6, 
//     //(randResult) => makeOdd(randResult, 
//         //(oddResult) => console.log(oddResult), 
//         //() => console.log('odd error handled')), 
//     //() => console.log('rand error handled')
// //);

// //Stwórz funkcję sleep(ms, onSuccess, onError) która ma uruchomić callback onSuccess po wybranej ilości milisekund, chyba że użytkownik zażąda mniej niż 5 a więcej niż 4000. W takim przypadku ma uruchomić callback onError.

// function sleep(ms, onSuccess, onError) {
//     if (ms > 5 && ms < 4000) {
//         setTimeout(() => onSuccess(ms), ms);
//     } else {
//         setTimeout(() => onError(new Error("ms must be between 5 and 4000"), ms));
//     }
// }

//sleep(3, (ms) => console.log(ms), (ms) => console.log(ms))

//Asynchroniczne funkcje z wykorzystaniem Promises
function slowRand(n, ms = 1000) {
    return new Promise((resolve, reject) => {
    if(n < 1) {
        setTimeout(() => reject(new Error("n has to be greater than 1")), ms);
    } else {
        setTimeout(() => resolve(Math.floor(Math.random() * n) + 1), ms);
        //x.then((result) => console.log(result))
        //slowRand(5, 1000).then((result) => console.log(result), (error) => console.log(error, "its ok, we handled it"))
        //slowRand(5, 1000).then((result) => console.log(result)).catch((error) => console.log(error, "its ok, we handled it"))
    }
    });
}

function slowOdd(n, ms = 100) {
    return new Promise((resolve, reject) => {
        if(n < 0) {
            setTimeout(() => reject(new Error("n can't be negative"), ms));
        } else {
            setTimeout(() => resolve((n % 2 === 0) ? n : n + 1, ms));
        }
    });
}

// slowRand(5, 1000)
//     .then(slowOdd)
//     .then((result) => console.log(result))
//     .catch((error) => console.log(error, "its ok, we handled it"))

//Promise.all([x, y]).then(([xValue, yValue]) => console.log('All results: ', xValue, yValue))
//Promise.race([x, y]).then((winner) => console.log('The winner is: ', winner))

//7.5.1. Stwórz funkcję wait(ms). Ma ona zwrócić oczekującą (pending) obietnicę, 
//która ma być dotrzymana (resolved) po wybranej ilości milisekund. Obietnica zwrócona z tej funkcji nie powinna być nigdy odrzucona (rejected).

function wait(ms = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
    });
}

//7.5.2. Stwórz funkcję delayedError(ms, message), która ma zwracać oczekującą obietnicę i odrzucić ją po zadym czasie w milisekundach (ms) 
//przekazując jej w wartości obiekt Error z zadaną wiadomością (message). Obietnica zwrócona z tej funkcji nie powinna być nigdy dotrzymana (resolved).

function delayedError(ms = 1000, message) {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error(message)), ms);
    });
}

//7.5.3. Stwórz funkcję isEven(num), zwracającą obietnicę, która ma natychmiast być dotrzymana jeśli przekazana została liczba. 
//Wartością ma być true jeśli liczba jest parzysta, false jeśli nieparzysta. Obietnica ma być natychmiast odrzucona jeśli is argument funkcji nie jest liczbą całkowitą.

function isEven(num) {
    return new Promise((resolve, reject) => {
        if(Number.isInteger(num)) {
            if(num % 2 == 0) {
                resolve(true);
            } else {
                resolve(false);
            }
        } else {
            reject(new Error('Num must be integer'));
        }
    });
}

//7.5.4. Stwórz funkcję slowIsEven(num, ms=1000), która robi to samo co funkcja isEven ale po zadanym czasie w milisekundach. 
//Wykorzystaj do implementacji funkcję isEven oraz wait.

function slowIsEven(num, ms = 1000) {

    return new Promise((resolve, reject) => {
        // setTimeout(() => {
        //     resolve(isEven(num));
        // }, ms);
        // resolve(
        //     // wait(ms).then(result => {isEven(num).then(result => console.log(result))})
        //     wait(ms).then(() => {isEven(num).then(result => )})
        // );
        wait(ms).then(() => {isEven(num).then(result => resolve(result))})
    });
}

//7.5.5. Stwórz funkcję timeout(promise, ms=3000), zwracającą obietnicę, która ma być dotrzymana gdy przekazana obietnica zostanie dotrzymana i otrzymać jej wartość. 
//Chyba, że upłynie zadany czas w milisekundach, to obietnica ma być odrzucona. Wykorzystaj do implementacji funkcję delayedError

function timeout(promise, ms = 3000) {
    //promise;
    return new Promise((resolve, reject) => {

        // resolve(promise.then(result => console.log(result)).catch(error => {reject(delayedError(5000, 'elo'))}));
        // let done = null;

        // promise.then((result) => {done = result});

        // console.log(done);
        let status = 'pending';
        //promise;
        promise.then((result) => {status = result});

        //promise.then((result) => {status = result});

        setTimeout(() => {
            // resolve(promise.then());
            // reject(delayedError(5000, 'elo'));
            // resolve(promise.then());
            // reject(delayedError(1000, 'elo'));

            // promise.then((result) => {done = result; console.log('done w then:', done)});

            // console.log('done:',done);

            // promise.then((result) => {console.log(result); resolve(result)});
            // reject(console.log('nie'));

            //console.log(done.then(result => console.log(result)))

            // let status = 'pending';

            //promise.then((result) => {status = result});
    
            //console.log(status);

            if(status != 'pending') {
                resolve(promise.then(result => console.log(result)));
            } else {
                reject(delayedError(1000, 'error'));
            }

            //promise.then(result => resolve(console.log(result))).catch(error => reject(error));
        }, ms);
        //reject(promise.catch(delayedError(ms, 'Error!')));

        //resolve(promise.then(result => console.log(result)));

        //promise.then(result => result ? resolve(console.log(result)) : reject(delayedError(1000, 'msg')));

        //promise.then(result => resolve())
        //promise.then(result => resolve(result));

        // setTimeout(() => {
        //     resolve(promise.then(result => console.log(result)));
        //     reject(delayedError(1000, 'msg'));
        // }, ms);

        // promise.then(result => {resolve(console.log(result));reject(delayedError(1000, 'msg'));})
        // promise.then((result) => {
        //     if(result) {
        //         resolve(console.log(result));
        //     } else {
        //         reject(delayedError(1000, 'msg'));
        //     }
        // });
        // if() {
        //     setTimeout(() => {
        //         resolve(promise.then(result => console.log(result)));
        //     }, ms)
        // } else {
        //     setTimeout(() => {
        //         reject(delayedError(1000, 'msg'));
        //     }, ms);
        // }

        // promise.then(result => {
        //     setTimeout(() => {
        //         console.log(result);
        //     }, ms)
        // });

        // promise.catch(error => {
        //     setTimeout(() => {
        //         console.log(error);
        //     })
        // }, ms);

        // setTimeout(() => {
        //     promise
        //     .then(() => resolve(promise.then(result => console.log(result))))
        //     .catch(error => reject(error));
        //     // if() {
        //     //     resolve(promise.then(result => console.log(result)));
        //     // } else {
        //     //     reject(delayedError(1000, 'msg'));
        //     // }

        // }, ms);
    });
}

//7.6.1 Stwórz asynchroniczną funkcję slowIsEven(num, ms=1000), 
//która robi to samo co funkcja z zadania domowego w poprzedniej lekcji. Wykorzystaj do implementacji funkcje isEven oraz wait oraz słowo kluczowe await.

// function slowIsEven(num, ms=1000) {
//     return new Promise((resolve, reject) => {
//         resolve(
//             wait(ms).then(result => {isEven(num)})
//         );
//     })
// }