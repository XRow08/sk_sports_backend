import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { ProductImagesService } from './product-images.service';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { UploadImageDto } from './dto/upload-image.dto';
import { Public } from 'src/middlewares/PublicMiddleware';

@ApiTags('Product Images')
@Controller('api/v1/product-images')
export class ProductImagesController {
  constructor(private readonly service: ProductImagesService) {}

  @Post('image')
  @Public()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload de imagem' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'Arquivo de imagem', type: UploadImageDto })
  @ApiResponse({
    status: 201,
    description: 'Imagem carregada e comprimida com sucesso',
  })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: UploadImageDto,
    @Req() request: Request,
  ) {
    const protocol = request.protocol;
    const hostname = request.hostname;
    const port = request.socket.localPort;
    const fullUrl = `${protocol}://${hostname}${port ? `:${port}` : ''}`;
    const imageUrl = `${fullUrl}/${file.path}`;
    return await this.service.create(data, imageUrl);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos as imagens de produtos' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Lista uma unica imagem de produto pelo id' })
  findOne(@Param('id') id: string) {
    return this.service.findOneById(id);
  }

  @Get('product/:product_id')
  @Public()
  @ApiOperation({ summary: 'Lista imagens de um produto pelo id' })
  findAllByProduct(@Param('product_id') product_id: string) {
    return this.service.findAllByProduct(product_id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma unica imagem de produto pelo id' })
  update(@Param('id') id: string, @Body() data: UpdateProductImageDto) {
    return this.service.updateById(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma unica imagem de produto pelo id' })
  remove(@Param('id') id: string) {
    return this.service.deleteById(id);
  }
}
