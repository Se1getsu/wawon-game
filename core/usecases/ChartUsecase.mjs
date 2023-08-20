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
}
