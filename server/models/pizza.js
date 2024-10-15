const mongoose = require("mongoose");

const pizzaSchema = mongoose.Schema({
    class: {
        type: mongoose.Schema.Types.String,
        required: true,
        validate: {
            validator: function(value) {
                return value.length > 0 && ["traditional", "gourmet", "side"].includes(value);
            },
            message: "Pizza class must not be blank"
        }
    },
    pizza_id: {
        type: mongoose.Schema.Types.Number,
        unique: false,
    },
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
        validate: {
            validator: function(value) {
                return value.length > 0;
            },
            message: "Pizza name must not be blank"
        }
    },
    vegetarian: {
        type: mongoose.Schema.Types.Boolean,
        required: true
    },
    size: {
        type: mongoose.Schema.Types.String,
        required: true,
        validate: {
            validator: function(value) {
                if(this.name === "bruschetta") return value === "S";
                return ["S", "M", "L", "F"].includes(value);
            },
            message: "Pizza size must be S, M, L, or F (small, medium, large, or family) note: Bruschetta must be size S"
        }
    },
    toppings: {
        type: mongoose.Schema.Types.Array,
        required: true
        // decided not to include a validator as some maniacs may want a completely bald pizza
    },
    // we won't require this as we will calculate it in the pre-save hook
    price: {
        type: mongoose.Schema.Types.Number,
    }
});

pizzaSchema.pre("save", function(next) {
    let prices = require("./pizza_prices.json");
    this.price = prices[this.class][this.size];
    next();
});

module.exports = mongoose.model("pizza", pizzaSchema);