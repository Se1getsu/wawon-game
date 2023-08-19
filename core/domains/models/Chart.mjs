/**
 * Chartドメインは譜面の情報を保持する
 */

export default class Chart {
    get Notes() {
        return this.notes;
    }

    set Notes(notes) {
        this.notes = notes;
    }

    get Bpm() {
        return this.bpm;
    }

    set Bpm(bpm) {
        this.bpm = bpm;
    }
}