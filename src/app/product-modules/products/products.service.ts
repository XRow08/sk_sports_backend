import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/database/prisma.service';
import { ProductImagesService } from '../product-images/product-images.service';
import { Prisma, Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productImagesService: ProductImagesService,
  ) {}

  async createSlug(name: string) {
    return name
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  async create(data: CreateProductDto) {
    try {
      data.slug = await this.createSlug(data.name);
      const product = await this.prisma.product.create({ data });
      return await this.getImages(product);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const products = await this.prisma.product.findMany({
      where: { deletedAt: null },
      skip: offset,
      take: limit,
      include: { rateProduct: true },
    });
    return await Promise.all(
      products.map(async (product) => {
        return await this.getImages(product);
      }),
    );
  }

  async findAllByTerm(term: string, page: number, limit: number) {
    const offset = (page - 1) * limit;
    const products = await this.prisma.product.findMany({
      where: {
        OR: [{ name: { contains: term, mode: 'insensitive' } }],
      },
      skip: offset,
      take: limit,
      include: {
        rateProduct: true,
      },
    });
    const allProducts = await Promise.all(
      products.map(async (product) => {
        return await this.getImages(product);
      }),
    );
    return allProducts;
  }

  async findOneByName(name: string) {
    try {
      const product = await this.prisma.product.findFirstOrThrow({
        where: { name, deletedAt: null },
        include: { rateProduct: true },
      });
      return await this.getImages(product);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneBySlug(slug: string) {
    try {
      const product = await this.prisma.product.findFirstOrThrow({
        where: { slug, deletedAt: null },
        include: { rateProduct: true },
      });
      return await this.getImages(product);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneById(id: string) {
    try {
      const product = await this.prisma.product.findFirstOrThrow({
        where: { id, deletedAt: null },
        include: { rateProduct: true },
      });
      return await this.getImages(product);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async getImages(product: any) {
    const imagesProduct = await this.productImagesService.findAllByProduct(
      product.id,
    );
    const images = [];
    imagesProduct.forEach((e) => {
      images.push(e?.file?.url);
    });
    delete product.ProductImages;
    const productWimages = { ...product, images };
    return productWimages as Product;
  }

  async updateById(id: string, data: UpdateProductDto) {
    return await this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: string) {
    try {
      await this.prisma.product.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw new NotFoundException(`product with id ${id} not found`);
    }
  }
}
