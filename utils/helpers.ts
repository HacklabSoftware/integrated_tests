import makeRequest from "./makeRequest";
import config from "../config"

export function sleep(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export function getRandomInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min)
}

const { url, deviceToken } = config
const trakrUrl = `${url}api/v1/${deviceToken}/telemetry`
export async function processSafetyEvents(eventName: string, sentPacket: any, summaryPacket: any, safetyCount: any) {
    if (summaryPacket[eventName] > sentPacket[eventName]) {
        sentPacket[eventName]++;
        await sleep(1000)
        console.log("Saving safety event", eventName, "@", new Date())
        await makeRequest(trakrUrl, "POST", { event: eventName, ts: Date.now(), OPID: sentPacket.OPID, UID: sentPacket.UID });
        safetyCount.count--;
    }
}
export function roundUpToNearestTen(num: number) {
    return Math.ceil(num / 10) * 10;
}

export async function processProductivityEvent(eventName: string, iterator: number, sentPacket: any, offset: number) {
    while (iterator > 0) {
        console.log("Saving productivity event", eventName, "@", new Date())
        await makeRequest(trakrUrl, "POST", { event: eventName, ts: Date.now(), OPID: sentPacket.OPID, UID: sentPacket.UID });
        await sleep(1000 * (offset - 1)) // account for 1 second sleep in makeRequest
        if (eventName === "LOAD") {
            sentPacket.TMOV += offset;
        }
        if (eventName === "MMOV") {
            sentPacket.TL1 += offset;
        }
        if (eventName === "NLOA") {
            sentPacket.TNOL += offset;
        }
        iterator--;
    }
}
