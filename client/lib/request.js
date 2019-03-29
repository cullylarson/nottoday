export function bearer(token) {
    return `Bearer ${token}`
}

export function responseData(response) {
    return response.json()
        .then(data => ({ response, data }))
}
