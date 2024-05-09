import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  handle: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  sku: string;

  @Column()
  grams: number;

  @Column()
  stock: number;

  @Column()
  price: number;

  @Column()
  compare_price: number;

  @Column()
  barcode: string;
}
