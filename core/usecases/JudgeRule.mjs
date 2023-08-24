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
            min: -7.5,
            max: 7.5
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

        } else if (-5.0 < delta && delta <= 5.0) {
            return {
                judge: "great",
                passed: false
            };

        } else if (-6.5 < delta && delta <= 6.5) {
            return {
                judge: "good",
                passed: false
            };

        } else if (-7.5 < delta && delta <= 7.5) {
            return {
                judge: "bad",
                passed: false
            };
        }
        
        return {
            judge: "bad",
            passed: delta <= -7.5
        };
    }

    judgeCombo(judge) {
        return judge === "just" || judge === "great";
    }
}
