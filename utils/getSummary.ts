import { getRandomInRange, roundUpToNearestTen } from "./helpers";
type Summary = {
    CASA: number,
    event: "SUMM",
    CASE: number,
    ACSA: number,
    ACSE: number,
    IMPC: number,
    IMPS: number,
    OVER: number,
    SPED: number,
    STIM: number,
    ETIM: number,
    OPID: string,
    UID: number,
    ts: number,
    TL1: number,
    TMOV: number,
    TNOL: number,
    BATS: number,
    BATE: number,
    FULS: number,
    FULE: number,
}

const MAX_SAFETY_VIOLATIONS = 7;
const MIN_SAFETY_VIOLATIONS = 1;
export default (duration: number): Summary => {
    const validOPID = ["OP1", "OP2", "OP3", "OP4", "OP5"]
    const startMs = Date.now();
    const endMs = startMs + (duration * 1000);
    const ts = endMs + getRandomInRange(1, 1000)
    const OPID = validOPID[getRandomInRange(0, validOPID.length - 1)]
    const UID = getRandomInRange(1, 150)
    const TL1 = getRandomInRange(1, (duration / 5))
    const TMOV = getRandomInRange(1, (duration / 5))
    const TNOL = getRandomInRange(1, (duration / 5))
    const BATS = getRandomInRange(85, 100)
    const BATE = getRandomInRange(65, BATS)
    const FULS = getRandomInRange(85, 100)
    const FULE = getRandomInRange(65, FULS)
    const safety = {
        CASA: getRandomInRange(MIN_SAFETY_VIOLATIONS, MAX_SAFETY_VIOLATIONS),
        CASE: getRandomInRange(MIN_SAFETY_VIOLATIONS, MAX_SAFETY_VIOLATIONS),
        ACSA: getRandomInRange(MIN_SAFETY_VIOLATIONS, MAX_SAFETY_VIOLATIONS),
        ACSE: getRandomInRange(MIN_SAFETY_VIOLATIONS, MAX_SAFETY_VIOLATIONS),
        IMPC: getRandomInRange(MIN_SAFETY_VIOLATIONS, MAX_SAFETY_VIOLATIONS),
        IMPS: getRandomInRange(MIN_SAFETY_VIOLATIONS, MAX_SAFETY_VIOLATIONS),
        OVER: getRandomInRange(MIN_SAFETY_VIOLATIONS, MAX_SAFETY_VIOLATIONS),
        SPED: getRandomInRange(MIN_SAFETY_VIOLATIONS, MAX_SAFETY_VIOLATIONS),

    }
    return {
        STIM: startMs,
        ETIM: endMs,
        "OPID": OPID,
        "UID": UID,
        ts,
        event: "SUMM",
        "TL1": roundUpToNearestTen(TL1),
        "TMOV": roundUpToNearestTen(TMOV),
        "TNOL": roundUpToNearestTen(TNOL),
        "BATS": BATS,
        "BATE": BATE,
        "FULS": FULS,
        "FULE": FULE,
        ...safety
    }
}
