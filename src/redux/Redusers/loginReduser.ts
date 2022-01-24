interface LoginState {
  isAuth: boolean;
}

interface LoginAction {
  type: string;
  payload?: any;
}

const initialState: LoginState = {
  isAuth: false,
};

export const loginReducer = (
  state = initialState,
  action: LoginAction
): LoginState | undefined => {
  switch (action.type) {
    case "SET_LOGIN":
      return { isAuth: true };
    default:
      return state
  }
};
