import {BaseClient} from "~/utils/client/BaseClient";

export class LevelsService extends BaseClient {

    public getLevels (token: string) {
        try {
            return this.get('/api/v1/levels', undefined, token)
        } catch (e) {
            throw e
        }
    }

    public getLevel (levelId: string, token: string) {
        try {
            return this.get(`/api/v1/levels/${levelId}`, undefined, token)
        } catch (e) {
            throw e
        }
    }
}