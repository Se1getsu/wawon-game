/**
 * MusicユースケースはMusicのビジネスロジック
 */

export default class MusicUsecase {
    constructor(music, chartUseCase) {
        this.music = music;
        this.chartUseCase = chartUseCase;
        chartUseCase.music = music;
    }

    setMusicByJson(json) {
        this.music.Title = json.title;
        this.music.File = json.file;
        this.chartPath = json.chart;
    }

    setChartByJson(json) {
        this.chartUseCase.setByJson(json);
    }

    getTitle() {
        return this.music.Title
    }

    getAudioFile() {
        return this.music.File
    }

    getChartFile() {
        return this.chartPath
    }

    getChartUsecase() {
        return this.chartUseCase
    }
}
