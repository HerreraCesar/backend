import { Router } from "express";

const router = Router()

router.get('/', async (req, res) => {
    res.render("home");
})

router.get('/productos-test', async (req, res) => {
    res.render("home");
})


export default router;