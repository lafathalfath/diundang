import { useState } from "react"


const Carousel = ({ images, timeout, indicator, navigate }) => {

    // images is array of the images path
    const [indexSlide, setIndexSlide] = useState(0)
    const prevSlide = () => {
        const imagesIndexes = images.length - 1
        if (indexSlide == 0) {setIndexSlide(imagesIndexes)}
        else {setIndexSlide(indexSlide - 1)}
    }
    
    const nextSlide = () => {
        const imagesIndexes = images.length - 1
        if (indexSlide == imagesIndexes) {setIndexSlide(0)}
        else {setIndexSlide(indexSlide + 1)}
    }

    timeout && setTimeout(nextSlide, timeout)
    if (indicator == undefined) indicator = true
    if (navigate == undefined) navigate = true

    return <div>
        <div className="relative">
            {navigate &&
                <div className="w-full absolute top-1/3 translate-y-full flex items-center justify-between">
                    <div onClick={prevSlide} className="btn btn-sm">{'<'}</div>
                    <div onClick={nextSlide} className="btn btn-sm">{'>'}</div>
                </div>
            }
            <div className="w-full">
                {images && images.map((img, i) => {
                    if (indexSlide == i) {return <div key={i} className="carousel-item w-full">
                        <img src={img} className="w-full" />
                    </div>}
                })}
            </div>
            {indicator && 
                <div className="flex justify-center w-full py-2 gap-2">
                    {images && images.map((img, i) => {
                        return <button 
                            key={i} 
                            onClick={()=>setIndexSlide(i)} 
                            className={`btn btn-xs ${indexSlide == i ? 'text-black bg-white' : ''}`}
                        >{i+1}</button>
                    })}
                </div>
            }
        </div>
    </div>
}

export default Carousel