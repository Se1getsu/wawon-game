import DomainFactory from "../../domains/models/factories/DomainFactory.mjs";
import ChartUsecase from "../ChartUsecase.mjs";
import GameUsecase from "../GameUsecase.mjs";
import MusicListUsecase from "../MusicListUsecase.mjs";
import MusicUsecase from "../MusicUsecase.mjs";

export default class UsecaseFactory {
    constructor() {
        this.domainFactory = new DomainFactory()
    }

    createChartUsecase() {
        return new ChartUsecase(
            this.domainFactory.createChart()
        )
    }

    createGametUsecase(notesLength) {
        return new GameUsecase(
            notesLength,
            this.domainFactory.createGame()
        )
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
}
