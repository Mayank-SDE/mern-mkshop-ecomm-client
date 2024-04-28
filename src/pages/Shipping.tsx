import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { CartReducerInitialState } from "../types/reducer-types";
import axios from "axios";
import { server } from "../redux/store";
import toast from "react-hot-toast";
import { saveShippingInfo } from "../redux/reducer/cartReducer";
const Shipping = () => {


    const { cartItems, total } = useSelector((state: { cartReducer: CartReducerInitialState }) => state.cartReducer);

    const [shippingInfo, setShippingInfo] = useState({
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",

    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeHandler = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setShippingInfo((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    };

    useEffect(() => {

        if (cartItems.length <= 0) {
            return navigate("/cart");
        }

    }, [cartItems]);

    const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        dispatch(saveShippingInfo(shippingInfo));
        try {
            const { data } = await axios.post(`${server}/api/v1/payment/create`, {
                amount: Number(total)
            }, {
                headers: {
                    'Content-Type': "application/json"
                }
            });
            navigate("/pay", {
                state: data.clientSecret
            })
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="shipping">
            <button className="back-btn" onClick={() => navigate("/cart")}><BiArrowBack /></button>
            <form onSubmit={submitHandler}>
                <h1>Shipping Address</h1>
                <input required type="text" placeholder="Address" name="address" value={shippingInfo.address}
                    onChange={changeHandler} />
                <input required type="text" placeholder="City" name="city" value={shippingInfo.city}
                    onChange={changeHandler} />
                <input required type="text" placeholder="State" name="state" value={shippingInfo.state}
                    onChange={changeHandler} />
                <select name="country" required value={shippingInfo.country} onChange={changeHandler}>
                    <option value="">Choose Country</option>
                    <option value="india">India</option>
                    <option value="usa">USA</option>
                </select>
                <input required type="text" placeholder="Pincode" name="pinCode" value={shippingInfo.pinCode}
                    onChange={changeHandler} />

                <button type="submit">Pay Now</button>

            </form>
        </div>
    )
}

export default Shipping