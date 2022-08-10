const axios = require("axios");

const API_URL = "/user/";
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  console.log(response);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "sign-in", userData);
  console.log(response);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
