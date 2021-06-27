import { Injectable } from "@nestjs/common";
import * as Joi from '@hapi/joi';
import { ContractBase } from "./contractsBase";

const UserContract = Joi.object({
    username: Joi.string()
        .min(3)
        .max(20)
        .required(),

    password: Joi.string()
        .min(6)
        .max(30)
        .required(),

    active: Joi.boolean(),
});

@Injectable()
export class CreateUserContract extends ContractBase {
    constructor() {
        super(UserContract);
    }
}