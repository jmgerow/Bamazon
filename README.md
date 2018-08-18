# Welcome to Bamazon!

This application consists of two modules: Bamazon Customer and Bamazon Manager.

## Running Bamazon Customer will allow user to: 
* View inventory in the store including item ID, product name, price, and stock quantity.
* Order selected product as long as there is enough product in stock.

## Running Bamazon Manager will allow the user to:
* View available inventory
* View items with low inventory levels
* Add to inventory
* Add a new product

### To run the Bamazon Customer:
type node bamazoncustomer.js in terminal. This will display the available products and a prompt to select a product to purchase from a list:

![image](/images/bamcustomer1.PNG)

Once a product is selected the user can then choose the quantity to purchase:

![image](/images/bamcustomer2.PNG)

If there is enough product in stock your order will be placed for the selected quantity and the total cost will be displayed:

![image](/images/bamcustomer3.PNG)

If there is not enough product in stock the user will be prompted:

![image](/images/bamcustomer4.PNG)

### To run Bamazon Manager:
type node bamazonmanager.js into terminal. This will allow the user to select from 4 options:

![image](/images/bammanager1.PNG)

View products for sale will display the current inventory:

![image](/images/bammanager2.PNG)

View low inventory will display any items with inventory levels under 10 units:

![image](/images/bammanager3.PNG)

Add to inventory will allow the user to add inventory to any selected product:

![image](/images/bammanager4.PNG)

![image](/images/bammanager5.PNG)

Add new product will allow the user to add a new product to inventory:

![image](/images/bammanager6.PNG)

![image](/images/bammanager7.PNG)