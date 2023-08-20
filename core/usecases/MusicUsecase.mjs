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
        this.music.title = json.title;
        this.music.file = json.file;
    }

    setChartByJson(json) {
        this.chartUseCase.setByJson(json);
    }

    getTitle() {
        return this.music.title
    }

    getAudioFile() {
        return this.music.file
    }

    getChartUsecase() {
        return this.chartUseCase
    }
}
