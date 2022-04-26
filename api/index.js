const BASE_URL = "https://sportilize.herokuapp.com/api/v1/";

export const get = (url, params) => fetch(BASE_URL + url, {
    method: 'GET',
    ...params
})

export const post = (url, params, body) => fetch(BASE_URL + url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    ...params,
    body: JSON.stringify(body)
})