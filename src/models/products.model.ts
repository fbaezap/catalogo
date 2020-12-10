import mongoose from 'mongoose';
import { Product } from '../interfaces/products.interface';

const productSchema = new mongoose.Schema({
  id: String,
  brand: String,
  image: String,
  name: String,
  description: String,
  price: Number,
});

const productModel = mongoose.model<Product & mongoose.Document>('Product', productSchema);

export default productModel;
