import Chart from "../Chart.mjs";
import Music from "../Music.mjs";

export default class DomainFactory {
    constructor() {}

    createChart() {
        return new Chart()
    }

    createMusic() {
        return new Music()
    }
}
