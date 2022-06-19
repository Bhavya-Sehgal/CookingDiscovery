export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user, token) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
  token: token,
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const Logout = () => ({
  type: "LOGOUT",
});

export const UpdateStart = (userCredentials) => ({
  type: "UPDATE_START",
});

export const UpdateSuccess = (user, token) => ({
  type: "UPDATE_SUCCESS",
  payload: user,
  token: token,
});

export const UpdateFailure = () => ({
  type: "UPDATE_FAILURE",
});
