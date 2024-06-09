

const Carousel = ({images}) => {

    // images is array of the images path

    return <div>
        <div className="carousel w-full">
            {images && images.map((image, index) => {
                return <div key={index} id={`image${index}`} className="carousel-item w-full">
                    <img src={image} className="w-full" />
                </div> 
            })}
        </div> 
        <div className="flex justify-center w-full py-2 gap-2">
            {images && images.map((image, index) => {
                return <a key={index} href={`#image${index}`} className="btn btn-xs">{index + 1}</a>
            })}
        </div>
    </div>
}

export default Carousel