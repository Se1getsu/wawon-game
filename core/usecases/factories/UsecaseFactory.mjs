import DomainFactory from "../../domains/models/factories/DomainFactory.mjs";
import ChartUsecase from "../ChartUsecase.mjs";
import GameUsecase from "../GameUsecase.mjs";
import JudgeRule from "../JudgeRule.mjs";
import MusicListUsecase from "../MusicListUsecase.mjs";
import MusicUsecase from "../MusicUsecase.mjs";
import ScoreCalculator from "../ScoreCalculator.mjs";

export default class UsecaseFactory {
    constructor() {
        this.domainFactory = new DomainFactory()
    }

    createChartUsecase() {
        return new ChartUsecase(
            this.domainFactory.createChart()
        )
    }

    createGametUsecase() {
        return new GameUsecase(
            this.domainFactory.createGame(),
            this.createJudgeRule(),
            this.createScoreCalculator()
        )
    }

    createJudgeRule() {
        return new JudgeRule()
    }

    createMusicUsecase() {
        return new MusicUsecase(
            this.domainFactory.createMusic(),
            this.createChartUsecase()
        )
    }

    createMusicListUsecase(length) {
        return new MusicListUsecase(
            Array.from({ length: length }, () => this.createMusicUsecase())
        )
    }

    createScoreCalculator() {
        return new ScoreCalculator()
    }
}
