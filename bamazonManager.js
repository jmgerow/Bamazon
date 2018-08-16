var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    managerSelection();
});

function managerSelection() {
    inquirer.prompt([
        {
            name: "selectTask",
            type: "list",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            message: "Welcome to Bamazon Manager. Please select an option:"
        }

    ]).then(function (answer) {
        var selectedTask = answer.selectTask;
        switch (selectedTask) {

            case "View Products for Sale":
                return viewProducts();

            case "View Low Inventory":
                return lowInventory();

            case "Add to Inventory":
                return addInventory();

            case "Add New Product":
                return newProduct();

        };

    });
};

function viewProducts() {
    console.log("Current available products")
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
    });
};

function lowInventory() {
    console.log("The following items have low inventory")
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            if ((res[i].stock_quantity) < 10) {
                console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
            };
        };
        console.log("-----------------------------------");
    });
};

function addInventory() {
    console.log("Select an item to add inventory for:")

    connection.query("SELECT * FROM products", function (err, res) {


        inquirer.prompt([
            {
                name: "selectProduct",
                type: "list",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].product_name);
                    }
                    return choiceArray;
                },
            },
            {
                name: "selectQuantity",
                type: "input",
                message: "How many units of this item would you like to add?"
            }
        ]).then(function (answer) {
            var chosenItem;
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name === answer.selectProduct) {
                    chosenItem = res[i];
                }
            };

            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: (chosenItem.stock_quantity += parseInt(answer.selectQuantity))
                    },
                    {
                        item_id: chosenItem.item_id
                    }
                ],
                function (error) {
                    if (error) throw err;
                    console.log(answer.selectQuantity + " units of " + chosenItem.product_name + " have been added.")
                }
            );

        });

    });
};

function newProduct() {
    // console.log("new product")

    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "Enter name of new item"
            },
            {
                name: "department",
                type: "input",
                message: "Enter department category for new item"
            },
            {
                name: "price",
                type: "input",
                message: "Enter price of the new item",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "Enter stock quantity of new item"
            }
        ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answer.item,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.quantity
                },
                function (err) {
                    if (err) throw err;
                    console.log("Item successfully added");
                }
            );
        });
};
