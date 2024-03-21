const  {Joi}  = require("express-validation")

const authValidation ={
    signIn:{body:Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().required()
    })},
    register:{
        body:Joi.object({
            email:Joi.string().email().required(),
            password:Joi.string().required(),
            username:Joi.string().required()
        })
    },
    regenerateToken:{
        body:Joi.object({
            email:Joi.string().email().required(),
        })
    }
}

module.exports = authValidation