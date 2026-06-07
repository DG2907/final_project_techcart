import { jest } from '@jest/globals';

jest.unstable_mockModule('../models/Product.js', () => {
  return {
    default: {
      find: jest.fn(),
      findById: jest.fn()
    }
  };
});

const ProductRepository = (await import('../repositories/ProductRepository.js')).default;
const Product = (await import('../models/Product.js')).default;

describe('ProductRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('findAll should return all products', async () => {
    const mockProducts = [{ name: 'Laptop', price: 1000 }];
    Product.find.mockResolvedValue(mockProducts);

    const products = await ProductRepository.findAll();
    
    expect(Product.find).toHaveBeenCalledWith({});
    expect(products).toEqual(mockProducts);
  });
});
