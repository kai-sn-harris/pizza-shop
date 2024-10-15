const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
        validate: {
            validator: function(value) {
                // letters only allowed in name
                return value.length > 0 && value.match(/^[a-zA-z]+$/);
            },
            message: "Name must not be blank and must only include letters"
        }
    },
    items: {
        type: mongoose.Schema.Types.Array,
        // would you have an empty order?
        required: true,
        validate: {
            validator: function(value) {
                return value.length !== 0;
            },
            message: "Order must contain items"
        }
    },
    cost: {
        type: mongoose.Schema.Types.Number,
        // calculated in pre-save hook
        required: false
    }
});

orderSchema.pre("save", function(next) {
    let prices = require("./pizza_prices.json");
    let pizzaBoilerplate = require("./pizza_boilerplate");
    this.cost = 0
    this.items.forEach(item => {
        let pizza = pizzaBoilerplate[item.id];
        this.cost += prices[pizza.class][item.size];
    });
    next();
});

module.exports = mongoose.model("order", orderSchema);