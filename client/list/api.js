import { bearer, responseData } from '@client/lib/request'

export function getOneList({ apiUrl, accessToken, id }) {
    return fetch(`${apiUrl}/list/${id}`, {
        method: 'get',
        headers: {
            'Authorization': bearer(accessToken),
        },
    })
        .then(responseData)
        .then(({ response, data }) => {
            if(response.ok) {
                return {
                    list: data.list,
                }
            }
            else {
                return {
                    errors: data.errors,
                }
            }
        })
}
