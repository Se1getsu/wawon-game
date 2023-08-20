/**
 * MusicListユースケースはArray<Music>のビジネスロジック
 */

export default class MusicListUsecase {
    constructor(musics) {
        this.musics = musics
    }

    setMusicByJson(json) {
        this.musics = json;
    }

    getMusicByIndex(index) {
        return this.musics[index];
    }

    getLength() {
        return this.musics.length;
    }
}
