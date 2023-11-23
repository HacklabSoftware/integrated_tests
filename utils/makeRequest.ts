import config from "../config"
import axios, { AxiosError } from "axios"
import { sleep } from "./helpers"
const makeRequest = async (url: string, method: string, body?: any) => {
    await sleep(config.thinkTime * 1000)
    try {
        const response = await axios({
            url,
            method,
            data: body
        })
        // return response.data
    } catch (err: any) {
        console.log(err.message, err.code, err.config.url, err.config.method, err.config.data)
    }
}

export default makeRequest
