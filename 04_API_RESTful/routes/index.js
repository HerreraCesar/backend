import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.send('Esta es la ruta de prueba get')
})

router.post('/', (req, res) => {
    res.send('Esta es la ruta de prueba post')
})

router.put('/', (req, res) => {
    res.send('Esta es la ruta de prueba put')
})

router.delete('/', (req, res) => {
    res.send('Esta es la ruta de prueba delete')
})

export default router;