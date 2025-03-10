"use client"

import Link from "next/link"
import { KeretaType } from "../types"
import DropKereta from "./dropKereta"
import EditKereta from "./editKereta"

type props = {
    item : KeretaType
}

const Train = (myProp: props) => {
    return (
        <div className="w-full flex flex-wrap my-2 border rounded-md">
            <div className="w-full p-2 md:w-4/12 flex flex-col">
            <small className="text-sm font-medium">
                Nama Kereta
            </small>
            <span>
                <Link href={`/karyawan/kereta/${myProp.item.id}`}>
                {myProp.item.name}
                </Link>
            </span>
            </div>

            <div className="w-full p-2 md:w-4/12 flex flex-col">
            <small className="text-sm font-medium">
                Deskripsi
            </small>
            <span>
                {myProp.item.descriptions}
            </span>
            </div>

            <div className="w-full p-2 md:w-2/12 flex flex-col">
            <small className="text-sm font-medium">
                Tipe Kereta
            </small>
            <span>
                {myProp.item.type}
            </span>
            </div>

            <div className="w-full p-2 md:w-2/12 flex flex-col">
            <small className="text-sm font-medium">
                Opsi
            </small>
                <div className="flex gap-2 items-center">
                    <EditKereta kereta={myProp.item} />
                    <DropKereta kereta={myProp.item} />
                </div>
            </div>
        </div>
    )

}
export default Train