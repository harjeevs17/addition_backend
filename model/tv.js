const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tvSchema = new Schema({
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
		type:Number
	},
	review:{
		type:String
	}
},
{
    timestamps:true
});

var tv = mongoose.model('tv',tvSchema);
module.exports = tv;