import { isString, minLength } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { FindProductDto } from '../dtos/products-find.dto';
import { CreateProductDto } from '../dtos/products.dto';
import HttpException from '../exceptions/HttpException';
import { Product } from '../interfaces/products.interface';
import productService from '../services/products.service';

class ProductsController {
  public productService = new productService();

  public getProducts = async (req: Request, res: Response, next: NextFunction) => {
    const productQuery = (req.query as any) as FindProductDto;

    try {
      if (productQuery.type === 'id') {
        if (!isString(productQuery.search)) {
          throw new HttpException(400, 'Not a valid id');
        }
      } else if (productQuery.type === 'other') {
        if (!minLength(productQuery.search, 3)) {
          throw new HttpException(400, 'Not min length');
        }
      }
      const findAllProductsData: Product[] = await this.productService.findAllProduct(productQuery);
      res.status(200).json(findAllProductsData);
    } catch (error) {
      next(error);
    }
  };

  public getProductById = async (req: Request, res: Response, next: NextFunction) => {
    const productId: string = req.params.id;

    try {
      const findOneProductData: Product = await this.productService.findProductById(productId);
      res.status(200).json(findOneProductData);
    } catch (error) {
      next(error);
    }
  };

  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productData: CreateProductDto = req.body;

    try {
      const createProductData: Product = await this.productService.createProduct(productData);
      res.status(201).json(createProductData);
    } catch (error) {
      next(error);
    }
  };

  public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId: string = req.params.id;
    const productData: Product = req.body;

    try {
      const updateProductData: Product = await this.productService.updateProduct(productId, productData);
      res.status(200).json(updateProductData);
    } catch (error) {
      next(error);
    }
  };

  public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId: string = req.params.id;

    try {
      const deleteProductData: Product = await this.productService.deleteProductData(productId);
      res.status(200).json({ data: deleteProductData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductsController;
