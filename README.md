Welcome to Bamazon!

This application consists of two modules: Bamazon Customer and Bamazon Manager.

Running Bamazon Customer will allow user to: 
* View inventory in the store including item ID, product name, price, and stock quantity.
* Order selected product as long as there is enough product in stock.

Running Bamazon Mananger will allow the user to:
* View available inventory
* View items with low inventory levels
* Add to inventory
* Add a new product

To run the Bamazon Customer, type node bamazoncustomer.js. This will display the available products and a prompt to select a product to purchase from a list:

![image](/images/bamcustomer1.PNG)

Once a product is selected the user can then choose the quantity to purchase:

![image](/images/bamcustomer2.PNG)

If there is enough product in stock your order will be placed for the selected quantity and will display the total cost:

![image](/images/bamcustomer3.PNG)

If there is not enough product in stock the user will be prompted:

![image](/images/bamcustomer4.PNG)