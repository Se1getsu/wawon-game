/**
 * MusicユースケースはMusicのビジネスロジック
 */

export default class MusicUsecase {
    constructor(music, chartUseCase) {
        this.music = music;
        this.chartUseCase = chartUseCase;
        chartUseCase.music = music;
    }

    setByJson(json) {
        this.music.title = json.title;
        this.music.file = json.file;
        this.chartUseCase.setByJson(json);
    }
}
