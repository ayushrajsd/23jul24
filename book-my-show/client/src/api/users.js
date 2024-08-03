const { axiosInstance } = require("./index");

// register a user

export const RegisterUser = async (value) => {
  try {
    console.log("value", value);
    const response = await axiosInstance.post("api/users/register", value);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const LoginUser = async (value) => {
  try {
    const response = await axiosInstance.post("api/users/login", value);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};