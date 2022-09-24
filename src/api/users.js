import axios from "redaxios";

export const loadUsers = (page = 1, size = 10) => {
  const start = (page - 1) * size;
  const end = start + (size - 1);

  return axios.get(`/api/users?_start=${start}&_end=${end}`);
};
