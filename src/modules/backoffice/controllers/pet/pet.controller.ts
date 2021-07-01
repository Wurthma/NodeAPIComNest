import { Body, Put, Controller, HttpException, HttpStatus, Param, Post, UseInterceptors } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreatePetContract } from '../../contracts/pet/create-pet.contract';
import { CreatePetDto } from '../../dtos/pet/create-pet.dto';
import { Result } from '../../models/result.models';
import { PetService } from '../../services/pet.service';

@Controller('v1/customers/')
export class PetController {
  constructor(private readonly petService: PetService,) { }

  @Post(':document/pets')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async createPet(@Param('document') document: string, @Body() model: CreatePetDto) {
    try {
      await this.petService.createPet(document, model);
      return new Result('Pet incluído com sucesso.', true, model, null);
    }
    catch (error) {
      throw new HttpException(new Result('Não foi possível realizar seu cadastro', false, null, error), HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':document/pets/:id')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async updatePet(@Param('document') document: string, @Param('id') id: string, @Body() model: CreatePetDto) {
    try {
      await this.petService.updatePet(document, id, model);
      return new Result('Pet atualizado com sucesso.', true, model, null);
    }
    catch (error) {
      throw new HttpException(new Result('Não foi possível atualizar o pet', false, null, error), HttpStatus.BAD_REQUEST);
    }
  }
}