import {defineStore} from "pinia";
import type {Level, Scenario} from "~/utils/types/types";
import LevelIntro from "~/components/game/level-intro.vue";
import ScenarioIntro from "~/components/game/scenario-intro.vue";
import Completion from "~/components/game/completion.vue";

export const useGameStore = defineStore('gameStore', () => {


    const levelId = ref<string|null>(null)
    const scenarioId = ref<string|null>(null)


    const currentLevel = ref<Level|null>(null)

    const pointsToLose = ref(0)

    const currentScenario = computed(() => {

        if(!currentLevel.value.progress.currentScenario) {
            return null
        }
        return currentLevel.value.scenarios.filter((sc) =>
            parseInt(sc.id) === currentLevel.value.progress.currentScenario
        )[0]
    })

    const resolveInitialComponent = () => {
        if (!currentLevel.value) {
            return LevelIntro
        }

        if (currentLevel.value.progress.progress === 100) {
            return Completion
        }

        if (currentLevel.value.progress.progress === 0) {
            return LevelIntro
        }

        return ScenarioIntro
    }

    const scene = shallowRef(resolveInitialComponent())
    watch(currentLevel, () => {
        scene.value = resolveInitialComponent(); // Update the scene when the currentLevel changes
    });


    const currentScene = computed(() => {
        if (scene.value === 'no component') {
            return resolveInitialComponent()
        }

        return scene.value
    })

    const changeScene = (newScene) => {
        scene.value = newScene
    }

    const nextScenario = () => {
        const scenarioId = currentScenario.value.id;
        const index = currentLevel.value.scenarios.findIndex((sc: Scenario): boolean => sc.id === scenarioId);

        if (index !== -1 && index < currentLevel.value.scenarios.length - 1) {
            currentLevel.value.progress.currentScenario = currentLevel.value.scenarios[index + 1].id
            currentLevel.value.progress.progress += 33
            changeScene(ScenarioIntro)
            return currentLevel.value.scenarios[index + 1];
        }

        changeScene(Completion)
        return null;
    };

    return {
        levelId,
        scenarioId,
        currentLevel,
        currentScenario,
        scene,
        currentScene,
        pointsToLose,
        resolveInitialComponent,
        changeScene,
        nextScenario
    }
})