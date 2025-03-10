// cookie = temapt menyimpan pada browser,
// biasanya untuk menyimpan data user session

import Cookies from "js-cookie"
import { cookies } from "next/headers"


export const getServerCookie = async (
    key: string
): Promise<string> => {
    return (await cookies()).get(key)?.value || ""
}

