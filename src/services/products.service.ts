import { FindProductDto } from '../dtos/products-find.dto';
import { CreateProductDto } from '../dtos/products.dto';
import HttpException from '../exceptions/HttpException';
import { Product } from '../interfaces/products.interface';
import productModel from '../models/products.model';
import { isEmpty } from '../utils/util';

class ProductService {
  public products = productModel;

  public async findAllProduct({ search, type }: FindProductDto): Promise<Product[]> {
    let filter = {};
    if (type && search) {
      filter =
        type === 'id'
          ? { id: search }
          : {
              $or: [{ brand: { $regex: '.*' + search + '.*', $options: 'i' } }, { description: { $regex: '.*' + search + '.*', $options: 'i' } }],
            };
    }
    const products: Product[] = await this.products.find(filter);
    return products;
  }

  public async findProductById(productId: string): Promise<Product> {
    const findProduct: Product = await this.products.findOne({ _id: productId });
    if (!findProduct) throw new HttpException(409, "You're not product");

    return findProduct;
  }

  public async createProduct(productData: CreateProductDto): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, "You're not productData");

    const findProduct: Product = await this.products.findOne({ id: productData.id });
    if (findProduct) throw new HttpException(409, `You're id ${productData.id} already exists`);

    const createProductData: Product = await this.products.create(productData);
    return createProductData;
  }

  public async updateProduct(productId: string, productData: Product): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, "You're not productData");

    const updateProductById: Product = await this.products.findByIdAndUpdate(productId, productData);
    if (!updateProductById) throw new HttpException(409, "You're not product");

    return updateProductById;
  }

  public async deleteProductData(productId: string): Promise<Product> {
    const deleteProductById: Product = await this.products.findByIdAndDelete(productId);
    if (!deleteProductById) throw new HttpException(409, "You're not product");

    return deleteProductById;
  }
}

export default ProductService;
