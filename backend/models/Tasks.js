const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    tasks: {
        type:String,
        required: true,
        trim: true,
    },

    createdAt:{
        type: Date,
        default: Date.now,
    },

});


const Tasks = mongoose.model("Tasks", TaskSchema);

module.exports = Tasks;
