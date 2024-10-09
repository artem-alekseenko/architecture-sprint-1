const BASE_URL = 'https://nomoreparties.co';
const GROUP_ID = 'cohort0';
const TOKEN = '80a75492-21c5-4330-a02f-308029e94b63';

function checkResponse(res) {
    console.log('res.ok', res.ok);
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export function getUserInfo() {
    return fetch(`${BASE_URL}/${GROUP_ID}/users/me`, {
        headers: {
            authorization: TOKEN,
        },
    }).then(checkResponse);
}

export function getCardList() {
    return fetch(`${BASE_URL}/${GROUP_ID}/cards`, {
        headers: {
            authorization: TOKEN,
        },
    }).then(checkResponse);
}

export function addCard({ name, link }) {
    return fetch(`${BASE_URL}/${GROUP_ID}/cards`, {
        method: 'POST',
        headers: {
            authorization: TOKEN,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, link }),
    }).then(checkResponse);
}

export function removeCard(cardID) {
    console.log('removeCard', cardID);
    return fetch(`${BASE_URL}/${GROUP_ID}/cards/${cardID}`, {
        method: 'DELETE',
        headers: {
            authorization: TOKEN,
        },
    }).then(checkResponse);
}

export function changeLikeCardStatus(cardID, like) {
    return fetch(`${BASE_URL}/${GROUP_ID}/cards/like/${cardID}`, {
        method: like ? 'PUT' : 'DELETE',
        headers: {
            authorization: TOKEN,
        },
    }).then(checkResponse);
}
