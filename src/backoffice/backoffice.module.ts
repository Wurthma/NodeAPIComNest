import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerController } from './controllers/customer.controller';
import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Costumer',
        schema: CustomerSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      }
    ])],
  controllers: [CustomerController],
})
export class BackofficeModule { }
