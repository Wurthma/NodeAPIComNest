import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateCustomerContract } from '../contracts/customer/create-customer.contract';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { QueryDto } from '../dtos/query.dto';
import { Customer } from '../models/customer.model';
import { Result } from '../models/result.models';
import { User } from '../models/user.model';
import { AccountService } from '../services/account.service';
import { CustomerService } from '../services/customer.service';

// localhost:3000/v1/customers
@Controller('v1/customers')
export class CustomerController {
  constructor(private readonly accountService: AccountService,
    private readonly customerService: CustomerService,) { }

  @Get()
  async getAll() {
    const customers = await this.customerService.findAll();
    return new Result('Busca realizada com sucesso!', true, customers, null);
  }

  @Get(':document')
  async get(@Param('document') document: string) {
    const customer = await this.customerService.find(document);
    return new Result('Busca realizada com sucesso!', true, customer, null);
  }

  @Post('query')
  async query(@Body() queryDto: QueryDto) {
    var customers = await this.customerService.query(queryDto);
    return new Result('Consulta realizada com sucesso', true, customers, null);
  }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  async post(@Body() model: CreateCustomerDto) {
    try {
      const user = await this.accountService.create(
        new User(model.document, model.password, true)
      );

      const customer = new Customer(model.name, model.document, model.email, null, null, null, null, user);
      const customerResult = await this.customerService.create(customer);

      return new Result('Cliente criado com sucesso!', true, customerResult, null);
    }
    catch (error) {
      // Rollback manual
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