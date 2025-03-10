"use client"

import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import Modal from "@/components/Modal"
import { toast, ToastContainer } from "react-toastify"
import { getCookie } from "@/helper/client-cookie"
import axiosInstance from "@/helper/api"
import { KeretaType, UserType } from "../types"

type props = {
    admin: UserType
}

const EditAdmin = (myProp: props) => {
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
            const url = `/train/${myProp.admin.id}`
            const requestData = {
                name, username
            }
            // hit endpoint to add kereta
            const response: any = await axiosInstance
            .put(url, requestData, {
                headers: {
                    authorization: `Bearer ${TOKEN}`
                }
            })

            const message = response.data.message
            if(response.data.success == true){
                toast(message,
                    {
                        containerId: `toastEdit-${myProp.admin.id}`,
                        type: "success"
                    }
                )
                setShow(false)
                // reload page
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message,
                    {
                        containerId: `toastEdit-${myProp.admin.id}`,
                        type: "warning"
                    }
                )
            }
        } catch (error) {
            console.log(error);
            toast(
                `Something wrong`,
                {
                    containerId: `toastEdit-${myProp.admin.id}`,
                    type: "error"
                }
            )
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastEdit-${myProp.admin.id}`} />
            <button type="button"
            onClick={() => openModal()}
            className="px-2 py-2 rounded-md bg-sky-600 hover:bg-sky-500 text-white">
                &#x270E; Edit
            </button>
            <Modal isShow={show}>
                <form onSubmit={e => handleSubmit (e)}>
                    {/* Modal header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Edit Data Admin
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
                            <input type="text" id={`name-${myProp.admin.id}`}
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
                            <input type="text" id={`descriptions-${myProp.admin.id}`}
                                value={username}
                                onChange={e => setUsername(e.target.value)}
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
export default EditAdmin