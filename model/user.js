'use strict';

var mongoose = require('mongoose'),
		assert = require('assert'),
		Schema = mongoose.Schema,
		txtOnly = /^(?:[a-zA-Z])+$/;

//Strategies Schema
var strategySchema = new Schema({
	type : {
		type : String,
		required : true
	},
	password : {
		salt : { 
			type : String,
			required : true
		},
		hash : {
			type : String,
			required : true
		}
	}
});

//Token Schema
var tokenSchema = new Schema({
	hash : String,
	createdDate : {
		type : Date,
		default : Date.now
	},
	expiredDate : {
		type : Date,
		expires : '7d'
	}
});

//User Schema
var userSchema = new Schema({
	first : String,
	last : String,
	email : { 
		type : String , 
		unique : true 
	},
	birthdate : Date,
	gender : String,
	address : {
		street : String,
		no : String,
		city : String,
		zip : String,
		state : String,
		country : String
	},
	phone : String,
	strategies : [strategySchema],
	tokens : [tokenSchema]   
});

//custom validation
// @first only text
userSchema
	.path('first')
	.validate(function(value) {
		try {
			assert.strictEqual(typeof value , 'string');
			assert.ok(txtOnly.test(value));
		}
		catch (e) {
			return false;
		}
		return true;
	} , 'first is invalid');

// @last only text
userSchema
	.path('last')
	.validate(function(value) {
		try {
			assert.strictEqual(typeof value , 'string');
			assert.ok(txtOnly.test(value));
		}
		catch (e) {
			return false;
		}
		return true;
	} , 'last is invalid');

// @email only valid email
userSchema
	.path('email')
	.validate(function(value) {
		try {
			assert.strictEqual(typeof value , 'string');
			assert.ok(/^(?:[a-z0-9A-Z_.-]+)@(?:[A-Z0-9a-z_-]+).(?:[a-zA-Z]+)/.test(value));
		}
		catch (e) {
			return false;
		}
		return true;
	} , 'email is invalid');

module.exports = mongoose.model('User' , userSchema);

