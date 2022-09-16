import { HASH } from "assemblyscript/std/assembly/util/hash";

// @ts-ignore
@external("env", "updateHash")
declare function updateHash(updater: anyref, hasher: Hasher): void;

class Hasher {

    count: u32;
    hash: u32;

    constructor() {
        this.count = 0;
        this.hash = 0;
    }

    update(value: anyref): void {
        if(isString(value))
            this.update32(HASH<string>(value as string));
        else if(isFloat(value))
            this.update32(HASH<u32>(reinterpret<u32>(value)));
        else if(isInteger(value))
            this.update32(HASH<u32>(u32(value)));
        else
            updateHash(value, this);
    }

    update32(value: u32): void {
        value *= 0xCC9E2D51;
        value = (value << 15) | (value >>> (32 - 15));
        value *= 0x1B873593;
        this.count = this.count + 1;
        let hash = this.hash ^ value;
        hash = (hash << 13) | (hash >>> (32 - 13));
        hash *= 5;
        hash += 0xE6546B64;
        this.hash = hash;
    }

    updateString(value: string): void {
        this.update32(HASH<string>(value));
    }

    finish(): u32 {
        let hash = this.hash ^ (this.count * 4);
        hash ^= (hash >>> 16);
        hash *= 0x85EBCA6B;
        hash ^= (hash >>> 13);
        hash *= 0xC2B2AE35;
        hash ^= (hash >>> 16);
        return hash;
    }

}

export function hasherUpdate32(hasher: Hasher, value: u32): void {
    hasher.update32(value);
}

export function hasherUpdateString(hasher: Hasher, value: string): void {
    hasher.updateString(value);
}

export function hash32(value: u32): u32 {
    return HASH<u32>(value);
}

export function hash32s(value: u32[]): u32 {
    const hasher = new Hasher();
    for(let i=0;i<value.length;i++)
        hasher.update32(value[i]);
    return hasher.finish();
}

export function hash64(value: u64): u32 {
    return HASH<u64>(value);
}

export function hashString(value: string): u32 {
    return HASH<string>(value);
}

export function hashRef(v1: anyref): u32 {
    const hasher = new Hasher();
    hasher.update(v1);
    return hasher.finish();
}

export function hash2(v1: anyref, v2: anyref): u32 {
    const hasher = new Hasher();
    hasher.update(v1);
    hasher.update(v2);
    return hasher.finish();
}

export function hash3(v1: anyref, v2: anyref, v3: anyref): u32 {
    const hasher = new Hasher();
    hasher.update(v1);
    hasher.update(v2);
    hasher.update(v3);
    return hasher.finish();
}

export function hash4(v1: anyref, v2: anyref, v3: anyref, v4: anyref): u32 {
    const hasher = new Hasher();
    hasher.update(v1);
    hasher.update(v2);
    hasher.update(v3);
    hasher.update(v4);
   return hasher.finish();
}

export function hash5(v1: anyref, v2: anyref, v3: anyref, v4: anyref, v5: anyref): u32 {
    const hasher = new Hasher();
    hasher.update(v1);
    hasher.update(v2);
    hasher.update(v3);
    hasher.update(v4);
    hasher.update(v5);
    return hasher.finish();
}
