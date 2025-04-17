import { Products } from "../products";

export default function Product({ product, addCartButtonOnClick }: {product: Products, addCartButtonOnClick?: () => void}) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="text-gray-600">
                {product.unit_price} {product.currency}
            </p>
            { addCartButtonOnClick && (
                <button
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={addCartButtonOnClick}
                >
                    Add to Cart
                </button>
            )}
        </div>
    )
}