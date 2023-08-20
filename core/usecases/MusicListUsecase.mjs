/**
 * MusicListユースケースはArray<Music>のビジネスロジック
 */

export default class MusicListUsecase {
    constructor(musics) {
        this.musics = musics
    }

    setMusicListByJson(json) {
        json.forEach((musicJson, index) => {
            this.musics[index].setMusicByJson(musicJson)
        });
    }

    getMusicUsecaseByIndex(index) {
        return this.musics[index];
    }

    getLength() {
        return this.musics.length;
    }
}
