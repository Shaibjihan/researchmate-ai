import { api } from "./api";

export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const res = await api.get("/test-auth", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};