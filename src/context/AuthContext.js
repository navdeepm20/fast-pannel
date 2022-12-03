//preact
import { createContext } from "preact";
import { useEffect, useReducer } from "preact/hooks";
//utility
import { HandleAuthToken } from "../utils/utility";

const initialState = {
  user: null,
  isAuthenticated: false,
};

export const AuthContext = createContext({});

const signIn = (payload) => {
  const handleAuth = new HandleAuthToken();

  handleAuth.addData(payload?.user, payload?.token);
};
const signOut = () => {
  const handleAuth = new HandleAuthToken();
  handleAuth.clearData();
};
const reducer = (state, action) => {
  switch (action?.type) {
    case "signin": {
      signIn(action?.payload);
      return {
        user: action?.payload,
        isAuthenticated: true,
      };
    }

    case "signout":
      signOut();
      return {
        user: null,
        isAuthenticated: false,
      };
    case "update_user":
      return {
        ...state,
        user: action?.payload?.user,
      };
  }
};
export default function AuthContextProvider({ children, ...props }) {
  const [user, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const handleAuth = new HandleAuthToken();

    if (!handleAuth.retrieveToken()) {
      dispatch({
        type: "signout",
      });
    } else {
      dispatch({
        type: "signin",
        payload: {
          isAuthenticated: true,
          user: handleAuth.retrieveUser(),
          token: handleAuth.retrieveToken(),
        },
      });
    }
  }, []);
  return (
    <AuthContext.Provider value={[user, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
}
