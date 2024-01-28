//preact
import { createContext } from "preact";
import { useEffect, useReducer } from "preact/hooks";
//utility
import { HandleAuthToken } from "../utils/utility";

//initial user state for reducer
const UserState: UserStateType = {
  user: { token: null },
  isAuthenticated: false,
};

//types
type UserReducerType = {
  user: UserStateType;
  dispatch: React.Dispatch<any>;
};
type UserStateType = {
  user: { [index: string]: any };
  isAuthenticated: boolean;
};
type AuthActionType = {
  type: "signin" | "update_user";
  payload: UserStateType & { token: string | null };
};
type LogoutActionType = {
  type: "signout";
};
type ActionType = AuthActionType | LogoutActionType;

export const AuthContext = createContext<UserReducerType>({
  user: UserState,
  dispatch: () => {},
});

const signIn = (payload: UserStateType & { token?: string | null }) => {
  const handleAuth = new HandleAuthToken();
  handleAuth.addData(payload?.user, payload?.token);
};
const signOut = () => {
  const handleAuth = new HandleAuthToken();
  handleAuth.clearData();
};
const update = (payload: UserStateType & { token?: string | null }) => {
  new HandleAuthToken().addData(payload?.user, payload?.token);
};
const reducer = (state: UserStateType, action: ActionType) => {
  switch (action?.type) {
    case "signin": {
      signIn(action?.payload);
      return action?.payload;
    }

    case "signout":
      signOut();
      return {
        user: null,
        isAuthenticated: false,
      };
    case "update_user": {
      update({ ...state, user: action?.payload?.user });
      return {
        ...state,
        user: action?.payload?.user,
      };
    }
  }
};
export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, dispatch] = useReducer(reducer, UserState);
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
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
