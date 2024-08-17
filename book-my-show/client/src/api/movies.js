import { axiosInstance } from "./index";

// get all movies
export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get("api/movies/get-all-movies");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// add a movie
export const addMovie = async (value) => {
  try {
    const response = await axiosInstance.post("api/movies/add-movie", value);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateMovie = async (value) => {
  try {
    const response = await axiosInstance.put("api/movies/update-movie", value);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// delete movue
export const deleteMovie = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "api/movies/delete-movie",
      payload
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getMovieById = async (id) => {
  try {
    const response = await axiosInstance.get(`api/movies/movie/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
