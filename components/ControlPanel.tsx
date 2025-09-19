import React from 'react';
import { Pose, Location, CameraAngle, AspectRatio } from '../types';
import { POSE_OPTIONS, LOCATION_OPTIONS, CAMERA_ANGLE_OPTIONS, ASPECT_RATIO_OPTIONS } from '../constants';

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
  selectedAspectRatio: AspectRatio;
  onAspectRatioChange: (aspectRatio: AspectRatio) => void;
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
  selectedAspectRatio,
  onAspectRatioChange
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
      </div>
    </div>
  );
};
