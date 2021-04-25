/**
 * Instance of the current using storage
 */
const storage = localStorage

/**
 * Set item to the current storage
 * @param {string} name - name of the item
 * @param {string} value - value of the item
 */
const setItem = (name, value) => {
    if (typeof storage.setItem !== 'function') {
        throw new Error('Storage should implement setItem method')
    }

    storage.setItem(name, value)
}

/**
 * Get item from the current storage
 * @param {string} name - name of the item
 * @returns {string} - value of the item
 */
const getItem = name => {
    if (typeof storage.getItem !== 'function') {
        throw new Error('Storage should implement getItem method')
    }

    return storage.getItem(name)
}

/**
 * Remove item from the current storage
 * @param {string} name - name of the item
 */
const removeItem = name => {
    if (typeof storage.removeItem !== 'function') {
        throw new Error('Storage should implement removeItem method')
    }

    storage.removeItem(name)
}

export default {setItem, getItem, removeItem}
