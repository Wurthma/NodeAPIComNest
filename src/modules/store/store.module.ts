import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/product.controller';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';
import { OrderItemService } from './services/order-item.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        Product,
        Order,
        OrderItem,
    ])],
    providers: [
        ProductService,
        OrderService,
        OrderItemService,
    ],
    controllers: [
        ProductController,
    ],
})
export class StoreModule {}
