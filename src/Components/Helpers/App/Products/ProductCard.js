import { makeStorageUrl } from "../../../../Helpers/Common/apiHelper"

export default function ProductCard({product}) {
    return (
        <div className="m-3 product-card">
            <div className="card" style={{width: '18rem'}}>
                <img className="card-img-top" src={ makeStorageUrl(product?.display_image?.url )} alt="Card_image" />
                <div className="card-header">
                    { product.name }
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Price: {product?.price}</li>
                    <li className="list-group-item">Category: {product?.category?.name}</li>
                </ul>
            </div>
        </div>
    )
}