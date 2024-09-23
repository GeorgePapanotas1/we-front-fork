import {defineStore} from "pinia";
import {LevelsService} from "~/utils/services/LevelsService";
import type {Level} from "~/utils/types/types";


export const useLevelsStore = defineStore('levelsStore', () => {

    const levelsService: LevelsService = new LevelsService()

    const levels = ref<Level[]>([])

    const fetchLevels = () => {
        levels.value = []
        return levelsService.getLevels(useAuthStore().token).then( (response: Level[]) => {
            levels.value = response
        }).catch((e) => {
            console.log(e)
            throw e;
        });
    }

    const refreshLevel = (levelId: string) => {
        return levelsService.getLevel(levelId, useAuthStore().token)
            .then((updatedLevel: Level) => {
                const index = levels.value.findIndex((level) => level.id === levelId);

                if (index !== -1) {
                    levels.value[index] = updatedLevel;
                } else {
                    levels.value.push(updatedLevel);
                }
            })
            .catch((e) => {
                console.log(e);
                throw e;
            });

    }

    const filterLevel = (levelId: string): Level => {
        return levels.value.filter((l: Level) => l.id === levelId)[0]
    }


    return  {
        levels,
        fetchLevels,
        filterLevel,
        refreshLevel
    }

})