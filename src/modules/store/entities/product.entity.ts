import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "products"})
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 80 })
    title: string;

    @Column({ length: 4000 })
    description: string;
}