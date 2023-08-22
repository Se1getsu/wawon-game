import LocalJsonReader from "../LocalJsonReader.mjs";

export default class InfrastructureFactory {
    constructor() {}

    createLocalJsonReader() {
        return new LocalJsonReader()
    }
}
