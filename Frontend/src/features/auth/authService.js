
const axios = require("axios");


const API_URL = "/user/";
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  try {
    if (response.data) {
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.log(error)
  }

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

const googleAuth = async (userData) => {
  const response = await axios.post(API_URL + "google-auth", userData);
  console.log(response);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
}
// logout user
const logout = () => {
  localStorage.removeItem("user");
};


const authService = {
  register,
  logout,
  login,
  googleAuth,
};

export default authService;
