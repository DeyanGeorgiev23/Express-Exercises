const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = (settings) => {
    mongoose.connect(settings.db, err => {
        if (err) {
            console.log(err);
            return;
        }

        console.log('MondoDb ready and running...');
    });
};