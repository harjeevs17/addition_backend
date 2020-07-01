const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
	title:{
        type:String,
        required:true
    },
	description:{
        type:String,
        required:true
    },
	f_image:{
        type:String,
    },
	b_image:{
        type:String,
    },
	status:{
		type:Number,
		required:true
	},
	rating:{
		type:Number
	},
	id:{
		type:String
	},
	review:{
		type:String
	}
},
{
    timestamps:true
});

var book = mongoose.model('book',bookSchema);
module.exports = book;