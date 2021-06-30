import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address } from '../models/address.model';
import { Customer } from '../models/customer.model';
import { Pet } from '../models/pet.model';

@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) { }

    async create(data: Customer): Promise<Customer> {
        const customer = new this.model(data);
        return await customer.save();
    }

    async addBillingAddress(document: string, data: Address): Promise<Customer> {
        return await this.model.findOneAndUpdate({ document }, {
            $set: {
                billingAddress: data,
            },
        },
            { upsert: true });
    }

    async addShippingAddress(document: string, data: Address): Promise<Customer> {
        return await this.model.findOneAndUpdate({ document }, {
            $set: {
                shippingAddress: data,
            },
        },
            { upsert: true });
    }

    async createPet(document: string, data: Pet): Promise<Customer> {
        return await this.model.findOneAndUpdate({ document }, {
            $push: {
                pets: data,
            },
        },
            { upsert: true, new: true });
    }

    async updatePet(document: string, id: string, data: Pet): Promise<Customer> {
        return await this.model.findOneAndUpdate({ document, 'pets._id': id }, {
            $set: {
                'pets.$': data,
            },
        },
            { upsert: true, new: true });
    }

    async findAll(): Promise<Customer[]> {
        return await this.model
            .find({}, 'name email document')
            .sort('name')
            .exec();
    }

    async find(document: string): Promise<Customer[]> {
        return await this.model
            .find({ document }, 'name email document')
            .populate('user', 'username')
            .exec();
    }
}