"use client"

import Modal from "@/components/Modal";
import axiosInstance from "@/helper/api";
import { getCookie } from "@/helper/client-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { toast, ToastContainer } from "react-toastify";
import { KeretaType } from "../types";

type Props ={
    trains: KeretaType[]
    /** menyimpan array semua data kereta */
}
const AddSchedule = (myProp: Props) => {
    const router = useRouter()
    const [show, setShow] = useState<boolean>(false)

    const [departured_location, setDeparturedLocation] =
        useState<string>("")
    const [arrived_location, setArrivedLocation] =
        useState<string>("")
    const [departured_time, setDeparturedTime] =
        useState<Date>(new Date())
    const [arrived_time, setArrivedTime] =
        useState<Date>(new Date ())
    const [train_id, setTrainId] =
        useState<number>(0)
    const [price, setPrice] =
        useState<number>(0)

    const openModal = () => {
        setShow(true)
        setDeparturedLocation("")
        setDeparturedTime(new Date())
        setArrivedLocation("")
        setArrivedTime(new Date())
        setTrainId(0)
        setPrice(0)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault()
            const url = `/schedule`
            const requestData = {
                departured_location, departured_time,
                arrived_location, arrived_time,
                price, train_id
            }
            const TOKEN = getCookie(`token`)
            const response: any = await axiosInstance
                .post(url, requestData, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`
                    }
                })
            const message = response.data.message
            if (response.data.success === true) {
                setShow(false)
                toast(message, {
                    containerId: `toastAddJadwal`,
                    type: `success`
                })
            } else {
                toast(message, {
                    containerId: `toastAddJadwal`,
                    type: `warning`
                })
            }
        } catch (error) {
            console.log(error)
            toast(`Something wrong`,
                {
                    containerId: `toastAddJadwal`,
                    type: "error"
                }
            )
        }
    }
    return (
        <div>
            <ToastContainer containerId={`toastAddJadwal`} />
            <button
                className="px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-500"
                type="button"
                onClick={() => openModal()}>
                Tambah Jadwal kereta
            </button>
            <Modal isShow={show}>
                <form onSubmit={handleSubmit}>
                    {/* Modal header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Tambah Data Kereta
                        </h1>
                        <span className="text-sm text-slate-500">
                        </span>
                    </div>

                    {/* Modal body */}
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-2">
                            <small className="text-xs font-semibold text-sky-500">
                                Berangkat dari
                            </small>
                            <input type="text" id={departured_location}
                                value={departured_location}
                                onChange={e => setDeparturedLocation(e.target.value)}
                                className="p-1 outline-none w-full hover:border-b hover:border-sky-500"
                                required={true}
                            />
                        </div>

                        <div className="my-2 border rounded-md p-2">
                            <small className="text-xs font-semibold text-sky-500">
                                Waktu Keberangkatan
                            </small>
                            <br />
                            <DatePicker
                                showTimeInput={true}
                                id={`departured_time`}
                                className="p-1 outline-none w-full hover:border-b hover:border-sky-500"
                                selected={new Date(departured_time)}
                                dateFormat={`dd MMMM yyyy HH:mm`}
                                onChange={(date) => setDeparturedTime(date || new Date)}
                            />
                        </div>

                        <div className="my-2 border rounded-md p-2">
                            <small className="text-xs font-semibold text-sky-500">
                                Tiba di
                            </small>
                            <input type="text" id={arrived_location}
                                value={arrived_location}
                                onChange={e => setArrivedLocation(e.target.value)}
                                className="p-1 outline-none w-full hover:border-b hover:border-sky-500"
                                required={true}
                            />
                        </div>

                        <div className="my-2 border rounded-md p-2">
                            <small className="text-xs font-semibold text-sky-500">
                                Waktu kedatangan
                            </small>
                            <br />
                            <DatePicker
                                showTimeInput={true}
                                id={`arrived_time`}
                                className="p-1 outline-none w-full hover:border-b hover:border-sky-500"
                                selected={new Date(arrived_time)}
                                dateFormat={`dd MMMM yyyy HH:mm`}
                                onChange={(date) => setArrivedTime(date || new Date)}
                            />
                        </div>

                        <div className="my-2 border rounded-md p-2">
                            <small className="text-xs font-semibold text-sky-500">
                                Harga
                            </small>
                            <input type="number" id={`price`}
                                value={price.toString()}
                                onChange={e => setPrice(Number(e.target.value))}
                                className="p-1 outline-none w-full hover:border-b hover:border-sky-500"
                                required={true}
                            />
                        </div>

                        <div className="my-2 border rounded-md p-2">
                            <small className="text-xs font-semibold text-sky-500">
                                Jenis Kereta
                            </small>
                            <select id={`train_id`}
                                value={train_id.toString()}
                                onChange={e => setTrainId(Number(e.target.value))}
                                className="p-1 outline-none w-full border hover:border-sky-500"
                                required={true}
                            >
                                <option value="">Pilih Jenis Kereta</option>
                                {
                                    myProp.trains.map((kereta, index) => (
                                        <option value={kereta.id}
                                            key={`optionKereta-${index}`}>
                                            {kereta.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                    </div>

                    {/* modal footer */}
                    <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
                        <button type="button"
                            onClick={() => closeModal()}
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
export default AddSchedule;