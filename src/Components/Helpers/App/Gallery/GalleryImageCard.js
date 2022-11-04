import { useAuth } from "../../../../Contexts/AuthContext"
import { API_DELETE_PRODUCT_IMAGE } from "../../../../Helpers/App/ApiUrl/urls"
import { makeStorageUrl } from "../../../../Helpers/Common/apiHelper"
import { AxiosDelete } from "../../../../Helpers/Common/axios"
import AppButton from "../../Commons/Buttons/AppButton"

export default function GalleryImageCard({image, onClick}) {
    const { authUser } = useAuth()

    const deleteImage = () => {
        AxiosDelete(`${API_DELETE_PRODUCT_IMAGE}/${image?.id}`)
            .then(({data}) => {
                window.location.reload() 
            })
    }

    return (
        <div className="me-2 my-1">
            <img src={ makeStorageUrl(image?.url) } onClick={() => onClick(image)} style={{maxWidth: '200px'}} className="img-thumbnail cursor-pointer" alt="app_image"/>
            
            { 
                authUser && Object.keys(authUser).length
                    ? (
                        <div>
                            <AppButton className="btn-light w-100" onClick={deleteImage} value="delete"/>
                        </div>
                    ) : null
            }
            
        </div>
    )
}