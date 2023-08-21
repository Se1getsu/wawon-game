import LocalJsonReader from "../LocalJsonReader.mjs";

export default class AdapterFactory {
    constructor() {}

    createLocalJsonReader() {
        return new LocalJsonReader()
    }
}
