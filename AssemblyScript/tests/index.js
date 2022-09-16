import { updateHash } from "../src/hashUtils.js";
globalThis.updateHash = updateHash;
import { hash32, hash32s, hashString, hashRef, hasherUpdateString } from "../build/release.js";
import HashCode from "./HashCode.js";

class Hashable {

    constructor(i) {
        this.i = i;
    }

    updateHash(hasher) {
        hasherUpdateString(hasher, "Hello-" + this.i);
    }

    updateHashCode(hashCode) {
        hashCode.update("Hello-" + this.i);
    }
}

// const hashable = new Hashable(1);
// console.log("hashref (js) -> " + HashCode.hashStuff(hashable));
// console.log("hashref (as) -> " + hashRef(hashable));

// console.log("hashNumber 549 -> " + hashNumber(549));
// console.log("hashString 'abcdef' -> " + hashString('abcdef'));

const u32s = [...Array(1000).keys()];

let before = Date.now();
for (let i = 0; i < 1000; i++) {
    HashCode.hashStuff(u32s);
    // HashCode.hashStuff(i);
    // HashCode.hashStuff('abc-' + i);
    // HashCode.hashStuff(new Hashable(i));
}
let after = Date.now();

console.log("js: " + (after - before));

before = Date.now();
for (let i = 0; i < 1000; i++) {
    hash32s(u32s);
    // hash32(i);
    // hashString('abc-' + i);
    // hashRef(new Hashable(i));
}
after = Date.now();

console.log("as: " + (after - before));
