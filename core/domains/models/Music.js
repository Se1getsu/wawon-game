/**
 * Musicドメインは曲の情報を保持する
 */

class Music {
    get Chart() {
        return this.chart;
    }

    set Chart(chart) {
        this.chart = chart;
    }

    get Title() {
        return this.title;
    }

    set Title(title) {
        this.bpm = title;
    }

    get AudioFilePath() {
        return this.audioFilePath;
    }

    set AudioFilePath(audioFilePath) {
        this.audioFilePath = audioFilePath;
    }
}