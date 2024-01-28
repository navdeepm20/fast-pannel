import { AxiosError } from "axios";
import { toast } from "react-toastify";

export class HandleLocalStorage {
  getValue(key: string) {
    return localStorage.getItem(key);
  }
  setValue(key: string, value: any) {
    localStorage.setItem(key, value);
  }
  remove(key: string) {
    localStorage.removeItem(key);
  }
}
export class HandleAuthToken extends HandleLocalStorage {
  #USER = "user";
  #TOKEN = "fast-pannel-access-token";

  addUser = (user: { [index: string]: any }) =>
    this.setValue(this.#USER, JSON.stringify(user));
  clearUser = () => this.remove(this.#USER);
  retrieveUser = () => JSON.parse(this.getValue(this.#USER) as string);

  addToken = (token: string) => this.setValue(this.#TOKEN, token);
  clearToken = () => this.remove(this.#TOKEN);
  retrieveToken = () => this.getValue(this.#TOKEN);

  addData = (user: { [index: string]: any }, accessToken: string) => {
    this.addUser(user);
    this.addToken(accessToken);
  };
  clearData = () => {
    this.clearUser();
    this.clearToken();
  };
}

export const logout = (dispatch: React.Dispatch<any>) => {
  new HandleAuthToken().clearData();
  dispatch({
    type: "signout",
  });
};
export const getAuthToken = () => {
  return `Bearer ${new HandleAuthToken().retrieveToken()}`;
};

export const httpErrorHandler = (error: AxiosError) => {
  if (error.message !== "canceled") {
    notificationHandler({ severity: "error", title: error?.message });
  }
};

export const notificationHandler = ({
  severity,
  title,
  msg,
}: {
  severity: string;
  title: string;
  msg?: string;
}) => {
  switch (severity) {
    case "success":
      toast.success(title);
      break;
    case "error": {
      toast.error(title);
      break;
    }
    case "info":
      toast.info(title);
      break;
    case "warning":
      toast.warning(title);
      break;
    default:
      toast(title);
  }
};
