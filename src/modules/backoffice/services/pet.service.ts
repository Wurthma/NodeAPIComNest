import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../models/customer.model';
import { Pet } from '../models/pet.model';

@Injectable()
export class PetService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) { }

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
}