import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateProductDTO } from "./dto/create-product.dto";
import { ProductRepository } from "./product.repository";


@Controller('products')
export class ProductController{

    constructor (private productRepository: ProductRepository) {}

    @Post()
    async createProduct(@Body() dataProduct:CreateProductDTO){
        this.productRepository.save(dataProduct);
        return dataProduct;
    }

    @Get()
    async listProducts(){
        return this.productRepository.list();
    }
}