export function getOffset(page, perPage) {
    if(page < 1 || !page) page = 1
    if(perPage < 0 || !perPage) perPage = 0

    return (page - 1) * perPage
}
