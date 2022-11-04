import GalleryImageCard from "./GalleryImageCard";

export default function Gallery({product, imageClick}) {
    return (
        <div className="d-flex flex-wrap align-items-center justify-content-center">
            { product?.images?.length 
                ? product.images.map((item, index) => {
                    return (
                        <GalleryImageCard image={item} key={index} onClick={imageClick}/>
                    )
                }) : null
            }
        </div>
    )
}