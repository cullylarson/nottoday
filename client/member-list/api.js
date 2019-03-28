import { getOffset } from '@client/lib/pagination'
import { paramUrl } from '@shared/lib/url'
import { bearer, responseData } from '@client/lib/request'

export function getMemberLists({ apiUrl, accessToken, page, perPage }) {
    const query = {
        num: perPage,
        offset: getOffset(page, perPage),
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
                return {
                    lists: data.lists,
                    numTotal: data.numTotal,
                }
            }
            else {
                return {
                    errors: data.errors,
                }
            }
        })
}
