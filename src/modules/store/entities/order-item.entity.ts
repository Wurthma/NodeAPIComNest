import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./product.entity";

@Entity({name: "orderItems"})
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, (o) => o.items)
    order: Order;

    @ManyToOne(() => Product, (p) => p)
    product: Product;

    @Column('decimal')
    price: number;

    @Column('integer')
    quantity: number;
}