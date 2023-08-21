/**
 * Judgeユースケースはノーツの判定を行うビジネスロジック
 */

export default class JudgeRule {
    constructor() {}

    judgeNote(note, chord) {
        return note == chord
    }

    judgeTiming(noteBeatTime, currentFrame, fps, bpm) {
        let noteFrame = noteBeatTime * fps * 60 / bpm;
        let delta = noteFrame - (currentFrame - 0.5);

        if (-2.5 < delta && delta <= 2.5) {
            return "just"
        } else if (-5.0 < delta && delta <= 5.0) {
            return "great"
        } else if (-6.5 < delta && delta <= 6.5) {
            return "good"
        } else if (-7.5 < delta && delta <= 7.5) {
            return "bad"
        }
        
        return "miss"
    }
}
