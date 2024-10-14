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
                return ["S", "M", "L", "F"].includes(value);
            },
            message: "Pizza size must be S, M, L, or F (small, medium, large, or family)"
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
    const prices = {
        "side": {
            "S": 9,
            "M": 11,
            "L": 14,
            "F": 17,
        },
        "traditional": {
            "S": 15.90,
            "M": 18.90,
            "L": 21.90,
            "F": 25.90,
        },
        "gourmet": {
            "S": 17.90,
            "M": 20.90,
            "L": 23.90,
            "F": 27.90,
        },
    };
    this.price = prices[this.class][this.size];
    next();
});

module.exports = mongoose.model("pizza", pizzaSchema);