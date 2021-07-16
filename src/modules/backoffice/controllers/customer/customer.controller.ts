import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateCustomerContract } from '../../contracts/customer/create-customer.contract';
import { UpdateCustomerContract } from '../../contracts/customer/update-customer.contract';
import { QueryContract } from '../../contracts/query/query.contracts';
import { CreateCustomerDto } from '../../dtos/customer/create-customer.dto';
import { UpdateCustomerDto } from '../../dtos/customer/update-customer.dto';
import { QueryDto } from '../../dtos/query.dto';
import { Customer } from '../../models/customer.model';
import { Result } from '../../models/result.models';
import { User } from '../../models/user.model';
import { AccountService } from '../../services/account.service';
import { CustomerService } from '../../services/customer.service';

// localhost:3000/backoffice/v1/customers
@Controller('backoffice/v1/customers')
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
  @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
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
  @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
  async update(@Param('document') document, @Body() model: UpdateCustomerDto) {
    try {
      await this.customerService.update(document, model);
      return new Result('Cliente atualizado com sucesso!', true, model, null);
    }
    catch (error) {
      throw new HttpException(new Result('Não foi possível atualizar os dados do cliente', false, null, error), HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  delete(@Body() body: CreateCustomerDto) {
    return new Result('Cliente removido com sucesso', true, body, null);
  }
}