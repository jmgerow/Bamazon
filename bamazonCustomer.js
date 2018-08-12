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
    displayProducts()
});

function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "selectProduct",
                type: "list",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < res.length; i++) {
                        // choiceArray.push(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
                        choiceArray.push(res[i].product_name);
                    }
                    return choiceArray;
                },
                message: "Please select an item to purchase"
            },
            {
                name: "selectQuantity",
                type: "input",
                message: "How many would you like to purchase?"
            }
        ]).then(function (answer) {
            var chosenItem;
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name === answer.selectProduct) {
                    chosenItem = res[i];
                }
            };
            // console.log("you chose " + answer.selectQuantity + " units of item: " + answer.selectProduct)
            // console.log('chosenItem', chosenItem)

            if (chosenItem.stock_quantity > parseInt(answer.selectQuantity)) {
                // prototype to round total cost properly for customer
                Number.prototype.round = function (places) {
                    return +(Math.round(this + "e+" + places) + "e-" + places);
                }

                var rawTotal = answer.selectQuantity * chosenItem.price
                var orderTotal = rawTotal.round(2);
                
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                      {
                        stock_quantity: (chosenItem.stock_quantity - answer.selectQuantity)
                      },
                      {
                        item_id: chosenItem.item_id
                      }
                    ],
                    function(error) {
                      if (error) throw err;
                    console.log("Your order of " + answer.selectQuantity + " units of " + chosenItem.product_name + " for a total of " + orderTotal + " has been placed!")
                    }
                  );    
                

            } else {
                console.log("Sorry, we do not have sufficient product in stock for your order")

            }
        });

    });
};

// var selectedItem;
// var selectedQuantity;

// function customerPrompt() {
//     inquirer.prompt([
//             {
//                 type: "input",
//                 message: "Please enter the ID # for the selected item",
//                 name: "orderNumber"
//             },
//             {
//                 type: "input",
//                 message: "Please enter the quantity you'd like to purchase",
//                 name: "orderQuantity"
//             }

//         ])
//         .then(function (answer) {
//             console.log(answer.orderNumber);
//             console.log(answer.orderQuantity);

//         })

// };

