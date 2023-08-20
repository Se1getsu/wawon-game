/**
 * ChartユースケースはChartのビジネスロジック
 */

export default class ChartUsecase {
    constructor(chart) {
        this.chart = chart;
    }

    setByJSON(json) {
        this.chart.Bpm = json.bpm;
        this.chart.Notes = json.notes;
    }

    setNotesByString(str) {
        // TODO: 実装
        return str
    }

    getBpm() {
        return this.chart.Bpm
    }

    getNotes(startpoint, endpoint) {
        return this.chart.Notes.slice(startpoint, endpoint)
    }

    getChartLength() {
        return this.chart.Notes.length;
    }
}
