import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

const Index = ({ auth, all_undangan }) => {

    const [deleteUndangan, setDeleteUndangan] = useState(null)
    const handleDeleteUndangan = (e) => {
        e.preventDefault()
        router.delete(route('user.undangan.destroy', deleteUndangan))
        document.getElementById('deleteUndanganModal').close()
    }
    // console.log(window.location.origin);

    return <AuthenticatedLayout 
        user={auth.user} 
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Buat Undangan</h2>}
    >
        <Head title="Undangan"/>
        
        <main className="p-10">
            <div className="flex items-center justify-end">
                <Link href={route('user.undangan.buat.view')} className="btn btn-success text-white">+ Tambah</Link>
            </div>

            <div className="mt-5">
                <div className="p-6 text-gray-900 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead className="text-gray-900">
                                <tr>
                                    <th>#</th>
                                    <th>Judul</th>
                                    <th>Terakhir Diubah</th>
                                    <th>URL</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {all_undangan.map((undangan, i) => {
                                    return <tr key={undangan.id} className="hover:bg-gray-200">
                                        <th>{i+1}</th>
                                        <td>{undangan.title}</td>
                                        <td>{undangan.updated_at}</td>
                                        <td>
                                            <Link href={`/${undangan.slug}`} className="hover:text-blue-500 hover:underline">
                                                {`${window.location.origin}/${undangan.slug}`}
                                            </Link>
                                        </td>
                                        <td className="flex items-center gap-2">
                                            <button 
                                                type="button" 
                                                onClick={()=>{
                                                    document.getElementById('deleteUndanganModal').showModal()
                                                    setDeleteUndangan(undangan.id)
                                                }}
                                                className="btn btn-sm btn-error text-white"
                                            >Hapus</button>
                                            <Link href={route('user.undangan.edit', undangan.id)} className="btn btn-sm btn-warning">Ubah</Link>
                                            <Link href={route('user.undangan.configure.view', undangan.id)} className="btn btn-sm btn-ghost bg-gray-400">Konfigurasi</Link>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>


        {/* modals */}
        <dialog id="deleteUndanganModal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Konfirmasi</h3>
                <p className="py-4">Apakah Anda yakin ingin menghapus undangan ini?</p>

                <div className="flex items-center justify-end gap-2">
                    <form onSubmit={handleDeleteUndangan}>
                        <button type="submit" className="btn btn-sm btn-success">Ya</button>
                    </form>
                    <div className="modal-action w-fit h-fit p-0 m-0">
                        <form method="dialog">
                            <button className="btn btn-sm btn-error" onClick={()=>setDeleteUndangan(null)}>Tidak</button>
                        </form>
                    </div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
        {/* end modals */}
    </AuthenticatedLayout>
}

export default Index