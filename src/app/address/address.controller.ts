import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/middlewares/PublicMiddleware';

@ApiTags('Address')
@Controller('api/v1/address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Cria o(a) address' })
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.createNew(createAddressDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os address' })
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista um(a) address' })
  findOne(@Param('id') id: string) {
    return this.addressService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um(a) address' })
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.updateById(id, updateAddressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um(a) address' })
  remove(@Param('id') id: string) {
    return this.addressService.deleteById(id);
  }
}
