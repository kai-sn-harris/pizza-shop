const Pizza = require("../models/pizza");

const pizzaBoilerplate = require("../models/pizza_boilerplate");

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
        }
        try {
            // price calculated in pre-save hook
            await pizza.save();
            console.log(pizza);
                return { status: "Successfully added pizza", ids: { id: pizza._id, pizza_id: pizza.pizza_id } }
        } catch(err) {
            return { status: "Something went wrong", error: err };
        }
    } else {
        return { message: "Unkown Pizza ID" }
    }
}

module.exports = {
    getPizzas,
    addPizza,
}