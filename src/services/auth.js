export const TOKEN_KEY = '&app-token';
export const USER_ID = '&id-user';
export const USER_NAME = '&user-name';
export const USER_EMAIL = '&user-email';
export const USER_TYPE = '&user-type';

export const login = token => {
    localStorage.setItem(TOKEN_KEY, token);
}
export const logout = () => {
    localStorage.clear();
}

export const setUserId = id => localStorage.setItem(USER_ID, id);
export const getUserId = () => localStorage.getItem(USER_ID);

export const setUserName = name => localStorage.setItem(USER_NAME, name);
export const getUserName = () => localStorage.getItem(USER_NAME);

export const setUserEmail = email => localStorage.setItem(USER_EMAIL, email);
export const getUserEmail = () => localStorage.getItem(USER_EMAIL);

export const setUserType = type => localStorage.setItem(USER_TYPE, type);
export const getUserType = () => localStorage.getItem(USER_TYPE);

export const getToken = () => localStorage.getItem(TOKEN_KEY);