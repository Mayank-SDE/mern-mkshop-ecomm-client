import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react"
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebasse";
import { useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api-types";


const Login = () => {

    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");

    const [login] = useLoginMutation();

    const loginHandler = async () => {
        try {
            const provider = new GoogleAuthProvider();

            const { user } = await signInWithPopup(auth, provider);


            const response = await login({
                name: user.displayName!,
                email: user.email!,
                gender,
                role: "user",
                dob: date,
                _id: user.uid!,
                photo: user.photoURL!
            });

            if ('data' in response) {

                toast.success(response.data.message);

            } else {

                const error = response.error as FetchBaseQueryError;
                const message = (error.data as MessageResponse).message;

                toast.error(message);
            }

        } catch (error) {
            toast.error("Sign in failed");
        }


    };
    return (
        <div className="login">
            <main>
                <h1 className="heading">Login</h1>
                <div>
                    <label htmlFor="">Gender</label>
                    <select value={gender} onChange={(event) => setGender(event.target.value)}>
                        <option value="">Select Gender :</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="">Date of Birth</label>
                    <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
                </div>

                <div>
                    <p>Already Singed In Once?</p>
                    <button onClick={loginHandler}>
                        <FcGoogle />
                        <span>Sign in with Google</span>
                    </button>
                </div>
            </main>

        </div>
    )
}

export default Login