import { addProduct, deleteProductById, getProductById, getProducts, updateProductById } from "../controllers/products.js";

import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.send(getProducts())
})

router.get('/:id', (req, res) => {
    res.send(getProductById(parseInt(req.params.id)))
})

router.post('/', (req, res) => {
    console.log(req.body);
    res.send(addProduct(req.body))
})

router.put('/:id', (req, res) => {
    res.send(updateProductById(parseInt(req.params.id), req.body))
})

router.delete('/:id', (req, res) => {
    res.send(deleteProductById(parseInt(req.params.id)))
})

export default router;