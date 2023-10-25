const API_URL = "https://api.escuelajs.co/api/v1/"
// implement view detail of product
export const getOneProduct = async (id) => {
    const response = await fetch(`${API_URL}products/${id}`)
    return response
}
