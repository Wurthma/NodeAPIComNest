import { Injectable } from "@nestjs/common";
import { Customer } from "../models/customer.model";
import { Contract } from "./contracts";

@Injectable()
export abstract class ContractBase implements Contract {
    errors: any[];

    constructor(private schema: any) { }

    validate(model: Customer): boolean {
        const { error } = this.schema.validate(model);

        if (error) {
            this.errors = error.details;
            return false;
        }

        return true;
    }
}