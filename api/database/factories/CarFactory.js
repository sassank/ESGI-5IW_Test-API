const Car = require('../models/Car');

const defaultValues = {
    brand: 'Wolskwagen',
    color: 'red',
    year: 2018
};

Car.factory = {
    addMany: async (count = 5) => {
        let cars = [];
        for (let i = 0; i < count; i++) {
            cars.push(await Car.create(defaultValues));
        }
        return cars;
    },
    addOne: async (brand = null, color = null, year = null) => {
        const defaults = defaultValues;
        if(brand !== null) {
            defaults.brand = brand;
        }
        if(color !== null) {
            defaults.color = color;
        }
        if(year !== null) {
            defaults.year = year;
        }
        return await Car.create(defaults);
    }
};