const Product = require('./models/productModel');

class ProductManager {
  constructor() {
  }

  async addProduct(productData) {
    try {
      const product = new Product(productData);
      await product.save();
      return product;
    } catch (error) {
      throw new Error('Error al agregar el producto:', error);
    }
  }

  async getProducts() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      throw new Error('Error al obtener los productos:', error);
    }
  }

  async getProductById(productId) {
    try {
      const product = await Product.findById(productId);
      return product;
    } catch (error) {
      throw new Error('Error al obtener el producto:', error);
    }
  }

  async updateProduct(productId, productData) {
    try {
      const product = await Product.findByIdAndUpdate(productId, productData, { new: true });
      return product;
    } catch (error) {
      throw new Error('Error al actualizar el producto:', error);
    }
  }

  async deleteProduct(productId) {
    try {
      await Product.findByIdAndDelete(productId);
    } catch (error) {
      throw new Error('Error al eliminar el producto:', error);
    }
  }
}

module.exports = ProductManager;
