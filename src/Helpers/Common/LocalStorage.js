export const saveToLocalStorage = (name, value) => {
    let storeValue = typeof value === 'object' 
        ? JSON.stringify(value) : value ;

    return localStorage.setItem(name, storeValue);
}

export const removeFromLocalStorage = (name) => {
    return localStorage.removeItem(name);
}

export const getFromLocalStorage = (name, parse = false) => {
    let storedData = localStorage.getItem(name)

    return (parse && storedData !== 'undefined') ? JSON.parse(storedData) : storedData;
}