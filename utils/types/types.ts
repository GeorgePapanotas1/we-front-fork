export interface LoginResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export interface MeResponse {
    "id": number,
    "firstname": string | null,
    "lastname": string | null,
    "email": string,
    "language": string,
    "avatar": string,
    "points": number
}

export interface User {
    id: number | null;
    name: string | null;
    surname: string | null;
    email: string | null;
    language: string | null;
    avatar: string | null;
    points: string | number | null;
}

export interface Choice {
    id: string
    text: string
    explanation: string
    isCorrect: boolean
}
export interface Scenario {
    id: string
    name: string
    intro: string
    question: string
    image: string
    choices: Choice[]
}
export interface LevelProgress {
    progress: number
    currentScenario: number
    gem: string
}
export interface Level {
    id: string
    name: string
    intro: string
    outro: string
    image: string
    scenarios: Scenario[]
    progress: LevelProgress
}