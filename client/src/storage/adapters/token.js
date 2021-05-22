import storage from '../storage'

/**
 * Get token of the current user
 * @returns {string} - token of the current user
 */
const getToken = () => {
	return storage.getItem('token')
}

/**
 * Set token for user
 * @param {string} token - token for user
 */
const setToken = token => {
	storage.setItem('token', token)
}

/**
 * Remove token of the current user
 */
const removeToken = () => {
	storage.removeItem('token')
}

export default {getToken, setToken, removeToken}
