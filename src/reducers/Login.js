const initialState = {
  role: "",
  token: "",
  user: null,
};

const Login = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      const { role, token, user } = payload;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(user));
      return { role, token, user };
    case "ADD_WATCHLIST":
      const userAfterAdd = payload;
      localStorage.setItem("user", JSON.stringify(userAfterAdd));
      return { role: state.role, token: state.token, user: userAfterAdd };
    case "DELETE_WATCHLIST":
      const userAfterDelete = payload;
      localStorage.setItem("user", JSON.stringify(userAfterDelete));
      return { role: state.role, token: state.token, user: userAfterDelete };
    case "UPDATE_USER":
      const updatedUser = payload;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return { role: state.role, token: state.token, user: updatedUser };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      localStorage.removeItem("tokenExpiration");
      return { role: "", token: "", user: null };
    default:
      const tokenStorge = localStorage.getItem("token");
      const roleStorge = localStorage.getItem("role");
      const userStorge = JSON.parse(localStorage.getItem("user"));
      if (tokenStorge && roleStorge && userStorge)
        return { role: roleStorge, token: tokenStorge, user: userStorge };
      else return state;
  }
};

export default Login;

export const userLogin = (data) => {
  return {
    type: "LOGIN",
    payload: data,
  };
};

export const addAuctionToWatchList = (data) => {
  return {
    type: "ADD_WATCHLIST",
    payload: data,
  };
};

export const deleteAuctionFromWatchList = (data) => {
  return {
    type: "DELETE_WATCHLIST",
    payload: data,
  };
};

export const updateUser = (data) => {
  return {
    type: "UPDATE_USER",
    payload: data,
  };
};

export const userLogout = (data) => {
  return {
    type: "LOGOUT",
    payload: data,
  };
};
