import { Body, Controller, HttpException, HttpStatus, Param, Post, UseInterceptors } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateAddressContract } from '../../contracts/address/create-address.contract';
import { CreateAddressDto } from '../../dtos/address/create-address.dto';
import { Result } from '../../models/result.models';
import { AddressService } from '../../services/address.service';

@Controller('backoffice/v1/customers/')
export class AddressController {
  constructor(private readonly addressService: AddressService,) { }

  @Post(':document/addresses/billing')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addBillingAddress(@Param('document') document: string, @Body() model: CreateAddressDto) {
    try {
      await this.addressService.addBillingAddress(document, model);
      return new Result('Endereço incluído com sucesso.', true, model, null);
    }
    catch (error) {
      throw new HttpException(new Result('Não foi possível realizar seu cadastro', false, null, error), HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':document/addresses/shipping')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addShippingAddress(@Param('document') document: string, @Body() model: CreateAddressDto) {
    try {
      await this.addressService.addShippingAddress(document, model);
      return new Result('Endereço incluído com sucesso.', true, model, null);
    }
    catch (error) {
      throw new HttpException(new Result('Não foi possível realizar seu cadastro', false, null, error), HttpStatus.BAD_REQUEST);
    }
  }
}