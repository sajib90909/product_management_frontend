import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_ADD_CATEGORY, API_ADD_PRODUCT, API_GET_PRODUCT, API_SELECTED_CATEGORIES, API_UPDATE_PRODUCT } from "../../../Helpers/App/ApiUrl/urls";
import { AxiosGet, AxiosPost } from "../../../Helpers/Common/axios";
import Layout from "../../Helpers/App/Layout/Layout";
import AppButton from "../../Helpers/Commons/Buttons/AppButton";
import AppInput from "../../Helpers/Commons/Inputs/AppInput";


export default function AddProduct() {
    const { slug } = useParams()

    const productInputFields = {
        name: '',
        price: '',
        category_id: '',
        gallery_image: [],
    }
    
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState({});
    const [ btnLoading, setBtnLoading ] = useState(false);
    const [ error, setError ] = useState();
    const [ formData, setFormData ] = useState({...productInputFields});
    const [  galleryImage, setGalleryImage ] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        getCategory()
    }, [])

    useEffect(() => {
        if(slug) {
            getProduct()
        }
    }, [slug])

    const getCategory = () => {
        setLoading(true)
        AxiosGet(API_SELECTED_CATEGORIES).then(({data}) => {
            setCategories(data)
            setLoading(false)
        })
    }

    const getProduct = () => {
        setLoading(true)
        AxiosGet(`${API_GET_PRODUCT}/${slug}`).then(({data}) => {
            setFormData({
                id: data.id,
                name: data.name,
                price: data.price,
                category_id: data.category_id,
                gallery_image: []
            })
            setLoading(false)
        })
    }
    
    const formInputHandler = (value, e = null) => {        
        setFormData((prevFormData) => {
            return {...prevFormData, ...value}
        });

        console.log(formData);
    }


    const submitFormHandler = async (e) => {
        e.preventDefault()

        setBtnLoading(() => true)

        let newFormData = new FormData()

        if(formData?.display_image){
            newFormData.append('display_image', formData.display_image)
        }

        if (formData?.gallery_image?.length) {
            formData.gallery_image.forEach(element => {
                newFormData.append('gallery_image[]', element)
            });
        }
        
        newFormData.append('name', formData.name)
        newFormData.append('price', formData.price)
        newFormData.append('category_id', formData.category_id)

        AxiosPost(`${!slug ? API_ADD_PRODUCT : `${API_UPDATE_PRODUCT}/${slug}`}`, newFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(({data}) => {
            setBtnLoading(() => false)

            navigate(`/products/${data?.payload?.slug}`)
        }).catch((res) => {
            setError(!res?.response 
                ? {message: "something went wrong!"} 
                : ( res?.response?.data?.errors || {message: res?.response?.statusText} )
            )
            setBtnLoading(() => false)
        })     
    }

    const addNewCategory = async (e) => {
        e.preventDefault()

        AxiosPost(API_ADD_CATEGORY, {name: formData?.category_name})
        .then(({data}) => {
            window.location.reload() 
        }).catch((res) => {

        })  
    }

    const galleryImageHandler = (value, e = null) => {

        const getFormData = formData

        getFormData.gallery_image.push(value.gallery_image)

        setGalleryImage(oldArray => [...oldArray, URL.createObjectURL(e.target.files[0])]);

        
        setFormData((prevFormData) => {
            return {...prevFormData, ...getFormData}
        });
    }

    return (
        <Layout>
            <div className="m-4">
                <form >
                    <AppInput
                        name='name'
                        labelText='Name'
                        type='text'
                        onChange={formInputHandler}
                        className="mb-4"
                        required
                        value={formData?.name}
                        error={error?.name}
                    />

                    <AppInput
                        name='price'
                        labelText='Price'
                        type='text'
                        onChange={formInputHandler}
                        className="mb-4"
                        required
                        value={formData?.price}
                        error={error?.price}
                    />

                    <AppInput
                        labelText='category'
                        name='category_id'
                        type='select'
                        onChange={formInputHandler}
                        className="mb-4"
                        required
                        value={formData?.category_id}
                        list={categories}
                        error={error?.category_id}
                    />     

                    <div className="border m-4 p-4">
                        <AppInput
                            name='category_name'
                            type='text'
                            onChange={formInputHandler}
                            className="mb-4"
                            required
                            value={formData?.price}
                            error={error?.price}
                        />

                        <AppButton type="button" className="btn-sm ms-0 mb-2" onClick={addNewCategory} value="Add New Category" />
                    </div>

                    <AppInput
                        labelText='Display image'
                        name='display_image'
                        type='file'
                        onChange={formInputHandler}
                        className="mb-4"
                        required
                        error={error?.display_image}
                    />   
                      
                    <div>
                    {
                        galleryImage.length 
                        ? galleryImage.map((url, index) => { 
                            return (
                                <img className="img-thumbnail cursor-pointer m-1 p-1" style={{maxWidth: "200px"}} key={index} src={url} alt="" />
                            ) 
                        }) : null
                    }
                    </div>

                    <AppInput
                        name='gallery_image'
                        type='file'
                        labelText={`Add ${galleryImage.length ? 'more ' : ''} gallery image`}
                        onChange={galleryImageHandler}
                        className="mb-4"
                    />  
                    
                    

                    {error?.message && <div id="emailHelp" className="form-text text-danger">{error?.message}</div> }

                    <AppButton 
                        type="submit" 
                        loading={btnLoading} 
                        className="mt-4 btn-dark"
                        onClick={submitFormHandler} 
                        value="Post" />
                            
                </form> 
            </div>
        </Layout>
    )
}