// Fix: Define and export enums and interfaces instead of constants to resolve circular dependencies and type errors.
export enum Pose {
    POWER = 'powerful stance',
    THINKING = 'thoughtful pose',
    CASUAL = 'relaxed and casual stance',
    JOYFUL_JUMP = 'joyful jump in the air',
    DANCING = 'dynamic dancing pose',
    HEROIC = 'heroic pose, looking into the distance'
}

export enum Location {
    NEON_CYBERPUNK_CITY = 'neon-lit cyberpunk city street at night',
    ENCHANTED_FOREST = 'magical, enchanted forest with glowing flora',
    MARS_SURFACE = 'barren, reddish surface of Mars with distant mountains',
    ANCIENT_RUINS = 'crumbling ancient ruins in a jungle',
    TROPICAL_BEACH = 'pristine tropical beach at sunset',
    FUTURISTIC_SPACESHIP_BRIDGE = 'bridge of a futuristic spaceship with holographic displays'
}

export enum CameraAngle {
    LOW_ANGLE = 'low angle shot, looking up',
    HIGH_ANGLE = 'high angle shot, looking down',
    DUTCH_ANGLE = 'dutch angle for a disorienting effect',
    EYE_LEVEL = 'straight-on eye-level shot',
    BIRDS_EYE_VIEW = 'bird\'s-eye view, directly overhead',
    WORM_S_EYE_VIEW = 'worm\'s-eye view, from the ground up'
}

export enum AspectRatio {
    SQUARE = '1:1',
    PORTRAIT_4_5 = '4:5',
    PORTRAIT_9_16 = '9:16',
    LANDSCAPE_16_9 = '16:9',
    LANDSCAPE_4_3 = '4:3'
}

export interface Option<T> {
  value: T;
  label: string;
}
