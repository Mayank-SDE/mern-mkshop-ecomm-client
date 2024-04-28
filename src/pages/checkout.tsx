import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { NewOrderRequest } from '../types/api-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNewOrderMutation } from '../redux/api/orderAPI';
import { responseToast } from '../utils/features';
import { resetCart } from '../redux/reducer/cartReducer';
import { RootState } from '../redux/store';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutForm = () => {




    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const { user } = useSelector((state: RootState) => state.userReducer);

    const { shippingInfo, cartItems, subtotal, tax, discount, shippingCharges, total } = useSelector((state: RootState) => state.cartReducer);

    const [newOrder] = useNewOrderMutation();

    const dispatch = useDispatch();

    const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!elements || !stripe) {
            return;
        }
        setIsProcessing(true);
        const orderData: NewOrderRequest = {
            shippingInfo,
            orderItems: cartItems,
            subtotal,
            tax,
            discount,
            shippingCharges,
            total,
            userId: user?._id as string
        };
        const { paymentIntent, error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin
            },
            redirect: "if_required"
        });

        if (error) {
            setIsProcessing(false);
            return toast.error(error.message || "Something went wrong");
        }
        if (paymentIntent.status === "succeeded") {
            const response = await newOrder(orderData);
            dispatch(resetCart());
            responseToast(response, navigate, "/orders");
            console.log("Placing order");
            navigate("/orders");
        }

        setIsProcessing(false);

    };
    return <div className='checkout-container'>
        <form action="" onSubmit={submitHandler}>
            <PaymentElement />
            <button type="submit" disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Pay"}
            </button>
        </form>
    </div>

};

const Checkout = () => {

    const location = useLocation();
    const clientSecret: string | undefined = location.state;

    if (!clientSecret) {
        return <Navigate to="/shipping" />
    }

    return (
        <Elements options={
            {
                clientSecret: clientSecret
            }
        } stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    )
}

export default Checkout;