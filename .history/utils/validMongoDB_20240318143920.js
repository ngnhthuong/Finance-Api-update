const mongoose = require('mongoose');
const validIdMogo = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new Error('Invalid ID');
}

module.exports =  validIdMogo;