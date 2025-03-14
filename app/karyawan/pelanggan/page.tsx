export const dynamic = "force-dynamic";
import { getServerCookie } from "@/helper/server-cookie"
import { UserType } from "../types"
import  axiosInstance  from "@/helper/api"
import Pelanggan from "./Pelanggan"
import AddPelanggan from "./addPelanggan"

const PelangganPage = async () => {
    /** call function to "data kereta"
     * from backend
     */
    const getAdmin = async (): Promise<UserType[]> => {
        try {
            /** get token from cookie */
            const TOKEN = await getServerCookie(`token`)
            const url = `/customer`
            /** hit endpoint */
            const response: any = await axiosInstance.get(url, {
                headers:{
                    authorization: `Bearer ${TOKEN}`
                }
            })

            if (response.data.success == true) {
                return response.data.data
            }
            return[]
        } catch (error) {
            console.log(error);
            return[]
        }
    }

    const dataPelanggan = await getAdmin()
    return (
        <div className="w-full p-5 bg-white">
            <h1 className="text-xl font-semibold">
                Data Admin
            </h1>
            <span className="text-sm">
                Halaman ini memuat daftar admin yang aktif 
            </span>
    
            <div className="my-3">
                <AddPelanggan />
                {/** mapping data kereta */}
                {
                    dataPelanggan.map((pelanggan, index) => (
                        <Pelanggan 
                            item={pelanggan}
                            key={`pelanggan-${index}`}
                        />
                    ))
                }
            </div>
        </div>
    )
}
export default PelangganPage