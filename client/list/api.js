import { paramUrl } from '@client/lib/url'
import { bearer, responseData } from '@client/lib/request'

const cursorSet = cursor => cursor !== '0' && cursor

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

export function getListSubscribers({ apiUrl, accessToken, id, cursor }) {
    const query = {
        cursor,
    }

    const url = paramUrl(`${apiUrl}/list/${id}/subscribers`, query)

    return fetch(url, {
        method: 'get',
        headers: {
            'Authorization': bearer(accessToken),
        },
    })
        .then(responseData)
        .then(({ response, data }) => {
            if(response.ok) {
                const noResults = (!data.users || !data.users.length) && !cursorSet(data.next_cursor_str) && !cursorSet(data.previous_cursor_str)

                return {
                    subscribers: data.users,
                    nextCursor: data.next_cursor_str,
                    previousCursor: data.previous_cursor_str,
                    noResults,
                }
            }
            else {
                return {
                    errors: data.errors,
                }
            }
        })
}
