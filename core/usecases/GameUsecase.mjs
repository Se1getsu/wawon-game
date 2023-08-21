/**
 * ChartユースケースはChartのビジネスロジック
 */

export default class GameUsecase {
    constructor(notesLength, game) {
        this.game = game;
        this.isNotesShown = Array(notesLength).fill(true);
    }

    setBpm(bpm) {
        this.bpm = bpm;
    }

    getBpm() {
        return this.bpm;
    }

    setFps(fps) {
        this.game.Fps = fps;
    }

    getFps() {
        return this.game.Fps;
    }

    getCurrentScore(score) {
        return this.game.CurrentScore;
    }

    nextFrame(chord) {
        let currentFrame = this.game.CurrentFrame;
        currentFrame++;
        this.game.CurrentFrame = currentFrame;

        _judgeChord(chord)
        _judgePassedNotes()
    }

    _judgeChord(chord) {
        // TODO: 実装
    }

    _judgePassedNotes() {
        // TODO: 実装
    }

    _getCurrentBeatTime() {
        return this.game.CurrentFrame * this.game.Fps * 60 / this.bpm;
    }
}
