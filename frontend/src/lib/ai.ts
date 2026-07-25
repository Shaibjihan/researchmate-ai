import { api } from "./api";

export const askAI = async (
  question: string,
  documentId: number
) => {
  const token = localStorage.getItem("token");

  const res = await api.post(
    `/ai/${documentId}/chat`,
    {
      question,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const globalSearch = async (
  question: string
) => {
  const token = localStorage.getItem("token");

  const res = await api.post(
    "/ai/search",
    {
      question,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};


export const getChatHistory = async (
  documentId: number
) => {
  const token = localStorage.getItem("token");

  const res = await api.get(
    `/ai/${documentId}/history`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};