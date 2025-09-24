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

export enum ClothingStyle {
    KEBAYA = 'wearing a beautiful, elegant Kebaya',
    T_SHIRT_JEANS = 'wearing a casual t-shirt and jeans',
    FORMAL_SUIT = 'wearing a sharp, formal business suit',
    SUMMER_DRESS = 'wearing a light and airy summer dress',
    WINTER_COAT = 'wearing a warm winter coat and scarf'
}

export enum HairStyle {
    KEEP_ORIGINAL = 'keep original hair/hijab',
    AI_CHOICE = 'AI choice for hair/hijab'
}

export enum ArtisticStyle {
    REALISTIC = 'photorealistic',
    CARTOON = 'cartoon',
    OIL_PAINTING = 'oil painting',
    WATERCOLOR = 'watercolor painting',
    ANIME_MANGA = 'anime/manga',
    PIXEL_ART = 'pixel art',
    LINE_ART = 'line art'
}

export enum AspectRatio {
    SQUARE = '1:1',
    PORTRAIT_4_5 = '4:5',
    PORTRAIT_9_16 = '9:16',
    LANDSCAPE_16_9 = '16:9',
    LANDSCAPE_4_3 = '4:3'
}

export enum BlurAmount {
    NONE = 'no background blur, the entire scene is in sharp focus',
    SUBTLE = 'a subtle background blur (bokeh) to gently separate the subject from the background',
    MEDIUM = 'a medium background blur (bokeh) for a clear separation and professional portrait look',
    HEAVY = 'a heavy, creamy background blur (bokeh) where the background is indistinct, making the subject dramatically pop'
}

export enum ResizeMode {
    LETTERBOX = 'letterbox',
    CROP = 'crop'
}

export enum PictureQuality {
    STANDARD = 'standard quality',
    HIGH = 'high quality',
    ULTRA_HIGH = 'ultra high quality',
    ULTRA_HIGH_DETAIL = 'ultra high detail quality',
    FULL_HD = 'Full HD (1080p) quality with sharp details',
    FOUR_K = 'stunning 4K resolution with photorealistic detail',
    EIGHT_K = 'cinematic 8K resolution with hyper-realistic detail'
}


export interface Option<T> {
  value: T;
  label: string;
}