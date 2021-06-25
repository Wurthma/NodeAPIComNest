import { Injectable } from "@nestjs/common";
import * as Joi from '@hapi/joi';
import { ContractBase } from "./contractsBase";

export const AddressSchema = Joi.object({
    zipCode: Joi.string()
        .min(8)
        .max(15)
        .required(),

    street: Joi.string()
        .min(3)
        .max(50)
        .required(),

    number: Joi.string()
        .min(3)
        .max(10)
        .required(),

    complement: Joi.string()
        .min(3)
        .max(20)
        .required(),

    neighborhood: Joi.string()
        .min(3)
        .max(20)
        .required(),

    city: Joi.string()
        .min(3)
        .max(20)
        .required(),

    state: Joi.string()
        .min(2)
        .max(2)
        .required(),

    country: Joi.string()
        .min(3)
        .max(20)
        .required(),
});

@Injectable()
export class CreateAddressContract extends ContractBase {
    constructor() {
        super(AddressSchema);
    }
}