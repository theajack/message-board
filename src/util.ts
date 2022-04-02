
export function getUrlParam (name?: string, defVal?: string) {
    const {search} = window.location;
    return parseUrlParam(search, name, defVal);
}

export function parseUrlParam (search: string, name?: string, defVal?: string) {
    const index = search.indexOf('?');
    if (index !== -1) {
        search = search.substring(index);
    }
    if (typeof (name) !== 'undefined') {
        if (search !== '') {
            const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
            const r = search.substring(1).match(reg);
            if (r !== null) {
                return decodeURIComponent(r[2]);
            }
        }
        return (typeof (defVal) !== 'undefined') ? defVal : null;
    }
    if (search === '') {
        return {};
    }
    const arr = search.substring(1).split('&');
    const param: Record<string, any> = {};
    arr.forEach((item) => {
        const pArr = item.split('=');
        param[pArr[0]] = pArr[1];
    });
    return param;
}