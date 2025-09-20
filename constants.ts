// Fix: Import all types from the corrected `types.ts` file and remove the redundant `Option` interface.
import { Pose, Location, CameraAngle, AspectRatio, Option, BlurAmount } from './types';

export const POSE_OPTIONS: Option<Pose>[] = [
    { value: Pose.POWER, label: 'Pose Kuat' },
    { value: Pose.THINKING, label: 'Berpikir' },
    { value: Pose.CASUAL, label: 'Santai' },
    { value: Pose.JOYFUL_JUMP, label: 'Melompat Gembira' },
    { value: Pose.DANCING, label: 'Menari' },
    { value: Pose.HEROIC, label: 'Heroik' }
];

export const LOCATION_OPTIONS: Option<Location>[] = [
    { value: Location.NEON_CYBERPUNK_CITY, label: 'Kota Cyberpunk' },
    { value: Location.ENCHANTED_FOREST, label: 'Hutan Ajaib' },
    { value: Location.MARS_SURFACE, label: 'Permukaan Mars' },
    { value: Location.ANCIENT_RUINS, label: 'Reruntuhan Kuno' },
    { value: Location.TROPICAL_BEACH, label: 'Pantai Tropis' },
    { value: Location.FUTURISTIC_SPACESHIP_BRIDGE, label: 'Jembatan Pesawat Luar Angkasa' }
];

export const CAMERA_ANGLE_OPTIONS: Option<CameraAngle>[] = [
    { value: CameraAngle.LOW_ANGLE, label: 'Sudut Rendah' },
    { value: CameraAngle.HIGH_ANGLE, label: 'Sudut Tinggi' },
    { value: CameraAngle.DUTCH_ANGLE, label: 'Sudut Belanda' },
    { value: CameraAngle.EYE_LEVEL, label: 'Setara Mata' },
    { value: CameraAngle.BIRDS_EYE_VIEW, label: 'Pandangan Mata Burung' },
    { value: CameraAngle.WORM_S_EYE_VIEW, label: 'Pandangan Mata Cacing' }
];

export const ASPECT_RATIO_OPTIONS: Option<AspectRatio>[] = [
    { value: AspectRatio.SQUARE, label: 'Persegi (1:1)' },
    { value: AspectRatio.PORTRAIT_4_5, label: 'Potret (4:5)' },
    { value: AspectRatio.PORTRAIT_9_16, label: 'Potret (9:16)' },
    { value: AspectRatio.LANDSCAPE_16_9, label: 'Lanskap (16:9)' },
    { value: AspectRatio.LANDSCAPE_4_3, label: 'Lanskap (4:3)' }
];

export const BLUR_AMOUNT_OPTIONS: Option<BlurAmount>[] = [
    { value: BlurAmount.NONE, label: 'Tanpa Blur' },
    { value: BlurAmount.SUBTLE, label: 'Halus' },
    { value: BlurAmount.MEDIUM, label: 'Sedang' },
    { value: BlurAmount.HEAVY, label: 'Kuat' }
];