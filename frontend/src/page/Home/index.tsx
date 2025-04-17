import { useState } from 'react';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { ProductInCart, Products, products as originalProducts } from '../../products';
import Product from '../../components/Product';

export default function Home() {
    const [products, _] = useState<Products[]>(originalProducts);
    const [cart, setCart] = useState<ProductInCart[]>([]);
    const [isPaying, setIsPaying] = useState(false);

    // Add item to cart
    function handleAddItemIntoCart(product: Products) {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id_product === product.id_product);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id_product === product.id_product
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    }

    // Remove item from cart
    function handleRemoveFromCart(productId: number) {
        setCart(prevCart => prevCart.filter(item => item.id_product !== productId));
    }

    // Update item quantity in cart
    function handleUpdateQuantity(productId: number, quantity: number) {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id_product === productId
                    ? { ...item, quantity: Math.max(1, quantity) }
                    : item
            )
        );
    }

    // Create checkout session
    async function handleCreateCheckoutSession() {
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }
        try {
            setIsPaying(true);
            const response = await axios.post('http://localhost:3001/checkout', {
                items: cart
            });
            const { url } = response.data;
            window.location.href = url;
        } catch (error) {
            console.error("Error creating checkout session:", error);
            alert("An error occurred while creating the checkout session.");
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-6">Products</h1>
            <div>
                {products.map(product => (
                    <Product
                        key={product.id_product}
                        product={product}
                        addCartButtonOnClick={() => handleAddItemIntoCart(product)}
                    />
                ))}
            </div>

            {/* Cart Section */}
            <div className="mt-8 w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4">Cart</h2>
                {cart.length === 0 ? (
                    <p className="text-gray-600">Your cart is empty.</p>
                ) : (
                    <ul>
                        {cart.map(item => (
                            <li
                                key={item.id_product}
                                className="flex justify-between items-center bg-gray-200 p-4 mb-2 rounded"
                            >
                                <div>
                                    <h3 className="font-bold">{item.name}</h3>
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
                                        onChange={(e) =>
                                            handleUpdateQuantity(
                                                item.id_product,
                                                parseInt(e.target.value)
                                            )
                                        }
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Checkout Button */}
            <button
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleCreateCheckoutSession}
                disabled={isPaying}
            >
                {isPaying ? <Loader /> : "Pay"}
            </button>
        </div>
    );
}