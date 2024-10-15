const Order = require("../models/order");

async function getOrders() {
    return await Order.find()
        .then(data => {
            return data;
        })
        .catch(err => {
            return { status: 500, message: "Error retrieving orders from MongoDB" };
        });
}

async function addOrder(order_data) {
    let order = new Order(order_data);
    return await order.save()
        .then(() => {
            return { id: order.id, message: "Order successfully added to MongoDB" };
        })
        .catch(err => {
            console.log(err)
            return { status: 500, message: "Error creating new order", error: err };
        });
}

module.exports = {
    getOrders,
    addOrder,
}