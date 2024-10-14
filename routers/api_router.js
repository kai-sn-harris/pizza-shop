const express = require("express");
const router = express.Router();

const PizzaController = require("../controllers/pizza_controller");

router.get("/pizzas", async (req, res) => {
    let pizzas = await PizzaController.getPizzas();
    // check for error
    if(pizzas.error) {
        res.json({ status: 500, ...pizzas })
    } else {
        res.json(pizzas);
    }
});

router.post("/pizzas/add", async (req, res) => {
    const { id, size } = req.body;
    res.json(await PizzaController.addPizza(id, size));
});

module.exports = router;