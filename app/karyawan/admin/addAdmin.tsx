"use client"

import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import Modal from "@/components/Modal"
import { toast, ToastContainer } from "react-toastify"
import { getCookie } from "@/helper/client-cookie"
import axiosInstance from "@/helper/api"

const AddAdmin = () => {
    const [name, setName] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [nik, setNik] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()


    const openModal = () => {
        setShow(true)
        setName("")
        setUsername("")
        setPassword("")
        setNik("")
        setAddress("")
        setPhone("")

    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try{
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url = `/employee`
            const requestData = {
                name, username
            }
            // hit endpoint to add kereta
            const response: any = await axiosInstance
            .post(url, requestData, {
                headers: {
                    authorization: `Bearer ${TOKEN}`
                }
            })

            const message = response.data.message
            if(response.data.success == true){
                toast(message,
                    {
                        containerId: `toastAdd`,
                        type: "success"
                    }
                )
                setShow(false)
                // reload page
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message,
                    {
                        containerId: `toastAdd`,
                        type: "warning"
                    }
                )
            }
        } catch (error) {
            console.log(error);
            toast(
                `Something wrong`,
                {
                    containerId: `toastAdd`,
                    type: "error"
                }
            )
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastAdd`} />
            <button type="button"
            onClick={() => openModal()}
            className="px-4 py-2 rounded-mdm bg-lime-600 hover:bg-lime-500 text-white">
                Tambah Data Admin
            </button>
            <Modal isShow={show}>
                <form onSubmit={e => handleSubmit (e)}>
                    {/* Modal header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Tambah Data Admin
                        </h1>
                        <span className="text-sm text-slate-500">
                            Pastikan data yang diisi sudah benar
                        </span>
                    </div>

                    {/* modal body */}
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Nama Admin
                            </small>
                            <input type="text" id={`name`}
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required={true} 
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
                            />
                        </div>

                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Username Admin
                            </small>
                            <input type="text" id={`username`}
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required={true} 
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
                            />
                        </div>

                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Password Admin
                            </small>
                            <input type="text" id={`password`}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required={true} 
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
                            />
                        </div>

                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Nik Admin
                            </small>
                            <input type="text" id={`nik`}
                                value={nik}
                                onChange={e => setNik(e.target.value)}
                                required={true} 
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
                            />
                        </div>

                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Address Admin
                            </small>
                            <input type="text" id={`address`}
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                required={true} 
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
                            />
                        </div>

                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Phone Admin
                            </small>
                            <input type="text" id={`phone`}
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                required={true} 
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
                            />
                        </div>

                    </div>

                    {/* modal footer */}
                    <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
                        <button type="button" onClick={() => closeModal()}
                        className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white">
                        Close
                        </button>

                        <button type="submit" 
                        className="px-4 py-2 rounded-md bg-sky-700 hover:bg-sky-600 text-white">
                        Save
                        </button>
                    </div>

                </form>
            </Modal>
        </div>
    )
}
export default AddAdmin