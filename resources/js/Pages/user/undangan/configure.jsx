import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Carousel from "@/mComponent/Carousel";
import { Head } from "@inertiajs/react";
import { useState } from "react";

const Configure = ({ auth, undangan, all_components }) => {
    const [section, setSection] = useState([...undangan.section])
    const [addSection, setAddSection] = useState(false)
    const [dataSection, setDataSection] = useState({
        name: '',
        components: [],
    })

    const handleChangeDataSection = (e) => {
        const sec = e.target
        setDataSection({
            ...dataSection,
            [sec.name]: sec.value,
        })
    }

    const handleAddSection = (e) => {
        e.preventDefault()
        setSection([
            ...section,
            dataSection
        ])
    }

    const images = [
        'https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg',
        'https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg',
        'https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg',
        'https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg',
    ]

    return <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Konfigurasi Undangan</h2>}
    >
        <Head title="Konfigurasi Undangan"/>

        <main className="p-10">
            <div className="h-full py-2 px-4 border-gray-300 border-2 rounded flex justify-between">
                <div className="w-full">
                    <div className="font-bold text-xl text-black">{undangan.title}</div>
                    <div className="flex h-full">
                        <div>
                            {section && section.map((section, i) => {
                                // const [col, setCol] = useState(true)    

                                return <div key={i}>
                                    <button 
                                        className="font-bold text-lg text-black capitalize"
                                        // onClick={()=>setCol(!col)}
                                    >{'>'}{section.name}</button>

                                    <div 
                                        // className={!col ? 'hidden' : ''}
                                    >
                                        {section.components && section.components.map((component, j) => {
                                            return <div key={j} className="capitalize">&emsp;{'>'}{component.name}</div>
                                        })}
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                {/* add section */}
                <div  className="w-full">
                    <button 
                        onClick={()=>setAddSection(!addSection)}
                        className="btn btn-sm btn-success text-white"
                    >+ Buat section</button>
                    {addSection &&
                        <form 
                            onSubmit={handleAddSection}
                        >
                            <input 
                                type="text" 
                                name="name"
                                onChange={handleChangeDataSection} 
                                placeholder="Type here" 
                                className="input input-bordered w-full max-w-xs" 
                            />
                            <br />
                            <button 
                                type="submit" 
                                // onClick={handleAddSection} 
                                className="btn btn-sm btn-success text-white"
                            >Tambah</button>
                        </form>
                    }
                </div>
            </div>
            <br />
            <div>
                <Carousel 
                    images={images} 
                    timeout={3000}
                    indicator={false}
                    navigate={false}
                />
            </div>
            
        </main>
    </AuthenticatedLayout>
}

export default Configure