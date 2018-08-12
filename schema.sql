DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Cool Dude Sunglasses", "Clothing and Accessories", 85.99, 20),
("Laptop", "Technology", 499.99, 15),
("Headphones", "Technology", 74.99, 30),
("Coffee Maker", "Kitchen", 75.00, 18),
("Tennis Shoes", "Clothing and Accessories", 50.00, 45),
("Mouse and Keyboard", "Technology", 105.00, 30),
("T-shirt", "Clothing and Accessories", 19.99, 20),
("Backpack", "Clothing and Accessories", 39.99, 15),
("Teapot", "Kitchen", 22.50, 40),
("Shorts", "Clothing and Accessories", 25.00, 35);