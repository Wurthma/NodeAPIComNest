import { Injectable } from "@nestjs/common";
import * as Joi from '@hapi/joi';
import { ContractBase } from "../contractsBase";

const Contract = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
});

@Injectable()
export class UpdateCustomerContract extends ContractBase {
    constructor() {
        super(Contract);
    }
}