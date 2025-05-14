import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
});

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (const element of cookies) {
      const cookie = element.trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const updateUser = async (userData) => {
  const csrftoken = getCookie("csrftoken");
  const response = await api.put("auth/user/", userData, {
    headers: {
      "X-CSRFToken": csrftoken,
    },
  });
  return response.data;
};

const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const csrftoken = getCookie("csrftoken");
    const response = await api.put(
      `/orders/${orderId}/status/`,
      { status: newStatus },
      {
        headers: {
          "X-CSRFToken": csrftoken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar status do pedido:", error);
    throw error;
  }
};

export { updateOrderStatus, updateUser };
