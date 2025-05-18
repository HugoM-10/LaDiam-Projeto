import api from "./Api";

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

const deleteProduct = async (product) => {
  try {
    const csrftoken = getCookie("csrftoken");
    const response = await api.delete("products/", {
      data: product,
      headers: {
        "X-CSRFToken": csrftoken,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};


export { deleteProduct };
