import { paramUrl } from '@client/lib/url'
import { bearer, responseData } from '@client/lib/request'

const cursorSet = cursor => cursor !== '0' && cursor

export function getOneUser({ apiUrl, accessToken, id }) {
    return fetch(`${apiUrl}/user/${id}`, {
        method: 'get',
        headers: {
            'Authorization': bearer(accessToken),
        },
    })
        .then(responseData)
        .then(({ response, data }) => {
            if(response.ok) {
                return {
                    user: data.user,
                }
            }
            else {
                return {
                    errors: data.errors,
                }
            }
        })
}

export function getUserFollowers({ apiUrl, accessToken, id, cursor }) {
    const query = {
        cursor,
    }

    const url = paramUrl(`${apiUrl}/user/${id}/followers`, query)

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
                    followers: data.users,
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
