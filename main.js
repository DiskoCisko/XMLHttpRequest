const config = {
    URL: "https://jsonplaceholder.typicode.com/posts",

};
const samplePost = {
    body: " architecto",
    id: 99999,
    title: "architecto",
    userId: 99999
};

const samplePATCH = {
    patch: " patch",
};

const samplePUT = {
    body: "Update architecto",
    id: 2,
    title: "Update",
    userId: 5555
};
// для GET запроса
function makeGetRequest() {
    return new Promise((resolve, reject) => {
// Создаём новый объект XMLHttpRequest
let XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
let xhr = new XHR();



// Если код ответа сервера не 200, то это ошибка
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if(xhr.status === 200) {
            resolve(xhr);
        } else {
            reject('Error:' + xhr.status);
        }
    }
}

// Конфигурируем его: GET-запрос на URL 
xhr.open('GET', config.URL, true);

// Отсылаем запрос
xhr.send();

xhr.timeout = 30000; // 30 секунд (в миллисекундах)
xhr.ontimeout = function() {
    reject('запрос превысил максимальное время')
 }
})}
// для POST, PUT< PATCH запросов
function makeRequest(body, method, url) {
    return new Promise((resolve, reject) => {
        // Создаём новый объект XMLHttpRequest
        let XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        let xhr = new XHR();

        body = JSON.stringify(body);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if(xhr.status !== 400) {
                    resolve(xhr);
                } else {
                    reject('Error:' + xhr.status);
                }
            }
        }
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        xhr.send(body);
    })
}
// для DELETE запроса
function makeDELETERequest() {
    return new Promise((resolve, reject) => {
// Создаём новый объект XMLHttpRequest
let XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
let xhr = new XHR();

// Если код ответа сервера не 200, то это ошибка
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if(xhr.status === 200) {
            resolve(xhr.status);
        } else {
            reject('Error:' + xhr.status);
        }
    }
}

// Конфигурируем его: DELETE-запрос на URL 
xhr.open('DELETE', `${config.URL}/2`, true);

// Отсылаем запрос
xhr.send();

xhr.timeout = 30000; // 30 секунд (в миллисекундах)
xhr.ontimeout = function() {
    reject('запрос превысил максимальное время')
 }
})}

makeRequest(samplePost, 'POST', config.URL)
 .then((data) => {
     console.dir(data.response)
 })
 .catch((data) => {
     console.error(data)
 })

makeGetRequest()
    .then((data) => {
        console.dir(JSON.parse(data.responseText));
        console.log(data.getAllResponseHeaders());
    })
    .catch((data) => {
        console.error(data);
    })
makeRequest(samplePUT, 'PUT', `${config.URL}/2`)
    .then((data) => {
        //console.dir(data)
        console.dir(JSON.parse(data.responseText));
        console.log(data.getAllResponseHeaders());
    })
    .catch((data) => {
        console.error(data);
    })
makeRequest(samplePATCH, 'PATCH', `${config.URL}/2`)
    .then((data) => {
        //console.dir(data)
        console.dir(JSON.parse(data.responseText));
        console.log(data.getAllResponseHeaders());
    })
    .catch((data) => {
        console.error(data);
    })

makeDELETERequest()
    .then((data) => {
        console.dir(data)
    })
    .catch((data) => {
        console.error(data)
    })
