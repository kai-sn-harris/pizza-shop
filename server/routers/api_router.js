const express = require("express");
const router = express.Router();

const PizzaController = require("../controllers/pizza_controller");
const OrderController = require("../controllers/order_controller");

router.get("/pizzas", async (req, res) => {
    res.json(await PizzaController.getPizzas());
});

router.post("/pizzas/add", async (req, res) => {
    const { id, size } = req.body;
    res.json(await PizzaController.addPizza(id, size));
});

router.get("/orders", async (req, res) => {
    res.json(await OrderController.getOrders());
});

router.post("/orders/add", async (req, res) => {
    const order_data = { name, items } = req.body;
    res.json(await OrderController.addOrder(order_data));
});

module.exports = router;