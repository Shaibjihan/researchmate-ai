import { api } from "./api";

export const uploadDocument = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const token = localStorage.getItem("token");

  const res = await api.post("/upload/", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};


export const getDocuments = async () => {
  const token = localStorage.getItem("token");

  const res = await api.get("/documents", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const deleteDocument = async (documentId: number) => {
  const token = localStorage.getItem("token");

  const res = await api.delete(`/documents/${documentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};



export const downloadDocument = async (
  documentId: number
) => {
  const token = localStorage.getItem("token");

  const response = await api.get(
    `/upload/download/${documentId}`,
    {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const url = window.URL.createObjectURL(
    new Blob([response.data])
  );

  const link = document.createElement("a");

  link.href = url;

  const disposition =
    response.headers["content-disposition"];

  let filename = "document.pdf";

  if (disposition) {
    const match = disposition.match(/filename="?(.+?)"?$/);

    if (match) {
      filename = match[1];
    }
  }

  link.setAttribute("download", filename);

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);
};
