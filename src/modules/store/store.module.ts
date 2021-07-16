import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/product.controller';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';
import { ProductService } from './services/product.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        Product,
        Order,
        OrderItem,
    ])],
    providers: [
        ProductService,
    ],
    controllers: [
        ProductController,
    ],
})
export class StoreModule {}
