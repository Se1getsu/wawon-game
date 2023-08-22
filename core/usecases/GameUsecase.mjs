/**
 * ChartユースケースはChartのビジネスロジック
 */

export default class GameUsecase {
    constructor(game, judgeRule) {
        this.game = game;
        this.judgeRule = judgeRule;
        
        this.passedBeatTime = 0;
    }

    setChartUsecase(chartUsecase) {
        this.chartUsecase = chartUsecase;
        let notes = chartUsecase.getNotes();
        this.isNotesShown = notes.map(note => note != '');
    }

    getBpm() {
        return this.chartUsecase.getBpm();
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

    nextFrame(inputChords) {
        let currentFrame = this.game.CurrentFrame;
        currentFrame++;
        this.game.CurrentFrame = currentFrame;

        return _judgeChord([...inputChords])
    }

    _judgeChord(inputChords) {
        let range = this.judgeRule.judgeFrameRange();
        let maxBeatTime = Math.floor((currentFrame + range.max) * this.getBpf());
        let inputResult = new Array(inputChords.length).fill('miss');
        
        for (let i = this.passedBeatTime+1; i < maxBeatTime; i++) {
            if (!this.isNotesShown[i]) continue;
            let {judge, passed} = this.judgeRule.judgeTiming(i, this.game.CurrentFrame, this.game.Fps, this.bpm);

            inputChords.forEach((chord, j) => {
                if (chord && chord === this.chartUsecase.getNoteByIndex(i).chord || passed) {
                    this.game.incrementJudge(judge);
                    // TODO: スコア計算
                    inputChords[j] = '';
                    inputResult[j] = judge;
                    this.isNotesShown[i] = false;
                    return;
                }
            })

            if (passed) this.passedBeatTime = i;
        }

        return inputResult
    }

    _getCurrentBeatTime() {
        return this.game.CurrentFrame * this.getBpf();
    }
}
