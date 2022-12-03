export const DRAWER_WIDTH = 300;

export class HandleLocalStorage {
  getValue(key) {
    return localStorage.getItem(key);
  }
  setValue(key, value) {
    localStorage.setItem(key, value);
  }
  remove(key) {
    localStorage.removeItem(key);
  }
}
export class HandleAuthToken extends HandleLocalStorage {
  #USER = "user";
  #TOKEN = "fast-pannel-access-token";

  addUser = (user) => this.setValue(this.#USER, JSON.stringify(user));
  clearUser = () => this.remove(this.#USER);
  retrieveUser = () => JSON.parse(this.getValue(this.#USER));

  addToken = (token) => this.setValue(this.#TOKEN, token);
  clearToken = () => this.remove(this.#TOKEN);
  retrieveToken = () => this.getValue(this.#TOKEN);

  addData = (user, accessToken = null) => {
    this.addUser(user);
    this.addToken(accessToken);
  };
  clearData = () => {
    this.clearUser();
    this.clearToken();
  };
}

export const logout = (dispatch) => {
  new HandleAuthToken().clearData();
  dispatch({
    type: "signout",
  });
};
export const getAuthToken = () => {
  return `Bearer ${new HandleAuthToken().retrieveToken()}`;
};
