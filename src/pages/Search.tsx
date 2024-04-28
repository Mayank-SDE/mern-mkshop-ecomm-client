import { useState } from "react"
import ProductCart from "../components/ProductCard";
import { useCategoriesQuery, useSearchProductsQuery } from "../redux/api/productAPI";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";

const Search = () => {


    const { data: categoriesResponse, isLoading: loadingCategories, isError, error } = useCategoriesQuery("");


    const [search, setSearch] = useState<string>("");
    const [sort, setSort] = useState<string>("");
    const [maxPrice, setMaxPrice] = useState<number>(100000);

    const [category, setCategory] = useState<string>("");

    const [page, setPage] = useState<number>(1);
    const dispatch = useDispatch();

    const { isLoading: productLoading, data: searchedData, isError: productIsError, error: productError } = useSearchProductsQuery({ search, sort, category, page, price: maxPrice });


    const addToCartHandler = (cartItem: CartItem) => {
        if (cartItem.stock < 1) {
            return toast.error("Out of stock");
        }
        dispatch(addToCart(cartItem));
        toast.success("Added to Cart");
    }
    const isNextPage = page < 4;
    const isPrevPage = page > 1;

    if (isError) {
        const err = error as CustomError;
        toast.error(err.data.message);
    }
    if (productIsError) {
        const err = productError as CustomError;
        toast.error(err.data.message);

    }
    return (
        <div className="product-search-page">
            <aside>
                <h2>Filters</h2>
                <div>
                    <h4>Sort</h4>
                    <select value={sort} onChange={(event) => setSort(event.target.value)}>
                        <option value="">None</option>
                        <option value="asc">Price - (Low to High)</option>
                        <option value="dsc">Price - (High to Low)</option>
                    </select>
                </div>
                <div>
                    <h4>Max Price : {maxPrice || ""}</h4>
                    <input type="range" min={100} max={100000} value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} />
                </div>
                <div>
                    <h4>Category</h4>
                    <select value={category} onChange={(event) => setCategory(event.target.value)}>
                        <option value="">ALL</option>
                        {
                            !loadingCategories && categoriesResponse?.categories?.map((category: string) => {
                                return <option value={category} key={category}>{category.toUpperCase()}</option>
                            })
                        }

                    </select>
                </div>
            </aside>
            <main>
                <h1>Products</h1>
                <input type="text" placeholder="Search by name..." value={search} onChange={event => setSearch(event.target.value)} />

                {
                    productLoading ? <Skeleton /> : <div className="search-product-list">

                        {
                            searchedData?.products.map(product => {
                                return <ProductCart
                                    key={product._id}
                                    productId={product._id}
                                    name={product.name}
                                    price={product.price}
                                    stock={product.stock}
                                    photo={product.photo}
                                    handler={addToCartHandler} />
                            })
                        }
                    </div>
                }
                {searchedData && searchedData?.totalPage as number > 1 && (<article>
                    <button disabled={!isPrevPage} onClick={() => setPage(prev => prev - 1)}>Prev</button>
                    <span>{page} of {searchedData.totalPage}</span>
                    <button disabled={!isNextPage} onClick={() => setPage(prev => prev + 1)}>Next</button>
                </article>)}
            </main>
        </div>
    )
}

export default Search