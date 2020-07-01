const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchSchema = new Schema({
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

var watchs = mongoose.model('Watch',watchSchema);
module.exports = watchs;

