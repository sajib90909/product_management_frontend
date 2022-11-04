import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_GET_PRODUCT } from "../../../../Helpers/App/ApiUrl/urls";
import { AxiosGet } from "../../../../Helpers/Common/axios";
import ProductCard from "./ProductCard";

export default function Products() {
    const [ products, setProducts] = useState()
    const [ loading, setLoading] = useState()

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = () => {
        setLoading(true)
        AxiosGet(`${API_GET_PRODUCT}`).then(({data}) => {
            setProducts(data.data)
            setLoading(false)
        })
    }

    return (
        <div className="my-4">
            <div className="d-flex flex-wrap align-items-center justify-content-center">
                {
                    products?.length 
                    ? (
                        products.map((item, index) => {
                            return (<Link className='app-text-decoration-none' key={index} to={`/products/${item?.slug}`}>
                                <ProductCard product={item} />
                            </Link>)
                        })
                    ) : null
                }
            </div>
        </div>
    )
}