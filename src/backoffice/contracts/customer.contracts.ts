import { Injectable } from "@nestjs/common";
import * as Joi from '@hapi/joi';
import { Customer } from "../models/customer.model";
import { Contract } from "./contracts";

@Injectable()
export class CreateCustomerContract implements Contract {
    errors: any[];
    

    validate(model: Customer): boolean {
        // Contrato
        const schema = Joi.object({
            name: Joi.string()
                .min(3)
                .max(30)
                .required(),
    
            document: Joi.string()
                .alphanum()
                .min(11)
                .max(11)
                .required(),
    
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        });
        
        const { error } = schema.validate(model);

        if (error) 
        {
            this.errors = error.details;
            return false;
        }

        return true;
    }
}