# W4-P2

Richieste API verso un and point. Promises.

const musicData = (id) =>{
    let promise= new Promise((resolve,reject)=>{
        let request =  fetch('https://striveschool-api.herokuapp.com/api/deezer/search?q=' + id, { method: 'GET' });
        setTimeout(()=>{
            resolve(request);
            reject("error");
        },1000);
 });
    return promise;
}
