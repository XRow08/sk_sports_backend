import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UploadDto } from './dto/upload.dto';
import { Public } from 'src/middlewares/PublicMiddleware';

@ApiTags('Upload')
@Controller('/api/v1/upload')
export class UploadController {
  @Post('image')
  @Public()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload de imagem' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'Arquivo de imagem', type: UploadDto })
  @ApiResponse({
    status: 201,
    description: 'Imagem carregada e comprimida com sucesso',
  })
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const imageUrl = `http://localhost:3333/${file.path}`;
    return { message: 'Success!', imageUrl };
  }
}
