import Joi from "joi";
import { Customer } from "../models/customer.model";
import { Contract } from "./contracts";

export class CreateCustomerContract implements Contract {
    errors: any[];

    // Contrato
    private schema: Joi.ObjectSchema = 
    Joi.object({
        name: Joi.string()
            .alphanum()
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

    validate(model: Customer): boolean {
        const { error, value } = this.schema.validate(model);

        if (error) 
        {
            this.errors = value;
            return true;
        }

        return false;
    }
}