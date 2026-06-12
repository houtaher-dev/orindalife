/**
 * Orendalife → Google Sheets (Webhook)
 * انسخ هذا الملف إلى: الإضافات → Apps Script → الصق وفعل النشر كتطبيق ويب (Anyone).
 *
 * الحمولة المتوقعة من FastAPI تطابق app/services/sheets.py
 */

var NUM_COLS = 8;

var HEADERS = [
  "التاريخ",
  "رقم الطلب",
  "الاسم",
  "رقم الهاتف",
  "المنتجات",
  "المجموع (ر.س)",
  "عرض إضافي",
  "الحالة",
];

// ألوان أوريندا: أخضر غابات + ذهبي + كريمي
var C_HEADER_BG = "#134e4a";
var C_HEADER_FG = "#ffffff";
var C_BORDER_GOLD = "#c9a961";
var C_BORDER_SOFT = "#e5e2d9";
var C_ROW_WHITE = "#ffffff";
var C_ROW_ALT = "#f7f6f2";
var C_TOTAL = "#134e4a";

function doGet() {
  return ContentService.createTextOutput(
    "Orendalife webhook: استخدم POST بصيغة JSON."
  ).setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var raw = e.postData && e.postData.contents ? e.postData.contents : "{}";
    var data = JSON.parse(raw);

    ensureHeaders_(sheet);

    var itemsText = "";
    if (data.items && data.items.length) {
      itemsText = data.items
        .map(function (item) {
          return (
            "• " +
            item.name +
            " ×" +
            item.qty +
            " — " +
            (item.total != null ? item.total : "?") +
            " ر.س"
          );
        })
        .join("\n");
    }

    var ts = data.timestamp ? new Date(data.timestamp) : new Date();
    var formattedDate = Utilities.formatDate(ts, "Asia/Qatar", "yyyy-MM-dd HH:mm");

    var upsellNote = data.upsell_accepted
      ? "نعم — +" + String(data.upsell_amount || 0) + " ر.س"
      : "لا";

    var rowData = [
      formattedDate,
      data.order_number || "—",
      data.customer_name || "—",
      data.phone || "—",
      itemsText || "—",
      data.total != null ? data.total : data.subtotal || 0,
      upsellNote,
      data.status || "—",
    ];

    sheet.appendRow(rowData);
    var row = sheet.getLastRow();
    formatDataRow_(sheet, row);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    formatHeader_(sheet.getRange(1, 1, 1, NUM_COLS));
    sheet.setFrozenRows(1);
    applySheetChrome_(sheet);
    return;
  }

  var firstCell = sheet.getRange(1, 1).getValue();
  if (!firstCell || String(firstCell).trim() === "") {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }

  formatHeader_(sheet.getRange(1, 1, 1, NUM_COLS));
  sheet.setFrozenRows(1);
  applySheetChrome_(sheet);
}

function formatHeader_(range) {
  range.setBackground(C_HEADER_BG);
  range.setFontColor(C_HEADER_FG);
  range.setFontWeight("bold");
  range.setFontSize(11);
  range.setHorizontalAlignment("center");
  range.setVerticalAlignment("middle");
  range.setWrap(true);
  range.setBorder(
    true,
    true,
    true,
    true,
    true,
    true,
    C_BORDER_GOLD,
    SpreadsheetApp.BorderStyle.SOLID_MEDIUM
  );
}

function formatDataRow_(sheet, row) {
  var rng = sheet.getRange(row, 1, row, NUM_COLS);
  var alt = row % 2 === 0;
  rng.setBackground(alt ? C_ROW_ALT : C_ROW_WHITE);
  rng.setFontSize(10);
  rng.setVerticalAlignment("middle");
  rng.setWrap(true);
  rng.setBorder(
    true,
    true,
    true,
    true,
    true,
    true,
    C_BORDER_SOFT,
    SpreadsheetApp.BorderStyle.SOLID
  );

  sheet.getRange(row, 1).setHorizontalAlignment("right");
  sheet.getRange(row, 2, row, 4).setHorizontalAlignment("center");
  sheet.getRange(row, 5).setHorizontalAlignment("right");

  var totalCell = sheet.getRange(row, 6);
  totalCell.setHorizontalAlignment("center");
  totalCell.setFontWeight("bold");
  totalCell.setFontColor(C_TOTAL);
  totalCell.setBackground("#eef6f4");

  sheet.getRange(row, 7, row, 8).setHorizontalAlignment("center");

  sheet.setRowHeight(row, Math.max(sheet.getRowHeight(row), 72));
}

function applySheetChrome_(sheet) {
  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(2, 160);
  sheet.setColumnWidth(3, 130);
  sheet.setColumnWidth(4, 120);
  sheet.setColumnWidth(5, 320);
  sheet.setColumnWidth(6, 110);
  sheet.setColumnWidth(7, 120);
  sheet.setColumnWidth(8, 100);
}

/**
 * الطلبيات القديمة ما كانتش كتتلون تلقائياً غير الطلبيات الجاية من الويبهوك.
 * شغّل هاد الدالة مرة واحدة لتنسيق كل الصفوف الموجودة دابا:
 * الطريقة أ: من ورقة الجدول → حدّث الصفحة → القائمة "أوريندا الحياة" → تحسين شكل الجدول
 * الطريقة ب: من Apps Script → اختر الدالة beautifyAllOrders من القائمة فوق ثم ▶️ تشغيل
 */
function beautifyAllOrders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var last = sheet.getLastRow();
  if (last < 1) {
    return;
  }

  formatHeader_(sheet.getRange(1, 1, 1, NUM_COLS));
  sheet.setFrozenRows(1);
  applySheetChrome_(sheet);

  var r;
  for (r = 2; r <= last; r++) {
    formatDataRow_(sheet, r);
  }

  try {
    SpreadsheetApp.getUi().alert(
      "تم تطبيق التنسيق على الصف الأول + كل صفوف الطلبيات الموجودة."
    );
  } catch (e) {
    // يشتغل حتى من تشغيل مباشر بدون واجهة
  }
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("أوريندا الحياة")
    .addItem("تحسين شكل الجدول (كل الصفوف)", "beautifyAllOrders")
    .addToUi();
}
