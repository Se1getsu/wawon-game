/**
 * ChartユースケースはChartのビジネスロジック
 */

export default class ChartUsecase {
    constructor(chart) {
        this.chart = chart;
    }

    setByJSON(json) {
        this.chart.bpm = json.bpm;
        this.notes = json.notes;
    }

    setNotesByString(str) {
        // TODO: 実装
        return str
    }

    getBpm() {
        return bpm
    }

    getNotes(startpoint, endpoint) {
        return this.notes.slice(startpoint, endpoint)
    }

    getChartLength() {
        return this.notes.length;
    }
}
