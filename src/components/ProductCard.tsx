import { FaPlus } from 'react-icons/fa';
import { server } from '../redux/store';
import { CartItem } from '../types/types';
type ProductsProps = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    stock: number;
    handler: (cartItem: CartItem) => string | undefined;
}

// const server = "";

const ProductCart = ({
    productId,
    photo,
    name,
    price,
    stock,
    handler
}: ProductsProps) => {
    console.log(productId);
    console.log(stock);
    return (
        <div className="product-card">
            <img src={`${server}/${photo}`} alt={name} />
            <p>{name}</p>
            <span>₹{price}</span>
            <div>
                <button onClick={() => handler({
                    productId,
                    photo,
                    name,
                    price,
                    stock,
                    quantity: 1
                })}><FaPlus /></button>
            </div>
        </div>
    )
}

export default ProductCart