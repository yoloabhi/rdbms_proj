const fs = require("fs");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(__dirname+path));
}

function generateHeader(doc) {
  doc
      .image(__dirname+"\\logo.png", 50, 45, { width: 50 })
      .fillColor("#444444")
      .fontSize(20)
      .text("HMS", 110, 57)
      .fontSize(10)
      .text("Abc Hotel", 200, 50, { align: "right" })
      .text("123 Main Street", 200, 65, { align: "right" })
      .text("New York, NY, 10025", 200, 80, { align: "right" })
      .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc
      .fillColor("#444444")
      .fontSize(20)
      .text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
      .fontSize(10)
      .text("Invoice Number:", 50, customerInformationTop)
      .text(invoice.invoice_nr, 150, customerInformationTop)
      .text("Invoice Date:", 50, customerInformationTop + 15)
      .text(formatDate(new Date()), 150, customerInformationTop + 15)
      .text("Balance Due:", 50, customerInformationTop + 30)
      .text(
          formatCurrency(invoice.subtotal - invoice.paid),
          150,
          customerInformationTop + 30
      )
      .text("Booking ID:", 50, customerInformationTop + 45)
      .text(
          invoice.shipping.bookingid,
          150,
          customerInformationTop + 45
      )

      .text("Name:", 300, customerInformationTop)
      .text(invoice.shipping.name, 400, customerInformationTop)
      .text("User ID:", 300, customerInformationTop + 15)
      .text(invoice.shipping.id, 400, customerInformationTop + 15)
      .text("Phone:", 300, customerInformationTop + 30)
      .text(
          invoice.shipping.phone, 400, customerInformationTop + 30)
      .text("Number of Guests:", 300, customerInformationTop + 45)
      .text(
          invoice.shipping.numguests, 400, customerInformationTop + 45)
      .moveDown();

  generateHr(doc, 266);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  generateTableRow(
      doc,
      invoiceTableTop,
      "Room Type",
      "Room Number",
      "Unit Cost",
      "Days",
      "Total"
  );
  generateHr(doc, invoiceTableTop + 20);

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
        doc,
        position,
        item.roomtype,
        item.roomnumber,
        formatCurrency(item.amount),
        item.quantity,
        formatCurrency(item.amount * item.quantity)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
      doc,
      subtotalPosition,
      "",
      "",
      "Subtotal",
      "",
      formatCurrency(invoice.items[0].amount * invoice.items[0].quantity)
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
      doc,
      paidToDatePosition,
      "",
      "",
      "Paid To Date",
      "",
      formatCurrency(invoice.paid)
  );

  const duePosition = paidToDatePosition + 25;
  generateTableRow(
      doc,
      duePosition,
      "",
      "",
      "Balance Due",
      "",
      formatCurrency(invoice.items[0].amount*invoice.items[0].quantity - invoice.paid)
  );
}

function generateFooter(doc) {
  doc
      .fontSize(10)
      .text(
          "Payment is due within 15 days. Thank you for your business.",
          50,
          780,
          { align: "center", width: 500 }
      );
}

function generateTableRow(
    doc,
    y,
    item,
    description,
    unitCost,
    quantity,
    lineTotal
) {
  doc
      .fontSize(10)
      .text(item, 50, y)
      .text(description, 150, y)
      .text(unitCost, 280, y, { width: 90, align: "right" })
      .text(quantity, 370, y, { width: 90, align: "right" })
      .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc
      .strokeColor("#aaaaaa")
      .lineWidth(1)
      .moveTo(50, y)
      .lineTo(550, y)
      .stroke();
}

function formatCurrency(cents) {
  return "Rs." + cents;
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createInvoice
};
