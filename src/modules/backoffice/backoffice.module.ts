import { CacheModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/shared/services/auth.service';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';
import { AccountController } from './controllers/account/account.controller';
import { AddressController } from './controllers/address/address.controller';
import { CreditCardController } from './controllers/creditCard/creditCard.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { PetController } from './controllers/pet/pet.controller';
import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';
import { AccountService } from './services/account.service';
import { AddressService } from './services/address.service';
import { CreditCardService } from './services/creditCard.service';
import { CustomerService } from './services/customer.service';
import { PetService } from './services/pet.service';

@Module({
  imports: [
    CacheModule.register(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_STRATEGY_KEY,
      signOptions: {
        expiresIn: 3600
      }
    }),
    MongooseModule.forFeature(
    [
      {
        name: 'Customer',
        schema: CustomerSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      }
    ])],
  controllers: [
    AccountController,
    AddressController,
    CreditCardController,
    CustomerController,
    PetController,
  ],
  providers: [
    AccountService, 
    AddressService,
    CreditCardService,
    CustomerService,
    PetService,
    AuthService,
    JwtStrategy,
  ],
})
export class BackofficeModule { }
