export function title(parts, base = 'not today', sep = ' | ') {
    const partsArray = Array.isArray(parts)
        ? [...parts, base]
        : [parts, base]

    return partsArray
        .filter(x => !!x)
        .join(sep)
}
