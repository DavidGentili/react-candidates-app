const delay = () => {
    return new Promise((res,rej) => {
        return setTimeout(() => {
            res();
        },500)
    })
}

export default {
    data: {
        fetch: () => delay().then(() => JSON.parse(localStorage.getItem('candidates')) || []),
        update: (data) => delay().then(localStorage.setItem('candidates',JSON.stringify(data)))
    }
}