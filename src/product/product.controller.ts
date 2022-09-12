import {
  Body,
  CacheInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AtGuard } from '../common/guards/at.guard';
import { Serialize } from '../common/interceptors/serialize.interceptor';
import { ProductDTO } from './dto/product.dto';
import { CreateProductDTO } from './dto/create-product.dto';

@ApiResponse({
  status: 401,
  description: 'Hali hazırda kullanıcı kayıtlıysa dönecektir',
})
@Controller('product')
@ApiTags('product')
@Serialize(ProductDTO)
export class ProductController {
  constructor(private service: ProductService) {}

  @Post('')
  @ApiOperation({
    summary: 'Cüzdan hareketlerini listelemek amacıyla kullanılır',
  })
  @ApiResponse({ status: 200, description: 'Cüzdan hareketlerini dönecektir' })
  @ApiResponse({
    status: 400,
    description: 'Cüzdan hareketi yok ise dönecektir',
  })
  @HttpCode(HttpStatus.OK)
  async save(@Body() product: CreateProductDTO) {
    return await this.service.save(product);
  }

  @UseInterceptors(CacheInterceptor)
  @Get('')
  @ApiOperation({
    summary: 'Cüzdan hareketlerini tarihe göre listelemek amacıyla kullanılır',
  })
  @ApiResponse({ status: 200, description: 'Cüzdan hareketlerini dönecektir' })
  @ApiResponse({
    status: 400,
    description: 'Cüzdan hareketi yok ise dönecektir',
  })
  @HttpCode(HttpStatus.OK)
  async all() {
    return await this.service.all();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Cüzdan hareketlerini listelemek amacıyla kullanılır',
  })
  @ApiResponse({ status: 200, description: 'Cüzdan hareketlerini dönecektir' })
  @ApiResponse({
    status: 400,
    description: 'Cüzdan hareketi yok ise dönecektir',
  })
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: number) {
    return await this.service.findById(id);
  }
  @Get('category/:id')
  @ApiOperation({
    summary: 'Cüzdan hareketlerini listelemek amacıyla kullanılır',
  })
  @ApiResponse({ status: 200, description: 'Cüzdan hareketlerini dönecektir' })
  @ApiResponse({
    status: 400,
    description: 'Cüzdan hareketi yok ise dönecektir',
  })
  @HttpCode(HttpStatus.OK)
  async findByCategoryId(@Param('id') id: number) {
    return await this.service.findBycategoryId(id);
  }
}
