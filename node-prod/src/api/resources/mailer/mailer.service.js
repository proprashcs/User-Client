import Joi from 'joi';
export default{
    validateMaiilerSchema(body){
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            to: Joi.string().email().required(),
            subject: Joi.string().required(),
            content: Joi.string().required()
           
          });
          const {error, value} = Joi.validate(body, schema);
          if(error && error.details){
              return {error};
          }
          return {value};
    }
}