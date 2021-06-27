import { Injectable } from "@nestjs/common";
import * as Joi from '@hapi/joi';
import { ContractBase } from "./contractsBase";

const CustomerContract = Joi.object({
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
        .min(6)
        .max(30)
        .required(),
});

@Injectable()
export class CreateCustomerContract extends ContractBase {
    constructor() {
        super(CustomerContract);
    }
}