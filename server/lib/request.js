function responseData(response) {
    return response.json()
        .then(data => ({ response, data }))
}

module.exports = {
    responseData,
}
