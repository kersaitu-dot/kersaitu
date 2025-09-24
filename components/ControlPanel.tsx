import React from 'react';
import { Pose, Location, CameraAngle, AspectRatio, BlurAmount, ResizeMode, ClothingStyle, PictureQuality, ArtisticStyle, HairStyle } from '../types';
import { POSE_OPTIONS, LOCATION_OPTIONS, CAMERA_ANGLE_OPTIONS, ASPECT_RATIO_OPTIONS, BLUR_AMOUNT_OPTIONS, RESIZE_MODE_OPTIONS, LETTERBOX_COLOR_OPTIONS, CLOTHING_STYLE_OPTIONS, PICTURE_QUALITY_OPTIONS, ARTISTIC_STYLE_OPTIONS, HAIR_STYLE_OPTIONS } from '../constants';

interface ControlPanelProps {
  selectedPose: Pose | 'CUSTOM';
  onPoseChange: (pose: Pose | 'CUSTOM') => void;
  customPose: string;
  onCustomPoseChange: (value: string) => void;
  selectedLocation: Location | 'CUSTOM';
  onLocationChange: (location: Location | 'CUSTOM') => void;
  customLocation: string;
  onCustomLocationChange: (value: string) => void;
  selectedCameraAngle: CameraAngle | 'CUSTOM';
  onCameraAngleChange: (angle: CameraAngle | 'CUSTOM') => void;
  customCameraAngle: string;
  onCustomCameraAngleChange: (value: string) => void;
  selectedClothingStyle: ClothingStyle | 'CUSTOM';
  onClothingStyleChange: (style: ClothingStyle | 'CUSTOM') => void;
  customClothingStyle: string;
  onCustomClothingStyleChange: (value: string) => void;
  selectedArtisticStyle: ArtisticStyle | 'CUSTOM';
  onArtisticStyleChange: (style: ArtisticStyle | 'CUSTOM') => void;
  customArtisticStyle: string;
  onCustomArtisticStyleChange: (value: string) => void;
  selectedHairStyle: HairStyle | 'CUSTOM';
  onHairStyleChange: (style: HairStyle | 'CUSTOM') => void;
  customHairStyle: string;
  onCustomHairStyleChange: (value: string) => void;
  selectedAspectRatio: AspectRatio;
  onAspectRatioChange: (aspectRatio: AspectRatio) => void;
  selectedBlur: BlurAmount;
  onBlurChange: (blur: BlurAmount) => void;
  selectedQuality: PictureQuality;
  onQualityChange: (quality: PictureQuality) => void;
  resizeMode: ResizeMode;
  onResizeModeChange: (mode: ResizeMode) => void;
  letterboxColor: string;
  onLetterboxColorChange: (color: string) => void;
}

const CustomizableSelect = <T extends string>({ 
    label, 
    value, 
    onChange, 
    options,
    customValue,
    onCustomValueChange
}: {
    label: string;
    value: T | 'CUSTOM';
    onChange: (value: T | 'CUSTOM') => void;
    options: { value: T; label: string }[];
    customValue: string;
    onCustomValueChange: (value: string) => void;
}) => (
    <div>
        <label className="block text-sm font-medium text-purple-300 mb-2">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value as T | 'CUSTOM')}
            className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
            <option value="CUSTOM">Kustom...</option>
        </select>
        {value === 'CUSTOM' && (
            <input
                type="text"
                value={customValue}
                onChange={(e) => onCustomValueChange(e.target.value)}
                placeholder="Masukkan nilai kustom Anda..."
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 mt-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 text-sm"
            />
        )}
    </div>
);


export const ControlPanel: React.FC<ControlPanelProps> = ({
  selectedPose,
  onPoseChange,
  customPose,
  onCustomPoseChange,
  selectedLocation,
  onLocationChange,
  customLocation,
  onCustomLocationChange,
  selectedCameraAngle,
  onCameraAngleChange,
  customCameraAngle,
  onCustomCameraAngleChange,
  selectedClothingStyle,
  onClothingStyleChange,
  customClothingStyle,
  onCustomClothingStyleChange,
  selectedArtisticStyle,
  onArtisticStyleChange,
  customArtisticStyle,
  onCustomArtisticStyleChange,
  selectedHairStyle,
  onHairStyleChange,
  customHairStyle,
  onCustomHairStyleChange,
  selectedAspectRatio,
  onAspectRatioChange,
  selectedBlur,
  onBlurChange,
  selectedQuality,
  onQualityChange,
  resizeMode,
  onResizeModeChange,
  letterboxColor,
  onLetterboxColorChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-purple-300">2. Sesuaikan Gambar Anda</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomizableSelect 
          label="Pilih Pose" 
          value={selectedPose} 
          onChange={onPoseChange} 
          options={POSE_OPTIONS}
          customValue={customPose}
          onCustomValueChange={onCustomPoseChange}
        />
        <CustomizableSelect 
          label="Pilih Gaya Busana" 
          value={selectedClothingStyle} 
          onChange={onClothingStyleChange} 
          options={CLOTHING_STYLE_OPTIONS}
          customValue={customClothingStyle}
          onCustomValueChange={onCustomClothingStyleChange}
        />
        <CustomizableSelect
          label="Gaya Rambut/Jilbab"
          value={selectedHairStyle}
          onChange={onHairStyleChange}
          options={HAIR_STYLE_OPTIONS}
          customValue={customHairStyle}
          onCustomValueChange={onCustomHairStyleChange}
        />
        <CustomizableSelect 
          label="Pilih Lokasi" 
          value={selectedLocation} 
          onChange={onLocationChange} 
          options={LOCATION_OPTIONS} 
          customValue={customLocation}
          onCustomValueChange={onCustomLocationChange}
        />
        <CustomizableSelect 
          label="Pilih Sudut Kamera" 
          value={selectedCameraAngle} 
          onChange={onCameraAngleChange} 
          options={CAMERA_ANGLE_OPTIONS} 
          customValue={customCameraAngle}
          onCustomValueChange={onCustomCameraAngleChange}
        />
        <div>
            <label className="block text-sm font-medium text-purple-300 mb-2">Pilih Rasio Aspek</label>
            <select
                value={selectedAspectRatio}
                onChange={(e) => onAspectRatioChange(e.target.value as AspectRatio)}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
            >
                {ASPECT_RATIO_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
        <div>
            <label className="block text-sm font-medium text-purple-300 mb-2">Mode Penyesuaian Rasio</label>
            <select
                value={resizeMode}
                onChange={(e) => onResizeModeChange(e.target.value as ResizeMode)}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
            >
                {RESIZE_MODE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
        {resizeMode === ResizeMode.LETTERBOX && (
            <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">Warna Latar Letterbox</label>
                <select
                    value={letterboxColor}
                    onChange={(e) => onLetterboxColorChange(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                >
                    {LETTERBOX_COLOR_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
        )}
        <div className="md:col-span-2">
            <label className="block text-sm font-medium text-purple-300 mb-2">Pilih Kualitas Gambar</label>
            <select
                value={selectedQuality}
                onChange={(e) => onQualityChange(e.target.value as PictureQuality)}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
            >
                {PICTURE_QUALITY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
        <div className="md:col-span-2">
            <CustomizableSelect
              label="Pilih Gaya Artistik"
              value={selectedArtisticStyle}
              onChange={onArtisticStyleChange}
              options={ARTISTIC_STYLE_OPTIONS}
              customValue={customArtisticStyle}
              onCustomValueChange={onCustomArtisticStyleChange}
            />
        </div>
        <div className="md:col-span-2">
            <label className="block text-sm font-medium text-purple-300 mb-2">Pilih Blur Latar Belakang</label>
            <select
                value={selectedBlur}
                onChange={(e) => onBlurChange(e.target.value as BlurAmount)}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
            >
                {BLUR_AMOUNT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
      </div>
    </div>
  );
};