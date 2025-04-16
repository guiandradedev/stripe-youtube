import { useState } from 'react';

interface Products {
  id_product: number;
  name: string;
  description: string;
  unit_price: number;
  currency: string;
}

interface ProductInCart extends Products {
  quantity: number;
}

function App() {

  const [products, _] = useState<Products[]>([
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
  ]);

  const [cart, setCart] = useState<ProductInCart[]>([]);

  function handleAddCart(product: Products) {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id_product === product.id_product);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id_product === product.id_product
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }

  function handleRemoveFromCart(productId: number) {
    setCart(prevCart => prevCart.filter(item => item.id_product !== productId));
  }

  function handleUpdateQuantity(productId: number, quantity: number) {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id_product === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  }

  function handleClearCart() {
    setCart([]);
  }

  function handleCreateCheckoutSession() {
    
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Products</h1>
      <div>
        {products.map(product => (
          <div key={product.id_product} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="text-gray-600">
              {product.unit_price} {product.currency}
            </p>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleAddCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map(item => (
              <li key={item.id_product} className="flex justify-between items-center bg-gray-200 p-4 mb-2 rounded">
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p>{item.description}</p>
                  <p>
                    {item.unit_price} {item.currency} x {item.quantity} ={' '}
                    {item.unit_price * item.quantity} {item.currency}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleRemoveFromCart(item.id_product)}
                  >
                    Remove
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    className="w-16 text-center border rounded"
                    onChange={e => handleUpdateQuantity(item.id_product, parseInt(e.target.value))}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
        {cart.length > 0 && (
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        )}

        <div className="mt-4">
          <h3 className="text-xl font-bold">Total:</h3>
          <p>
            {cart.reduce((total, item) => total + item.unit_price * item.quantity, 0)} {cart[0]?.currency}
          </p>
        </div>
        <div className="mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleCreateCheckoutSession}
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;