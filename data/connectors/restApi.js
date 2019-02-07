import fetch from 'node-fetch'

// create a small ORM for interacting with a REST api
const FortuneCookie = {
    getOne() {
        return fetch('http://fortunecookieapi.herokuapp.com/v1/cookie')
            .then(res => res.json())
            .then(jsonResp => jsonResp[0].fortune.message)
    },
}

export { FortuneCookie }
