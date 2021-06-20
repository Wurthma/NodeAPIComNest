import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Customer } from '../models/customer.model';

// localhost:3000/v1/customers
@Controller('v1/customers')
export class CustomerController {
  @Get()
  get() {
    return 'Obter os cliente';
  }

  @Get(':document')
  getById(@Param('document') document) {
    return 'Obter os cliente ' + document;
  }

  @Post()
  post(@Body() body: Customer) {
    return body;
  }

  @Put(':document')
  put(@Param('document') document, @Body() body: Customer) {
    return {
      customer: document,
      data: body
    };
  }

  @Delete()
  delete(@Body() body: Customer) {
    return body;
  }
}