const { createInvoice } = require("./createInvoice.js");

const invoice = {
                        shipping: {
                            name: "sf",
                            phone: "sf",
                            id: "sf",
                            bookingid: "sf",
                            numguests: "sf"
                        },
                        items: [
                            {
                                roomtype: "sf",
                                roomnumber: "sf",
                                quantity: 2,
                                amount: 120
                            }
                        ],
                        subtotal: 120,
                        paid: 30,
                        invoice_nr: 1234
                    };

createInvoice(invoice, "../../public/invoices/invoice21.pdf");
