const Pizza = require("../models/pizza");

const pizzaBoilerplate = require("./pizza_boilerplate");

async function getPizzas() {
    try {
        return await Pizza.find();
    } catch(err) {
        console.log(err);
        return { message: "MongoDB Error Occurred", error: err }
    }
}

async function addPizza(pizza_id, size, edits=null) {
    if(pizzaBoilerplate[pizza_id]) {
        let pizza = new Pizza(pizzaBoilerplate[pizza_id]);
        pizza.size = size;
        if(edits) {
            // handle edits here
            await pizza.save()
        }
        await pizza.save();
        console.log(pizza)
        return { status: "Successfully added pizza", ids: { id: pizza._id, pizza_id: pizza.pizza_id } }
    } else {
        return { message: "Unkown Pizza ID" }
    }
}

module.exports = {
    getPizzas,
    addPizza,
}