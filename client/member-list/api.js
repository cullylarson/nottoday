import { paramUrl } from '@client/lib/url'
import { bearer, responseData } from '@client/lib/request'

const cursorSet = cursor => cursor !== '0' && cursor

export function getMemberLists({ apiUrl, accessToken, cursor }) {
    const query = {
        cursor,
    }

    const url = paramUrl(`${apiUrl}/member-list`, query)

    return fetch(url, {
        method: 'get',
        headers: {
            'Authorization': bearer(accessToken),
        },
    })
        .then(responseData)
        .then(({ response, data }) => {
            if(response.ok) {
                const noResults = (!data.lists || !data.lists.length) && !cursorSet(data.next_cursor_str) && !cursorSet(data.previous_cursor_str)

                return {
                    lists: data.lists,
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
