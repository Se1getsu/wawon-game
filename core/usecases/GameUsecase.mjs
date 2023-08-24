/**
 * ChartユースケースはChartのビジネスロジック
 */

export default class GameUsecase {
    constructor(game, judgeRule, scoreCalculator) {
        this.game = game;
        this.judgeRule = judgeRule;
        this.scoreCalculator = scoreCalculator;
        
        this.passedBeatTime = -1;
    }

    setChartUsecase(chartUsecase) {
        this.chartUsecase = chartUsecase;
        let notes = chartUsecase.getNotes();
        this.isNotesShown = notes.map(note => note.chord != '');
    }

    setCurrentFrame(frame) {
        this.game.CurrentFrame = frame;
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
        return this.getBpm() / (this.game.Fps * 60);
    }

    getCurrentScore() {
        return this.game.CurrentScore;
    }

    getCombo() {
        return this.game.Combo;
    }

    getKeyBind() {
        return this.chartUsecase.getKeyBind();
    }

    nextFrame(inputChords) {
        let currentFrame = this.game.CurrentFrame;
        currentFrame++;
        this.game.CurrentFrame = currentFrame;

        let {judges, passed} = this._judgeChord([...inputChords]);
        return {
            finished: this.chartUsecase.getChartLength() < this.game.CurrentFrame * this.getBpf(),
            judges: judges,
            passed: passed
        }
    }

    getNotesWithin(startTime, endTime) {
        let bps = this.getBpm() / 60;
        let nowTime = this.game.CurrentFrame / this.getFps();
        startTime += nowTime;
        endTime += nowTime;
        let startBeatTime = Math.ceil(startTime * bps);
        let endBeatTime   = Math.ceil(endTime   * bps);

        let startIndex = Math.max(0, startBeatTime);
        let endIndex = Math.min(this.chartUsecase.getChartLength()-1, endBeatTime);
        let notes = this.chartUsecase.getNotesInRange(startIndex, endIndex);
        let result = [];
        notes.forEach(({chord}, i) => {
            if (chord && this.isNotesShown[startIndex+i]) {
                result.push({
                    timing: (startIndex + i) / bps - nowTime,
                    chord: chord
                });
            }
        });

        return result;
    }

    getBarLineWithin(startTime, endTime) {
        let bps = this.getBpm() / 60;
        let nowTime = this.game.CurrentFrame / this.getFps();
        startTime += nowTime;
        endTime += nowTime;
        let startBeatTime = Math.ceil(startTime * bps);
        let endBeatTime   = Math.ceil(endTime   * bps);

        let startIndex = Math.max(0, startBeatTime);
        let endIndex = Math.min(this.chartUsecase.getChartLength()-1, endBeatTime);
        let notes = this.chartUsecase.getNotesInRange(startIndex, endIndex);
        let result = []
        notes.forEach(({isHeadOfMeasure}, i) => {
            if (isHeadOfMeasure) {
                result.push({
                    timing: (startIndex + i) / bps - nowTime
                });
            }
        });

        return result;
    }

    _judgeChord(inputChords) {
        let range = this.judgeRule.judgeFrameRange();
        let maxBeatTime = Math.floor((this.game.CurrentFrame + range.max) * this.getBpf());
        let inputResult = new Array(inputChords.length).fill('none');
        let passedNotesExists = false;

        for (let i = this.passedBeatTime+1; i <= maxBeatTime; i++) {
            if (!this.isNotesShown[i]) continue;
            let {judge, passed} = this.judgeRule.judgeTiming(i, this.game.CurrentFrame, this.game.Fps, this.getBpm());

            inputChords.forEach((chord, j) => {
                if (chord && chord === this.chartUsecase.getNoteOfIndex(i).chord || passed) {
                    if (this.judgeRule.judgeCombo(judge)) {
                        this.game.increaseCombo();
                    } else {
                        this.game.resetCombo();
                    }
                    this.game.increaseJudge(judge);
                    this.game.increaseScore(this.scoreCalculator.calcNoteScore(
                        judge,
                        this.game.Combo
                    ));

                    inputChords[j] = '';
                    inputResult[j] = judge;
                    this.isNotesShown[i] = false;
                    return;
                }
            })

            if (passed) {
                this.passedBeatTime = i;
                this.game.resetCombo();
                passedNotesExists = true;
                this.isNotesShown[i] = false;
            }
        }

        return {
            judges: inputResult,
            passed: passedNotesExists
        }
    }

    _getCurrentBeatTime() {
        return this.game.CurrentFrame * this.getBpf();
    }
}
