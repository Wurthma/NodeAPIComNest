import { Injectable } from "@nestjs/common";
import * as Joi from '@hapi/joi';
import { ContractBase } from "../contractsBase";

const Contract = Joi.object({
    query: Joi.object()
        .required(),

    fields: Joi.string(),

    sort: Joi.string(),

    skip: Joi.number()
        .required(),

    take: Joi.number()
        .min(1)
        .max(1000)
        .required(),

    active: Joi.boolean(),
});

@Injectable()
export class QueryContract extends ContractBase {
    constructor() {
        super(Contract);
    }
}