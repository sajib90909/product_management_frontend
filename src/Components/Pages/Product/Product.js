import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext";
import { API_DELETE_PRODUCT, API_GET_PRODUCT } from "../../../Helpers/App/ApiUrl/urls";
import { makeStorageUrl } from "../../../Helpers/Common/apiHelper";
import { AxiosDelete, AxiosGet } from "../../../Helpers/Common/axios";
import Gallery from "../../Helpers/App/Gallery/Gallery";
import Layout from "../../Helpers/App/Layout/Layout";
import AppButton from "../../Helpers/Commons/Buttons/AppButton";

export default function Home() {
    const { slug } = useParams();
    const [ product, setProduct] = useState()
    const [ loading, setLoading] = useState()
    const [ selectedImage, setSelectedImage] = useState()
    const navigate = useNavigate()

    const { authUser } = useAuth()

    const deleteProduct = () => {
        AxiosDelete(`${API_DELETE_PRODUCT}/${product?.id}`)
            .then(({data}) => {
                navigate('/')
            })
    }

    useEffect(() => {
        getProduct()
    }, [])

    const imageSelectClick = (image) => {
        setSelectedImage(image?.url)
    }

    const getProduct = () => {
        setLoading(true)
        AxiosGet(`${API_GET_PRODUCT}/${slug}`).then(({data}) => {
            setProduct(data)
            setSelectedImage(data?.display_image?.url)
            setLoading(false)
        })
    }

    return (
        <Layout>
            <div className="m-4 d-flex justify-content-center">
                <div className="me-2">
                    <img src={ makeStorageUrl(selectedImage) } style={{maxWidth: '500px'}} className="img-thumbnail" alt="app_image"/>
                </div>
                <div>
                    <div className="card" style={{maxWidth: '18rem'}}>
                        <div className="card-header">
                            {product?.name}
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Price: {product?.price}</li>
                            <li className="list-group-item">category: {product?.category?.name}</li>
                            { 
                                authUser && Object.keys(authUser).length
                                    ? (
                                        <>
                                            <li className="list-group-item">
                                                <Link to={`/products/edit/${product?.slug}`}><AppButton className="btn-primary w-100" value="Manage"/></Link>
                                            </li>
                                            <li className="list-group-item">
                                                <AppButton className="btn-light w-100" onClick={deleteProduct} value="delete"/>
                                            </li>
                                        </>
                                    ) : null
                            }
                        </ul>
                    </div>
                </div>
            </div>

            <Gallery product={product} imageClick={imageSelectClick}/>
        </Layout>
    )
}