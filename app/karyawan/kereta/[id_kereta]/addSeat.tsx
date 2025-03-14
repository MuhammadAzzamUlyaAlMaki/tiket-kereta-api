import { useRouter } from "next/navigation"
import { useState } from "react"

type props = {
    id_kereta : number
}

const AddSeat = (myProp: props) => {

        const [seat_number, setSeatNumber] = useState<string>("")
        const [show, setShow] = useState<boolean>(false)
        const router = useRouter()
    
        const openModal = () => {
            setShow(true)
            setSeatNumber("")     
        }
    
        const closeModal = () => {
            setShow(false)
        }

    return(
        <div>
            <button type="button" className="size-20 rounded-sm flex items-center justify-center bg-lime-700 hover:bg-lime-600"></button>
        </div>
    )
}
export default AddSeat