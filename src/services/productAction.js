const API_URL = "https://api.escuelajs.co/api/v1/"
// implement view detail of product
export const getOneProduct = async (id) => {
    const response = await fetch(`${API_URL}products/${id}`)
    return response
}

// get all proudcts
export const fetchProducts = async (limit, offset) => {
    const response = await fetch(`${API_URL}products?offset=${offset}&limit=${limit}`)
    return response.json()
}
