import {BaseClient} from "~/utils/client/BaseClient";

export class LeaderboardService extends BaseClient {

    public getLevels(token: string) {

        try {
            return this.get('/api/v1/leaderboard', undefined, token)
        } catch (e) {
            throw e
        }
    }
}