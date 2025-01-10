import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ConfigModule } from '@nestjs/config';
import { ProductsService } from '../product-modules/products/products.service';
import { PrismaService } from 'src/database/prisma.service';
import { FilesService } from '../files/files.service';
import { ProductImagesService } from '../product-modules/product-images/product-images.service';
import { CategoriesService } from '../product-modules/categories/categories.service';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
    ConfigModule,
  ],
  controllers: [UploadController],
  providers: [
    UploadService,
    ProductsService,
    CategoriesService,
    PrismaService,
    ProductImagesService,
    FilesService,
  ],
})
export class UploadModule {}
