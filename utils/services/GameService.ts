import {BaseClient} from "~/utils/client/BaseClient";

export class GameService extends BaseClient {

    public registerAnswer(
        choiceId: number,
        timeStarted: number,
        timeEnded: number,
        token: string,
    ) {
        try {
            return this.post('/api/v1/game/answers', {
                choice_id: choiceId,
                answer_start: timeStarted,
                answer_end: timeEnded
            }, token)
        } catch (e) {
            throw e
        }
    }

    public getLevelCompleted(
        levelId: number,
        token: string,
    ) {
        try {
            return this.get(`/api/v1/levels/${levelId}/complete`, undefined, token)
        } catch (e) {
            throw e
        }
    }

    public resetLevel(
        levelId: number,
        token: string,
    ) {
        try {
            return this.post(`/api/v1/levels/${levelId}/retry`, {}, token)
        } catch (e) {
            throw e
        }
    }
}