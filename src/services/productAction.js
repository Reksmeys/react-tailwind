import axios from "axios"

const API_URL = "https://api.escuelajs.co/api/v1/"
// implement view detail of product
export const getOneProduct = async (id) => {
    const response = await fetch(`${API_URL}products/${id}`)
    return response
}

// get limit proudcts
export const fetchProducts = async (limit, offset) => {
    const response = await fetch(`${API_URL}products?offset=${offset}&limit=${limit}`)
    return response.json()
}
// get all products
export const fetchAllProducts = async () => {
    const response = await fetch(`${API_URL}products`)
    return response.json()
}

// get product categories
export const fetchCategories = async () => {
    const response = await fetch(`${API_URL}categories`)
    return response.json()
}

// insert Products 
export const insertProduct = async (product) => {
    let response  = await fetch(`${API_URL}products`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : "bearer key"
        },
        body: JSON.stringify(product)
    })
    return response.json()
}
// upload image to server
export const uploadImageToServer = async (image) => {
    const response = await axios(`${API_URL}files/upload`, {
        method: "POST",
        headers: {
            "Content-Type" : "multipart/form-data"
        },
        data: image
    })
    return response
}
