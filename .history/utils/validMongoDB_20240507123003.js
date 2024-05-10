const mongoose = require('mongoose');
const validIdMono = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new Error('Invalid ID');
}

module.exports =  validIdMono;