import { knexProducts } from "./config";

export const addProduct = (product) => {
    knexProducts('products').insert(product)
    .then(console.log(result))
    .catch( error => console.log(error))
}

export const getProducts = () => {
    knexProducts.from('products').select('*')
    .then(console.log(result))
    .catch( error => console.log(error))
}