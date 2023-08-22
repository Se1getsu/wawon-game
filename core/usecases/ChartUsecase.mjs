/**
 * ChartユースケースはChartのビジネスロジック
 */

export default class ChartUsecase {
    constructor(chart) {
        this.chart = chart;
    }

    setByJson(json) {
        this.chart.Bpm = json.bpm;
        this.setNotesByString(json.notes);
    }

    setNotesByString(str) {
        str = str.replace(/ /g, '');
        const parts = str.split('|');
        const notes = [];
        
        for (let i = 0; i < parts.length; i++) {
            const subparts = parts[i].split(',');
        
            for (let j = 0; j < subparts.length; j++) {
                notes.push({
                    chord: subparts[j],
                    isHeadOfMeasure: j === 0
                });
            }
        }
        
        this.chart.Notes = notes;
    }

    getBpm() {
        return this.chart.Bpm
    }

    getNotes() {
        return this.chart.Notes
    }

    getNoteOfIndex(index) {
        return this.chart.Notes[index];
    }

    getNotesInRange(startpoint, endpoint) {
        return this.chart.Notes.slice(startpoint, endpoint)
    }

    getChartLength() {
        return this.chart.Notes.length;
    }
}
