bohot khoob 🔥 ab hum next step me *backend ke model relations* design karte hain — yani MongoDB (Mongoose) ke schemas ka poora structure aur unke relations.

main roman urdu me explain krta hoon taake har relation clear rahe 👇

---

## 🧩 Model Relations (Detailed Design)

### 1. *Customer*

ye base entity hai — har inquiry, quotation, order, invoice isi se link hota hai.

js
{
  _id,
  name,
  contactPerson,
  phone,
  email,
  address,
  notes
}


### 2. *Inquiry*

customer ne poocha “ye parts chahiye”

* 1 inquiry ek customer ki hoti hai
* us inquiry me multiple items ho sakte hain
* aur aage quotation iss inquiry ke against banti hai

js
{
  _id,
  inquiryNumber,
  customer: ObjectId('Customer'),
  inquiryType: "limited" | "tender" | "walking",
  items: [
    { part: ObjectId('Part'), qty: Number, remarks: String }
  ],
  status: "open" | "quoted" | "closed"
}


---

### 3. *Quotation*

quotation basically inquiry ka reply hai jisme price aur terms hoti hain

* 1 quotation ek inquiry se linked hoti hai
* usme bhi multiple items hotay hain (same as inquiry)

js
{
  _id,
  quoteNumber,
  inquiry: ObjectId('Inquiry'),
  customer: ObjectId('Customer'),
  items: [
    { part: ObjectId('Part'), qty: Number, price: Number }
  ],
  validityDate: Date,
  remarks: String
}


---

### 4. *Customer Purchase Order (CPO)*

customer ne quotation approve kr di — ab wo purchase order bhejta hai

* ye quotation aur inquiry dono se linked hoti hai
* ye sale order ke base pe banti hai

js
{
  _id,
  cpoNumber,
  title: String,
  desc: String,
  customer: ObjectId('Customer'),
  inquiry: ObjectId('Inquiry'),
  quotation: ObjectId('Quotation'),
  items: [
    { part: ObjectId('Part'), qty: Number, agreedPrice: Number }
  ],
  orderDate: Date,
  status: "pending" | "processing" | "completed"
}


---

### 5. *Sale Order*

company ke andar internal document hota hai — delivery ke liye

* ye CPO aur quotation dono se linked hota hai

js
{
  _id,
  saleOrderNumber,
  cpo: ObjectId('CustomerPurchaseOrder'),
  quotation: ObjectId('Quotation'),
  customer: ObjectId('Customer'),
  items: [
    { part: ObjectId('Part'), qty: Number, price: Number }
  ],
  status: "open" | "dispatched" | "completed"
}


---

### 6. *Delivery Challan (DC)*

jab maal deliver hota hai

* ye sale order aur customer se linked hota hai
* ye invoice ka base banta hai

js
{
  _id,
  challanNumber,
  saleOrder: ObjectId('SaleOrder'),
  customer: ObjectId('Customer'),
  items: [
    { part: ObjectId('Part'), qty: Number }
  ],
  deliveryDate: Date,
  remarks: String
}


---

### 7. *Sale Invoice*

ye accounting ke liye document hai

* ye delivery challan aur customer dono se linked hota hai
* payment isi ke against hoti hai

js
{
  _id,
  invoiceNumber,
  customer: ObjectId('Customer'),
  deliveryChallan: ObjectId('DeliveryChallan'),
  items: [
    { part: ObjectId('Part'), qty: Number, price: Number }
  ],
  total: Number,
  invoiceDate: Date,
  status: "unpaid" | "paid" | "partial"
}


---

### 8. *Payment Receipt*

customer ne payment kar di

* ye invoice se linked hoti hai
* multiple payments ek invoice pe ho sakti hain

js
{
  _id,
  paymentNumber,
  invoice: ObjectId('SaleInvoice'),
  customer: ObjectId('Customer'),
  amount: Number,
  method: "cash" | "bank" | "cheque",
  date: Date
}


---

### 9. *Supplier*

supplier side ka base model

js
{
  _id,
  name,
  nature: "local" | "foreign",
  contact,
  address
}


---

### 10. *Purchase Order (Supplier)*

company supplier ko issue karti hai

js
{
  _id,
  poNumber,
  supplier: ObjectId('Supplier'),
  nature: "local" | "foreign",
  items: [
    { part: ObjectId('Part'), qty: Number, price: Number }
  ],
  poDate: Date,
  status: "open" | "received" | "closed"
}


---

### 11. *Goods Receipt (GRN)*

supplier ne maal bhej diya

* ye PO se linked hoti hai

js
{
  _id,
  grNumber,
  purchaseOrder: ObjectId('PurchaseOrder'),
  items: [
    { part: ObjectId('Part'), qty: Number }
  ],
  receivedDate: Date
}


---

### 12. *Supplier Payment*

jab supplier ko payment di jati hai

* ye GRN aur PO dono se linked hoti hai

js
{
  _id,
  paymentNumber,
  supplier: ObjectId('Supplier'),
  purchaseOrder: ObjectId('PurchaseOrder'),
  amount: Number,
  method: "bank" | "cash",
  date: Date
}


---

### 13. *Part / Item*

yeh master data hai (stock ke liye)

js
{
  _id,
  code,
  description,
  unit,
  price,
  stock: Number
}


---

### 🔗 Relation Summary


Customer → Inquiry → Quotation → CustomerPO → SaleOrder → DeliveryChallan → Invoice → Payment
Supplier → PurchaseOrder → GoodsReceipt → SupplierPayment


---

agar ye structure tumhe theek lag raha hai to next step me me:
✅ har model ka *Mongoose schema code* likh dunga
✅ aur unke beech reference (ref) setup kar dunga taake populate() se data easily fetch ho sake

bolo bhai — ye model relation structure final karein?
agar ok hai to agla step likhta hoon: *Mongoose model code (schema files)*