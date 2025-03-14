"use client"

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Modal from "@/components/Modal";
import { toast, ToastContainer } from "react-toastify"
import { getCookie } from "@/helper/client-cookie";
import  axiosInstance from "@/helper/api";
import { UserType } from "../types";

type props = {
    pelanggan: UserType
}
const EditPelanggan = (myProp: props) => {
    const [nik, setNik] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setNik(myProp.pelanggan.nik)
        setName(myProp.pelanggan.name)
        setAddress(myProp.pelanggan.address)
        setPhone(myProp.pelanggan.phone)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault();
            const TOKEN = getCookie(`token`);
            const url = `/customer/${myProp.pelanggan.id}`;
            const requestData = {
                nik,
                name,
                address,
                phone
            }
            // hit endpoint to add kereta
            const response: any = await axiosInstance.put(url, requestData, {
                headers: {
                    authorization: `Bearer ${TOKEN}`
                }
            })
            console.log(response)
            const message = response.data.message
            if(response.data.success === true) {
                toast(message, {
                    containerId: `toastEdit-${myProp.pelanggan.id}`, 
                    type: `success`
                })
                setShow(false)
                // reload page
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message, {
                    containerId: `toastEdit-${myProp.pelanggan.id}`, 
                    type: `warning`
                })
            }
        } catch (error) {
            console.log(error)
            toast(`Something went wrong`, {containerId: `toastEdit-${myProp.pelanggan.id}`, type: `success`})
        }
    }
    return (
        <div className="">
            <ToastContainer containerId={`toastEdit-${myProp.pelanggan.id}`} />
            <button type="button"
            onClick={() => openModal()}
            className="px-2 py-2 rounded-md bg-sky-600 hover:bg-sky-500 text-white">
                &#x270E; Edit
            </button>
            <Modal isShow={show}>
                <form onSubmit={ e => handleSubmit(e) }>
                    {/* modal header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Edit Data Pelanggan
                        </h1>
                        <span className="text-sm text-slate-500">
                            Pastikan data yang diisi sudah benar
                        </span>
                    </div>
                    {/* modal body */}
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Nik
                            </small>
                            <input type="text" 
                            id={`nik-${myProp.pelanggan.id}`} 
                            value={nik}
                            onChange={e => setNik(e.target.value)}
                            className="p-1 outline-none focus:border-b-sky-600 focus:border-b"/>
                        </div>
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Nama
                            </small>
                            <input type="text" 
                            id={`name-${myProp.pelanggan.id}`} 
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="p-1 outline-none focus:border-b-sky-600 focus:border-b"/>
                        </div>
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Address
                            </small>
                            <input type="text" 
                            id={`address-${myProp.pelanggan.id}`} 
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            className="p-1 outline-none focus:border-b-sky-600 focus:border-b"/>
                        </div>
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Phone
                            </small>
                            <input type="text" 
                            id={`phone-${myProp.pelanggan.id}`} 
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            className="p-1 outline-none focus:border-b-sky-600 focus:border-b"/>
                        </div>
                    </div>
                    {/* modal footer */}
                    <div className="w-full p-3 rounded-b-lg flex items-center justify-end">
                        <button type="button"
                        onClick={() => closeModal()}
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white">
                            Close
                        </button>
                        <button type="submit"
                        className="px-4 py-2 bg-sky-700 hover:bg-sky-600 text-white">
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
export default EditPelanggan;
