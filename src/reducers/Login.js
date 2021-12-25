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
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
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

export const userLogout = (data) => {
  return {
    type: "LOGOUT",
    payload: data,
  };
};
