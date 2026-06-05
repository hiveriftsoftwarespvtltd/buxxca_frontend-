export const orders = [
  {
    id: "SK2540",
    customerName: "Neal Matthews",
    email: "neal@example.com",
    date: "07 Oct, 2022",
    total: 400.00,
    paymentStatus: "Paid",
    paymentMethod: "Mastercard",
    status: "Delivered",
    shippingAddress: {
      fullName: "Neal Matthews",
      address: "123 Maple Street",
      city: "San Francisco",
      state: "CA",
      zip: "94102",
      country: "United States"
    },
    items: [
      { productId: 1, name: "BUXAA Voyager Hardside Carry-On Spinner", price: 149.99, qty: 2, variant: "Royal Blue" },
      { productId: 4, name: "BUXAA Deluxe Memory Foam Neck Pillow", price: 24.99, qty: 4, variant: "Carbon Grey" }
    ],
    timeline: [
      { status: "Order Placed", time: "07 Oct, 2022 10:00 AM", desc: "Your order was successfully placed." },
      { status: "Processing", time: "07 Oct, 2022 02:30 PM", desc: "The order is being packed at the warehouse." },
      { status: "Shipped", time: "08 Oct, 2022 09:00 AM", desc: "Carrier picked up the shipment. Tracking number: TRK98765432" },
      { status: "Out for Delivery", time: "09 Oct, 2022 08:30 AM", desc: "Your package is out for delivery with the local courier." },
      { status: "Delivered", time: "09 Oct, 2022 02:45 PM", desc: "Successfully delivered. Signed by customer." }
    ]
  },
  {
    id: "SK2541",
    customerName: "Jamal Burnett",
    email: "jamal@example.com",
    date: "07 Oct, 2022",
    total: 380.00,
    paymentStatus: "Chargeback",
    paymentMethod: "Visa",
    status: "Processing",
    shippingAddress: {
      fullName: "Jamal Burnett",
      address: "789 Pine Avenue",
      city: "Los Angeles",
      state: "CA",
      zip: "90015",
      country: "United States"
    },
    items: [
      { productId: 3, name: "BUXAA Weekender Leather Duffel Bag", price: 189.99, qty: 2, variant: "Cognac Brown" }
    ],
    timeline: [
      { status: "Order Placed", time: "07 Oct, 2022 11:15 AM", desc: "Your order was successfully placed." },
      { status: "Processing", time: "07 Oct, 2022 03:00 PM", desc: "Payment disputed. Awaiting chargeback resolution." }
    ]
  },
  {
    id: "SK2542",
    customerName: "Juan Mitchell",
    email: "juan@example.com",
    date: "06 Oct, 2022",
    total: 384.00,
    paymentStatus: "Paid",
    paymentMethod: "Paypal",
    status: "Shipped",
    shippingAddress: {
      fullName: "Juan Mitchell",
      address: "456 Oak Road",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      country: "United States"
    },
    items: [
      { productId: 1, name: "BUXAA Voyager Hardside Carry-On Spinner", price: 149.99, qty: 2, variant: "Slate Black" },
      { productId: 2, name: "BUXAA Nomad Expedition Laptop Backpack", price: 89.99, qty: 1, variant: "Carbon Grey" }
    ],
    timeline: [
      { status: "Order Placed", time: "06 Oct, 2022 08:30 AM", desc: "Your order was successfully placed." },
      { status: "Processing", time: "06 Oct, 2022 01:00 PM", desc: "Your order has been compiled and is ready for courier dispatch." },
      { status: "Shipped", time: "07 Oct, 2022 09:15 AM", desc: "Shipped via FedEx. Tracking number: FX88727192" }
    ]
  },
  {
    id: "SK2543",
    customerName: "Barry Dick",
    email: "barry@example.com",
    date: "05 Oct, 2022",
    total: 412.00,
    paymentStatus: "Paid",
    paymentMethod: "Mastercard",
    status: "Delivered",
    shippingAddress: {
      fullName: "Barry Dick",
      address: "234 Birch Street",
      city: "Houston",
      state: "TX",
      zip: "77002",
      country: "United States"
    },
    items: [
      { productId: 1, name: "BUXAA Voyager Hardside Carry-On Spinner", price: 149.99, qty: 2, variant: "Champagne Gold" },
      { productId: 5, name: "BUXAA AeroLite Underseat Rolling Tote", price: 119.99, qty: 1, variant: "Slate Black" }
    ],
    timeline: [
      { status: "Order Placed", time: "05 Oct, 2022 02:30 PM", desc: "Your order was successfully placed." },
      { status: "Processing", time: "05 Oct, 2022 06:00 PM", desc: "The order is being packed at the warehouse." },
      { status: "Shipped", time: "06 Oct, 2022 10:00 AM", desc: "Carrier picked up the shipment. Tracking number: TRK44321245" },
      { status: "Out for Delivery", time: "08 Oct, 2022 08:00 AM", desc: "Your package is out for delivery." },
      { status: "Delivered", time: "08 Oct, 2022 04:30 PM", desc: "Successfully delivered. Placed on front porch." }
    ]
  },
  {
    id: "SK2544",
    customerName: "Ronald Taylor",
    email: "ronald@example.com",
    date: "04 Oct, 2022",
    total: 404.00,
    paymentStatus: "Refund",
    paymentMethod: "Visa",
    status: "Delivered",
    shippingAddress: {
      fullName: "Ronald Taylor",
      address: "567 Elm Drive",
      city: "Miami",
      state: "FL",
      zip: "33101",
      country: "United States"
    },
    items: [
      { productId: 7, name: "BUXAA Odyssey Polycarbonate Suitcase - 3pc Set", price: 349.99, qty: 1, variant: "Royal Blue" },
      { productId: 8, name: "BUXAA Escape Packable Travel Duffle", price: 34.99, qty: 1, variant: "Ocean Blue" }
    ],
    timeline: [
      { status: "Order Placed", time: "04 Oct, 2022 09:00 AM", desc: "Your order was successfully placed." },
      { status: "Processing", time: "04 Oct, 2022 11:30 AM", desc: "Packaged and ready for dispatch." },
      { status: "Shipped", time: "04 Oct, 2022 04:00 PM", desc: "Shipped via UPS. Tracking number: UP432123" },
      { status: "Delivered", time: "06 Oct, 2022 11:00 AM", desc: "Delivered to Ronald Taylor." }
    ]
  }
];
