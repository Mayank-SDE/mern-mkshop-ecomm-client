import { Link } from 'react-router-dom';
import ProductCart from '../components/ProductCard';
import { useLatestProductsQuery } from '../redux/api/productAPI';
import toast from 'react-hot-toast';
import { Skeleton } from '../components/Loader';
import { CartItem } from '../types/types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/reducer/cartReducer';
const Home = () => {

    const { data, isLoading, isError } = useLatestProductsQuery("");

    const dispatch = useDispatch();

    const addToCartHandler = (cartItem: CartItem) => {
        if (cartItem.stock < 1) {
            return toast.error("Out of stock");
        }
        dispatch(addToCart(cartItem));
        toast.success("Added to Cart");
    }
    if (isError) {
        toast.error("Cannot fetch the products");
    }

    return (
        <div className="home">
            <section>

            </section>

            <h1>Latest Products <Link to="/search" className='findmore'>More</Link> </h1>
            <main>
                {isLoading ? <Skeleton width="80vw" /> : data?.products.map(product => {
                    return <ProductCart
                        key={product._id}
                        productId={product._id}
                        name={product.name}
                        price={product.price}
                        stock={product.stock}
                        photo={product.photo}
                        handler={addToCartHandler} />
                })}
            </main>
        </div>
    )
}

export default Home