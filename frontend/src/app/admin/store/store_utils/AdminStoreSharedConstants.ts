export const ADMIN_PRODUCT_CATEGORIES = ["Supplements","Equipment","Merchandise","Accessories","Beverages","Other"];
export const ADMIN_PAYMENT_METHODS = [
  { value: "cash", label: "Cash", className: "bg-pay-cash-bg text-pay-cash" },
  { value: "upi", label: "UPI", className: "bg-pay-upi-bg text-pay-upi" },
  { value: "card", label: "Card", className: "bg-pay-card-bg text-pay-card" },
];
export const ADMIN_EMPTY_PRODUCT = { name: "", category: "Supplements", price: 0, stock: 0, lowStockThreshold: 5, unit: "piece" };
export const ADMIN_STORE_TABS = [{ id: "products", label: "Products" }, { id: "orders", label: "Orders" }];
