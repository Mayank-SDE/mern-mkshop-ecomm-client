import { useEffect, useState } from "react";
import { VscError } from 'react-icons/vsc';
import CartItemCard from "../components/CartItem";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { CartReducerInitialState } from "../types/reducer-types";
import { CartItem } from "../types/types";
import { addToCart, calculatePrice, discountApplied, removeCartItem } from "../redux/reducer/cartReducer";
import toast from "react-hot-toast";
import { server } from "../redux/store";
import axios from "axios";

const Cart = () => {


    const dispatch = useDispatch();
    const { cartItems, subtotal, tax, total, shippingCharges, discount } = useSelector((state: { cartReducer: CartReducerInitialState }) => state.cartReducer);


    const [couponCode, setCouponCode] = useState<string>("");
    const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);


    const incrementHandler = (cartItem: CartItem) => {

        if (cartItem.quantity >= cartItem.stock) {
            return toast.error("Maximum stock limit reached");
        }

        dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
    }

    const decrementHandler = (cartItem: CartItem) => {

        if (cartItem.quantity === 1) {

            return;
        }

        dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
    }

    const removeHandler = (productId: string) => {

        dispatch(removeCartItem(productId));
    }
    useEffect(() => {

        const { token, cancel } = axios.CancelToken.source();

        const timeoutId = setTimeout(() => {

            axios.get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, { cancelToken: token }).then((response) => {
                setIsValidCouponCode(true);
                dispatch(discountApplied(response.data.discount));
                dispatch(calculatePrice());
            }).catch(() => {
                dispatch(discountApplied(0));
                setIsValidCouponCode(false);
                dispatch(calculatePrice());
            });

        }, 1000)

        return () => {
            clearTimeout(timeoutId);
            setIsValidCouponCode(false);
            cancel();
        }
    }, [couponCode]);


    useEffect(() => {
        dispatch(calculatePrice());
    }, [cartItems]);



    return (
        <div className="cart">
            <main>
                {cartItems.length > 0 ? cartItems.map((item, index) => <CartItemCard
                    incrementHandler={incrementHandler}
                    decrementHandler={decrementHandler}
                    removeHandler={removeHandler}
                    key={index} cartItem={item} />) : <h1>No items Added</h1>}
            </main>
            <aside>
                <p>Subtotal: ₹{subtotal}</p>
                <p>Shipping Charges: ₹{shippingCharges}</p>
                <p>Tax: ₹{tax}</p>
                <p>Discount  <em className="red"> -
                    ₹{discount}
                </em>
                </p>
                <p><b> Total : ₹{total}</b></p>
                <input placeholder="Coupon Code" type="text" value={couponCode} onChange={(event) => setCouponCode(event.target.value)} />
                {
                    couponCode && (isValidCouponCode ? <span className="green">₹{discount} off using the <code>{couponCode}</code></span> : <span className="red">Invalid Coupon <VscError /></span>)
                }

                {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
            </aside>
        </div>
    )
}

export default Cart