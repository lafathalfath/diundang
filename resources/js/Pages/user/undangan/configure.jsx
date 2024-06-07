import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Configure = ({ auth, undangan }) => {
    

    return <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Konfigurasi Undangan</h2>}
    >
        <Head title="Konfigurasi Undangan"/>

        <main className="p-10">
            {undangan.title}
            <br />
            {undangan.slug}
        </main>
    </AuthenticatedLayout>
}

export default Configure