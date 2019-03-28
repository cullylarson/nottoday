export function navActiveClass(location, { starts, ends, like, exact, activeClass = 'active', notActiveClass = '' }) {
    const pathname = location.pathname

    if(starts) {
        return new RegExp(`^${starts}`).test(pathname)
            ? activeClass
            : notActiveClass
    }
    else if(like) {
        return new RegExp(`${like}`).test(pathname)
            ? activeClass
            : notActiveClass
    }
    else if(ends) {
        return new RegExp(`${ends}$`).test(pathname)
            ? activeClass
            : notActiveClass
    }
    else if(exact) {
        return exact === pathname
            ? activeClass
            : notActiveClass
    }
    else {
        return notActiveClass
    }
}
