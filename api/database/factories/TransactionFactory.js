const Transaction = require('../models/Transaction');

const defaultValues = {
    price: 3500,
};

Transaction.factory = {
    addMany: async (count = 5) => {
        let cars = [];
        for (let i = 0; i < count; i++) {
            cars.push(await Transaction.create(defaultValues));
        }
        return cars;
    },
    addOne: async (price = null) => {
        const defaults = defaultValues;
        if (price !== null) {
            defaults.price = price;
        }
        return await Transaction.create(defaults);
    }
};