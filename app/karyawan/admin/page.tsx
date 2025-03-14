export const dynamic = "force-dynamic";
import { getServerCookie } from "@/helper/server-cookie"
import { KeretaType, UserType } from "../types"
import axiosInstance from "@/helper/api"
import AddAdmin from "./addAdmin"
import Admin from "./admin"

const getAdmin = async (): Promise<UserType[]> => {
    try {
        // get token from cookie
        const TOKEN = await getServerCookie(`token`)
        const url = `/employee`
        // hit endpoint
        const response: any =
            await axiosInstance
                .get(url, {
                    headers: {
                        authorization: `Bearer ${TOKEN}`
                    }
                })
        if (response.data.success == true)
            return response.data.data
        return []
    } catch (error) {
        console.log(error)
        return []
    }
}

const AdminPage = async () => {
    // call function to load "data kereta"
    // from backend

    const dataAdmin = await getAdmin()
    return (
        <div className="w-full p-5 bg-white">
            <h1 className="text-xl font-semibold">
                Data Admin
                </h1>
                <span className="text-sm">
                    Halaman ini memuat daftar Admin
                </span>

                <div className="my-3">
                    <AddAdmin />
                    {/* mapping data kereta */}
                    {
                        dataAdmin.map((admin, index) => (
                            <Admin
                            item={admin}
                            key={`admin-${index}`}
                            />
                        ))
                    }
                </div>
                
        </div>
    )
}
export default AdminPage

