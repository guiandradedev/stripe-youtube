export interface Products {
  id_product: number;
  name: string;
  description: string;
  unit_price: number;
  currency: string;
}

export interface ProductInCart extends Products {
  quantity: number;
}

export const products = [
    {
      id_product: 1,
      name: "Node.js and TypeScript Book",
      description: "A Node.js book that teaches you how to implement a full application.",
      unit_price: 50,
      currency: "brl"
    },
    {
      id_product: 2,
      name: "React.js Guide",
      description: "A comprehensive guide to building modern web applications with React.js.",
      unit_price: 40,
      currency: "brl"
    },
    {
      id_product: 3,
      name: "Full-Stack Development Course",
      description: "An online course covering front-end and back-end development.",
      unit_price: 100,
      currency: "usd"
    },
    {
      id_product: 4,
      name: "JavaScript Cheat Sheet",
      description: "A quick reference guide for JavaScript developers.",
      unit_price: 10,
      currency: "usd"
    }
  ]