import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCreditCardDto } from '../dtos/creditCard/create-creditCard.dto';
import { Customer } from '../models/customer.model';

@Injectable()
export class CreditCardService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) { }

    async saveOrUpdateCreditCard(document: string, data: CreateCreditCardDto): Promise<Customer> {
        return await this.model.findOneAndUpdate({ document }, {
            $set: {
                card: data,
            },
        },
            { upsert: true, new: true });
    }
}