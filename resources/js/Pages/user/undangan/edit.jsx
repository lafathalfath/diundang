import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

const Edit = ({ auth, undangan }) => {

    const [formData, setFormData] = useState({
        title: undangan.title,
        slug: undangan.slug,
    })
    const [autoSlug, setAutoSlug] = useState(true)
    
    const handleChangeFormData = (e) => {
        const val = e.target.value
        if (e.target.name == 'title' && autoSlug) {
            const slugFromTitle = val.trim().toLowerCase().replaceAll(' ', '-').replaceAll('?', '')
            setFormData({
                [e.target.name]: val,
                slug: slugFromTitle,
            })
        } else {
            setFormData({
                ...formData,
                [e.target.name]: val,
            })
        }
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        router.put(route('user.undangan.update', undangan.id), formData)
    }

    return <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Ubah Undangan</h2>}
    >
        <Head title="Ubah Undangan"/>

        <main className="p-10">
        <form 
                onSubmit={handleSubmitForm} 
                className="w-full h-full flex flex-col items-center justify-center gap-2"
            >
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-gray-800">Judul Undangan</span>
                    </div>
                    <input type="text" name="title" placeholder="Ketik disini" className="bg-gray-200 text-gray-900 input input-bordered w-full max-w-xs" required onChange={handleChangeFormData} value={formData.title}/>
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-gray-800">Slug</span>
                    </div>
                    <input type="text" name="slug" placeholder="Ketik disini" className="bg-gray-200 text-gray-900 input input-bordered w-full max-w-xs" required onChange={handleChangeFormData} value={formData.slug}/>
                </label>
                <div className=" w-full max-w-xs">
                    <label className="cursor-pointer label gap-2 justify-start">
                        <input type="checkbox" defaultChecked className="checkbox checkbox-sm checkbox-success" onChange={(e)=>setAutoSlug(!autoSlug)}/>
                        <span className="label-text">Buat slug berdasarkan Judul Undangan</span>
                    </label>
                </div>

                <button type="submit" className="btn btn-sm btn-success text-white">Lanjut</button>
            </form>
        </main>
    </AuthenticatedLayout>
}

export default Edit