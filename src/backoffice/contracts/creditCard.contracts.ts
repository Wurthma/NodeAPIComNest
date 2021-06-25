import { Injectable } from "@nestjs/common";
import * as Joi from '@hapi/joi';
import { ContractBase } from "./contractsBase";

export const CreditCardSchema = Joi.object({
    holder: Joi.string()
        .min(3)
        .max(30)
        .required(),

    number: Joi.string()
        .min(16)
        .max(16)
        .required(),

    expiration: Joi.date()
        .greater('now')
        .required(),
});

@Injectable()
export class CreateCreditContract extends ContractBase {
    constructor() {
        super(CreditCardSchema);
    }
}