import { Link } from 'react-router-dom';
import { FaUser, FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useState } from 'react';
import { User } from '../types/types';
import { signOut } from 'firebase/auth';
import { auth } from '../firebasse';
import toast from 'react-hot-toast';


interface PropsType {
    user: User | null;
}

const Header = ({ user }: PropsType) => {

    const [isOpen, setIsOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            await signOut(auth);
            toast.success("Signed Out Successfully.");
            setIsOpen(false);
        } catch (error) {
            toast.error("Sign out failed");
        }
    };

    return (
        <nav className='header'>
            <Link onClick={() => setIsOpen(false)} to={"/"} >HOME</Link>
            <Link onClick={() => setIsOpen(false)} to={"/search"}><FaSearch /></Link>
            <Link onClick={() => setIsOpen(false)} to={"/cart"}><FaShoppingBag /></Link>
            {user?._id ? (
                <>
                    <button onClick={() => setIsOpen(prev => !prev)}>
                        <FaUser />
                    </button>
                    <dialog open={isOpen}>
                        <div>
                            {
                                user.role === 'admin' && (<Link to={"/admin/dashboard"}>Admin</Link>)
                            }
                            <Link onClick={() => setIsOpen(false)} to={"/orders"}>Orders</Link>
                            <button onClick={logoutHandler}><FaSignOutAlt /></button>
                        </div>
                    </dialog>
                </>
            ) : <Link onClick={() => setIsOpen(false)} to={"/login"}><FaSignInAlt /></Link>}
        </nav>
    )
}

export default Header