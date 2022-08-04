import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import { productsDB } from '../persistence/index.js';
import uniqid from 'uniqid'

const schema = buildSchema(`
  type Product{
    id: ID!
    title: String,
    price: Float,
    thumbnail: String,
    timestamp: String
  }
  input ProductInput {
    title: String,
    price: Float,
    thumbnail: String,
  }
  type Query {
    getProduct(id: ID!): Product,
    getProducts: [Product],
  }
  type Mutation {
    createProduct (data: ProductInput): Product
    updateProduct (id: ID!, data: ProductInput): Product,
    deleteProduct (id: ID!): Product,
  }
`);

async function getProduct({ id }) {
    return await productsDB.getById(id)
}

async function getProducts() {
    return await productsDB.getAll()
}

async function createProduct({data}) {
    const newProduct = { ...data, id: uniqid(), timestamp: new Date().valueOf()};
    const content = await productsDB.write(newProduct)
    return content.data
}

async function updateProduct({ id, data }) {
    const content = await productsDB.updateById(id, data)
    return content.data
}

async function deleteProduct({ id }) {
    const content = await productsDB.deleteById(id)
    return content.data
}
 

export default class GraphQLController {
    constructor() {
        return graphqlHTTP({
            schema: schema,
            rootValue: {
                getProduct,
                getProducts,
                createProduct,
                updateProduct,
                deleteProduct,
            },
            graphiql: true,
        })
    }
}