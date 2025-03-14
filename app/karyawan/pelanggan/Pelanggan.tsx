"use client"

import { UserType } from "../types"
import DropPelanggan from "./dropPelanggan"
import EditPelanggan from "./editPelanggan"
import ResetPasswordPelanggan from "./ResetPasswordPelanggan"

type props = {
    item: UserType
}

const Pelanggan = (myProp: props) => {
    return (
        <div className="w-full flex flex-wrap my-2 border rounded-md">
            <div className="w-full md:w-3/12 p-2 flex flex-col">
                <small className="text-sm font-medium">
                    Nama
                </small>
                <span>
                    {myProp.item.name}
                </span>
            </div>
            <div className="w-full md:w-2/12 p-2 flex flex-col">
                <small className="text-sm font-medium">
                    Address
                </small>
                <span>
                    {myProp.item.address}
                </span>
            </div>
            <div className="w-full md:w-2/12 p-2 flex flex-col">
                <small className="text-sm font-medium">
                    Phone
                </small>
                <span>
                    {myProp.item.phone}
                </span>
            </div>
            <div className="w-full md:w-1/12 p-2 flex flex-col">
                <small className="text-sm font-medium">
                    Username
                </small>
                <span>
                    {myProp.item.user_details.username}
                </span>
            </div>
            <div className="w-full md:w-2/12 p-2 flex flex-col">
                <small className="text-sm font-medium">
                    Role
                </small>
                <span>
                    {myProp.item.user_details.role}
                </span>
            </div>
            <div className="w-full md:w-2/12 p-2 flex flex-col">
                <small className="text-sm font-medium">
                    Opsi
                </small>
                <div className="flex gap-2 items-center">
                    <EditPelanggan pelanggan={myProp.item} />
                    <DropPelanggan pelanggan={myProp.item} />
                    <ResetPasswordPelanggan pelanggan={myProp.item} />
                </div>
            </div>
        </div>
    )
}
export default Pelanggan