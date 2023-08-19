/**
 * LocalJsonReaderクラスはローカルのJSONファイルを読み込む。
 */

export default class LocalJsonReader {
    async load(path) {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error("Failed to fetch: ${path}");
        }
        return response.json();
    }
}
