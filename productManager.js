class ProductManager {
    constructor() {
      this.products = [];
    }
  
    addProduct(product) {
      this.products.push(product);
    }
  
    deleteProduct(productId) {
      this.products = this.products.filter((product) => product.id !== productId);
    }
  
    getProducts() {
      return this.products;
    }
  }
  
  module.exports = ProductManager;
  