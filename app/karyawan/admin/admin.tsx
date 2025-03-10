"use client"

import Link from "next/link"
import { KeretaType, UserType } from "../types"
import EditAdmin from "./editAdmin"
import DropAdmin from "./dropAdmin"

type props = {
    item : UserType
}

const Admin = (myProp: props) => {
    return (
        <div className="w-full flex flex-wrap my-2 border rounded-md">
            <div className="w-full p-2 md:w-4/12 flex flex-col">
            <small className="text-sm font-medium">
                Nama Admin
            </small>
            <span>
                <Link href={`/admin/kereta/${myProp.item.id}`}>
                {myProp.item.name}
                </Link>
            </span>
            </div>

            <div className="w-full p-2 md:w-4/12 flex flex-col">
            <small className="text-sm font-medium">
                Username
            </small>
            <span>
                {myProp.item.user_details.username}
            </span>
            </div>

            <div className="w-full p-2 md:w-2/12 flex flex-col">
            <small className="text-sm font-medium">
                Opsi
            </small>
                <div className="flex gap-2 items-center">
                    <EditAdmin admin={myProp.item} />
                    <DropAdmin admin={myProp.item} />
                </div>
            </div>
        </div>
    )

}
export default Admin