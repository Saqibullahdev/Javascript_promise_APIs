/**
 * this file contain some of javascript promises apis 
 * Promise.all
 * Promise.race
 * Promise.allSettled
 * Promise.any
 */

const { tryCatch } = require("bullmq");


// Promise.all
// Promise.all is a method that takes an array of promises and waits for all of them to resolve.
// If any of the promises is rejected, the Promise.all method rejects with the same error.
// If all promises are resolved, the Promise.all method resolves with an array of resolved values.

// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('Promise 1 resolved');
//     }, 1000);
// });

// const promise2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('Promise 2 resolved');
//         // reject('Promise 2 rejected');
//     }, 2000);
// });

// const promise3 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('Promise 3 resolved');
//         // reject('Promise 3 rejected');
//     }, 9000);
// });

// Promise.all([promise1, promise2, promise3])
//     .then((values) => {
//         console.log(values);
//     })
//     .catch((error) => {
//         console.log(error);
//     });


// Promise.settledAll
// Promise.allSettled is a method that takes an array of promises and waits for all of them to settle.
// It returns a promise that resolves after all of the given promises have either resolved or rejected,
// with an array of objects that each describes the outcome of each promise.

// const p1= new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('Promise 1 resolved');
//     }, 1000);
// });

// const p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject('Promise 2 rejected');
//     }, 5000);
// });

// const p3 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('Promise 3 resolved');
//     }, 3000);
// });

// Promise.allSettled([p1, p2, p3]).then((results) => {
//     console.log(results);
// }).catch((error) => {
//     console.log(error);
// });



// Promise.race
// Promise.race is a method that takes an array of promises and waits for the first promise to
// resolve or reject.
// If the first promise resolves, the overall promise resolves with the resolved value of the first promise.
// If the first promise rejects, the overall promise rejects with the rejected value of the first promise.

/***
 * output: of below snippet
 * as Pr1 is resolved first so it will be printed
 * Promise 1 resolved
 */

pr1= new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('Promise 1 resolved');
    }, 1000);
});

pr2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('Promise 2 rejected');
    }, 5000);
});

pr3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Promise 3 resolved');
    }, 3000);
});

async function RacePromise(){
    try{
        const res= await Promise.race([pr1, pr2, pr3]);
        console.log(res);
    }
    catch(error){
        console.log(error);
    }
    
}

async function main(){
    console.log(await RacePromise());
}

//direct using await in global context of node js envirnment is not allowed
// so we have to call the function inside another async function

// main();



// Promise.any
// Promise.any is a method that takes an array of promises and waits for the first promise to resolve.
// If the first promise resolves, the overall promise resolves with the resolved value of the first promise.

const pm1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('Promise 1 rejected');
    }, 1000);
});

const pm2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('Promise 2 rejected');
    }, 2000);
});

const pm3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('Promise 3 rejected');
    }, 3000);
});

Promise.any([pm1, pm2, pm3])
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error("All promises were rejected:");
        console.error(error.errors); // This will log the individual rejection reasons
        console.log(error.aggregateError); // This will log the AggregateError
    });
