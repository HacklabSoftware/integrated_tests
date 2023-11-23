import config from "../config"
import axios from "axios"
import { sleep } from "./helpers"
const makeRequest = async (url: string, method: string, body?: any) => {
    await sleep(config.thinkTime * 1000)
    try {
        const response = await axios({
            url,
            method,
            data: body
        })
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export default makeRequest
