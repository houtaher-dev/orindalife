function doPost(e) {
  try {
    // 1. Get the active sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 2. Parse the JSON payload coming from the server
    var data = JSON.parse(e.postData.contents);
    
    // 3. Format the items list nicely as a string
    var itemsFormatted = "";
    if (data.items && data.items.length > 0) {
      itemsFormatted = data.items.map(function(item) {
        return item.qty + "x " + item.name + " (" + item.price + " ر.ق)";
      }).join("\n");
    }
    
    // 4. Format the timestamp
    var date = new Date(data.timestamp);
    var formattedDate = Utilities.formatDate(date, "Asia/Qatar", "yyyy-MM-dd HH:mm:ss");
    
    // 5. Create the row array in the exact order you want columns
    var rowData = [
      data.order_number || "",             // Column A: Order ID
      formattedDate || "",                 // Column B: Date
      data.customer_name || "",            // Column C: Customer Name
      data.phone || "",                    // Column D: Phone Number
      itemsFormatted || "",                // Column E: Products
      data.total || 0,                     // Column F: Total Amount
      data.upsell_accepted ? "نعم" : "لا", // Column G: Upsell Accepted?
      data.status || "pending"             // Column H: Status
    ];
    
    // 6. Append the row to the sheet
    sheet.appendRow(rowData);
    
    // 7. Return success response
    return ContentService.createTextOutput(JSON.stringify({"status": "success", "message": "Order added"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    // Return error if something goes wrong
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Just to handle GET requests gracefully (e.g. if you open the URL in browser)
function doGet(e) {
  return ContentService.createTextOutput("Webhook is running! Send a POST request to add data.");
}
