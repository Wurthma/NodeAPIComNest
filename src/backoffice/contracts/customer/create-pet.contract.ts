import { Injectable } from "@nestjs/common";
import * as Joi from '@hapi/joi';
import { ContractBase } from "../contractsBase";

const PetContract = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    
    gender: Joi.string()
        .min(3)
        .max(10)
        .required(),

    kind: Joi.string()
        .min(3)
        .max(20)
        .required(),

    race: Joi.string()
        .min(3)
        .max(30)
        .required(),
});

@Injectable()
export class CreatePetContract extends ContractBase {
    constructor() {
        super(PetContract);
    }
}