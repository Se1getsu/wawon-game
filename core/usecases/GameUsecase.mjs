/**
 * ChartユースケースはChartのビジネスロジック
 */

export default class GameUsecase {
    constructor(notesLength, game, judgeRule) {
        this.game = game;
        this.judgeRule = judgeRule;
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

    getBpf() {
        return this.bpm / (this.game.Fps * 60);
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
        let minFrame = this.judgeRule.judgeRange().min;
        let minBeatTime = minFrame * this.getBpf();
    }

    _getCurrentBeatTime() {
        return this.game.CurrentFrame * this.getBpf();
    }
}
