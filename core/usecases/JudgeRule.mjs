/**
 * Judgeユースケースはノーツの判定を行うビジネスロジック
 */

export default class JudgeRule {
    constructor() {}

    judgeNote(note, chord) {
        return note == chord
    }

    judgeFrameRange() {
        return {
            min: -9.5,
            max: 9.5
        };
    }

    judgeTiming(noteBeatTime, currentFrame, fps, bpm) {
        let noteFrame = noteBeatTime * fps * 60 / bpm;
        let delta = noteFrame - (currentFrame - 0.5);

        if (-2.5 < delta && delta <= 2.5) {
            return {
                judge: "just",
                passed: false
            };

        } else if (-6.0 < delta && delta <= 6.0) {
            return {
                judge: "great",
                passed: false
            };

        } else if (-7.5 < delta && delta <= 7.5) {
            return {
                judge: "good",
                passed: false
            };

        } else if (-9.5 < delta && delta <= 9.5) {
            return {
                judge: "bad",
                passed: false
            };
        }
        
        return {
            judge: "miss",
            passed: delta <= -9.5
        };
    }

    judgeCombo(judge) {
        return judge === "just" || judge === "great";
    }
}
