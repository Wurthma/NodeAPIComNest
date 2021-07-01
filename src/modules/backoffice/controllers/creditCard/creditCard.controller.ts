import { Body, Controller, HttpException, HttpStatus, Param, Post, UseInterceptors } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateCreditContract } from '../../contracts/creditCard/create-creditCard.contract';
import { CreateCreditCardDto } from '../../dtos/creditCard/create-creditCard.dto';
import { Result } from '../../models/result.models';
import { CreditCardService } from '../../services/creditCard.service';

@Controller('v1/customers')
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService,) { }
  
  @Post(':document/credit-cards')
  @UseInterceptors(new ValidatorInterceptor(new CreateCreditContract()))
  async createCreditCard(@Param('document') document: string, @Body() model: CreateCreditCardDto) {
    try {
      await this.creditCardService.saveOrUpdateCreditCard(document, model);
      return new Result('Cartão de crédito criado com sucesso!', true, model, null);
    }
    catch (error) {
      throw new HttpException(new Result('Não foi possível criar seu cartão de crédito', false, null, error), HttpStatus.BAD_REQUEST);
    }
  }
}