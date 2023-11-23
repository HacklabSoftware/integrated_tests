import config from './config';
import getSummary from './utils/getSummary';
import { processProductivityEvent, processSafetyEvents, sleep } from "./utils/helpers"
import makeRequest from './utils/makeRequest';

const { iterations, rampUpTime, duration, url, deviceToken } = config;
let currentIteration = 0;
const now = new Date();
const date = now.toLocaleDateString();
const time = now.toLocaleTimeString();

console.log(`Test started at ${date} ${time}`);

(async () => {
    while (iterations > currentIteration) {
        await sleep(rampUpTime * 1000)
        currentIteration++;
        const summaryPacket = getSummary(duration);
        let sentPacket = {
            OPID: summaryPacket.OPID,
            UID: summaryPacket.UID,
            CASA: 0,
            CASE: 0,
            ACSA: 0,
            ACSE: 0,
            IMPC: 0,
            IMPS: 0,
            OVER: 0,
            SPED: 0,
            TL1: 0,
            TMOV: 0,
            TNOL: 0,
        }
        let count = duration;
        let safetyCount = { count: summaryPacket.ACSA + summaryPacket.ACSE + summaryPacket.CASA + summaryPacket.CASE + summaryPacket.IMPC + summaryPacket.IMPS + summaryPacket.OVER + summaryPacket.SPED };

        console.log("Starting safety event processing")
        console.time("Safety event processing time")
        while (count > 0) {
            const eventNames = ["CASA", "CASE", "ACSA", "ACSE", "IMPC", "IMPS", "OVER", "SPED"];
            for (const eventName of eventNames) {
                await processSafetyEvents(eventName, sentPacket, summaryPacket, safetyCount);
            }
            count--;
            if (safetyCount.count === 0) {
                console.log("All safety events processed")
                console.timeEnd("Safety event processing time")
                console.groupEnd()
                break;
            }
        }


        console.log("Starting productivity event processing")
        console.time("Productivity event processing time")
        const OFFSET = 10

        let eventIterators: {
            [key: string]: number
        } = {
            LOAD: summaryPacket.TL1 / OFFSET,
            MMOV: summaryPacket.TMOV / OFFSET,
            NLOA: summaryPacket.TNOL / OFFSET
        };
        for (let eventName in eventIterators) {
            await processProductivityEvent(eventName, eventIterators[eventName], sentPacket, OFFSET);
        }

        console.log("All productivity events processed")
        console.timeEnd("Productivity event processing time")
        summaryPacket.ETIM = new Date()
        console.log(summaryPacket)
        console.log("Saving summary packet @", new Date())
        await makeRequest(`${url}api/v1/${deviceToken}/telemetry`, "POST", summaryPacket);
        console.log("Processed data", { summaryPacket, sentPacket })

    }
})()
