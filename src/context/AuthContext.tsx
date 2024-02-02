//preact
import { createContext } from "preact";
import { useEffect, useReducer } from "preact/hooks";
//utility
import { HandleAuthToken } from "../utils/utility";

//types
type UserStateType = {
  user: { [index: string]: any };
  token: string;
  // refreshToken?: string | null;
  isAuthenticated: boolean;
};
type UserReducerType = {
  user: UserStateType;
  dispatch: React.Dispatch<any>;
};

type AuthActionType = {
  type: "signin" | "update_user";
  payload: UserStateType;
};
type LogoutActionType = {
  type: "signout";
};
type ActionType = AuthActionType | LogoutActionType;

//initial user state for reducer
const UserState: UserStateType = {
  user: {},
  token: "",
  isAuthenticated: false,
};

export const AuthContext = createContext<UserReducerType>({
  user: UserState,
  dispatch: () => {},
});

const signIn = (payload: UserStateType) => {
  const handleAuth = new HandleAuthToken();
  handleAuth.addData(payload?.user, payload.token);
};
const signOut = () => {
  const handleAuth = new HandleAuthToken();
  handleAuth.clearData();
};
const update = (payload: UserStateType) => {
  new HandleAuthToken().addData(payload.user, payload.token);
};
const reducer = (state: UserStateType, action: ActionType): UserStateType => {
  switch (action?.type) {
    case "signin": {
      signIn(action?.payload);
      return action?.payload;
    }

    case "signout":
      signOut();
      return {
        user: {},
        isAuthenticated: false,
        token: "",
      };

    case "update_user": {
      update({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        user: action?.payload?.user,
      });
      return {
        ...state,
        user: action?.payload?.user,
        token: state?.token,
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
          token: handleAuth.retrieveToken() || "",
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
