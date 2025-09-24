// Fix: Import all types from the corrected `types.ts` file and remove the redundant `Option` interface.
import { Pose, Location, CameraAngle, AspectRatio, Option, BlurAmount, ResizeMode, ClothingStyle, PictureQuality, ArtisticStyle, HairStyle } from './types';

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

export const CLOTHING_STYLE_OPTIONS: Option<ClothingStyle>[] = [
    { value: ClothingStyle.KEBAYA, label: 'Kebaya' },
    { value: ClothingStyle.T_SHIRT_JEANS, label: 'Kaos & Jeans' },
    { value: ClothingStyle.FORMAL_SUIT, label: 'Setelan Formal' },
    { value: ClothingStyle.SUMMER_DRESS, label: 'Gaun Musim Panas' },
    { value: ClothingStyle.WINTER_COAT, label: 'Mantel Musim Dingin' }
];

export const HAIR_STYLE_OPTIONS: Option<HairStyle>[] = [
    { value: HairStyle.KEEP_ORIGINAL, label: 'Pertahankan Rambut/Jilbab Asli' },
    { value: HairStyle.AI_CHOICE, label: 'Biarkan AI yang Memutuskan' },
];

export const ARTISTIC_STYLE_OPTIONS: Option<ArtisticStyle>[] = [
    { value: ArtisticStyle.REALISTIC, label: 'Realistis' },
    { value: ArtisticStyle.CARTOON, label: 'Kartun' },
    { value: ArtisticStyle.OIL_PAINTING, label: 'Lukisan Cat Minyak' },
    { value: ArtisticStyle.WATERCOLOR, label: 'Lukisan Cat Air' },
    { value: ArtisticStyle.ANIME_MANGA, label: 'Anime/Manga' },
    { value: ArtisticStyle.PIXEL_ART, label: 'Pixel Art' },
    { value: ArtisticStyle.LINE_ART, label: 'Line Art' }
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

export const PICTURE_QUALITY_OPTIONS: Option<PictureQuality>[] = [
    { value: PictureQuality.STANDARD, label: 'Standar' },
    { value: PictureQuality.HIGH, label: 'Kualitas Tinggi' },
    { value: PictureQuality.ULTRA_HIGH, label: 'Kualitas Ultra Tinggi' },
    { value: PictureQuality.ULTRA_HIGH_DETAIL, label: 'Kualitas Detail Ultra Tinggi' },
    { value: PictureQuality.FULL_HD, label: 'Full HD' },
    { value: PictureQuality.FOUR_K, label: '4K' },
    { value: PictureQuality.EIGHT_K, label: '8K' }
];

export const RESIZE_MODE_OPTIONS: Option<ResizeMode>[] = [
    { value: ResizeMode.LETTERBOX, label: 'Letterbox (Isi dengan Warna)' },
    { value: ResizeMode.CROP, label: 'Pangkas untuk Mengisi' },
];

export const LETTERBOX_COLOR_OPTIONS: Option<string>[] = [
    { value: 'black', label: 'Hitam' },
    { value: 'white', label: 'Putih' },
    { value: '#808080', label: 'Abu-abu' },
];