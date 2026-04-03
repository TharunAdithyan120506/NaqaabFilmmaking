const API = process.env.REACT_APP_API_URL;

export const apiFetch = (path, options = {}) => {
  if (!API) {
    throw new Error("REACT_APP_API_URL is not set");
  }

  return fetch(`${API}${path}`, options);
};

export default API;
