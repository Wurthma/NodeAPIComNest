import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddressType } from '../enums/address-type.enum';
import { Address } from '../models/address.model';
import { Customer } from '../models/customer.model';

@Injectable()
export class AddressService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) { }

    async addBillingAddress(document: string, data: Address): Promise<Customer> {
        return await this.addAddressByType(document, data, AddressType.Billing);
    }

    async addShippingAddress(document: string, data: Address): Promise<Customer> {
        return await this.addAddressByType(document, data, AddressType.Shipping);
    }

    private async addAddressByType(document: string, data: Address, addressType: AddressType): Promise<Customer> {
        if (addressType === AddressType.Billing) {
            return await this.model.findOneAndUpdate({ document }, {
                $set: {
                    billingAddress: data,
                },
            },
                { upsert: true });
        }
        else {
            return await this.model.findOneAndUpdate({ document }, {
                $set: {
                    shippingAddress: data,
                },
            },
                { upsert: true });
        }
    }
}