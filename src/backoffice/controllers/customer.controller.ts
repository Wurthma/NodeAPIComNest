import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateAddressContract } from '../contracts/customer/create-address.contract';
import { CreateCustomerContract } from '../contracts/customer/create-customer.contract';
import { CreateAddressDto } from '../dtos/create-address-dto';
import { CreateCustomerDto } from '../dtos/create-customer-dto';
import { Customer } from '../models/customer.model';
import { Result } from '../models/result.models';
import { User } from '../models/user.model';
import { AccountService } from '../services/account.service';
import { CustomerService } from '../services/customer.service';

// localhost:3000/v1/customers
@Controller('v1/customers')
export class CustomerController {
  constructor(private readonly accountService: AccountService,
    private readonly customerService: CustomerService,) 
  {}
  
  @Get()
  get() {
    return new Result(null, true, [], null);
  }

  @Get(':document')
  getById(@Param('document') document) {
    return new Result(null, true, {}, null);
  }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  async post(@Body() model: CreateCustomerDto) {
    try
    {
      const user = await this.accountService.create(
        new User(model.document, model.password, true)
      );
  
      const customer = new Customer(model.name, model.document, model.email, null, null, null, null, user);
      const customerResult = await this.customerService.create(customer);
  
      return new Result('Cliente criado com sucesso!', true, customerResult, null);
    }
    catch (error)
    {
      // Rollback manual
      throw new HttpException(new Result('Não foi possível realizar seu cadastro', false, null, error), HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':document/addresses/billing')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addBillingAddress(@Param('document') document,@Body() model: CreateAddressDto) {
    try
    {
      const result = await this.customerService.addBillingAddress(document, model);
      return result;
    }
    catch (error)
    {
      throw new HttpException(new Result('Não foi possível realizar seu cadastro', false, null, error), HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':document')
  put(@Param('document') document, @Body() body: CreateCustomerDto) {
    return new Result('Cliente alterado com sucesso', true, body, null);
  }

  @Delete()
  delete(@Body() body: CreateCustomerDto) {
    return new Result('Cliente removido com sucesso', true, body, null);
  }
}