const BASE_URL = 'https://nomoreparties.co/cohort0';
const TOKEN = '80a75492-21c5-4330-a02f-308029e94b63';

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return res.json().then((err) => Promise.reject(`Ошибка: ${res.status} ${err.message}`));
}

export function getUserInfo() {
    return fetch(`${BASE_URL}/users/me`, {
        headers: {
            authorization: TOKEN,
        },
    }).then(checkResponse);
}

export function setUserInfo({ name, about }) {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: TOKEN,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            about,
        }),
    }).then(checkResponse);
}

export function setUserAvatar({ avatar }) {
    return fetch(`${BASE_URL}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: TOKEN,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            avatar,
        }),
    }).then(checkResponse);
}
