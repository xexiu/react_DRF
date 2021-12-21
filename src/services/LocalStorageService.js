import { isEmpty } from 'lodash';

const LOCALSTORAGE_MAP_ACTIONS = {
    'setItem': setOrThrow,
    'removeItem': removeOrThrow
}

function setOrThrow(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch(e) {
        console.log('There was an error setting localstorage item', e);
        localStorage.clear();
    }
}

function removeOrThrow(key) {
    try {
        localStorage.removeItem(key);
    } catch(e) {
        console.log('There was an error removing localstorage item', e);
        localStorage.clear();
    }
}

function setItems(items) {
    if (!isEmpty(items)) {
        for (const key in items) {
            LOCALSTORAGE_MAP_ACTIONS['setItem'](key, items[key]);
        }
    }
    return null;
}

function removeItems(items) {
    if (!isEmpty(items)) {
        items.forEach(item => {
            LOCALSTORAGE_MAP_ACTIONS['removeItem'](item);
        });
    }
    return null;
}

function setItem(key, value) {
    LOCALSTORAGE_MAP_ACTIONS['setItem'](key, value);
}

function removeItem(key) {
    LOCALSTORAGE_MAP_ACTIONS['removeItem'](key);
}

const LocalStorageServices = {
    setItems,
    setItem,
    removeItems,
    removeItem
};

export default LocalStorageServices;
