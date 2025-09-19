import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ControlPanel } from './components/ControlPanel';
import { GeneratedImageDisplay } from './components/GeneratedImageDisplay';
import { editImage } from './services/geminiService';
import { Pose, Location, CameraAngle, AspectRatio } from './types';
import { POSE_OPTIONS, LOCATION_OPTIONS, CAMERA_ANGLE_OPTIONS, ASPECT_RATIO_OPTIONS } from './constants';
import { MagicWandIcon } from './components/icons/MagicWandIcon';

interface UploadedImage {
  base64: string;
  mimeType: string;
}

/**
 * Formats an image to a specific aspect ratio by letterboxing/pillarboxing it.
 * @param imageSrc The base64 source of the image.
 * @param mimeType The MIME type of the image.
 * @param targetRatio The target aspect ratio string (e.g., '16:9').
 * @returns A promise that resolves to the new formatted image as an UploadedImage object.
 */
const formatImageToAspectRatio = (
  imageSrc: string,
  mimeType: string,
  targetRatio: AspectRatio
): Promise<UploadedImage> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const [targetWidth, targetHeight] = targetRatio.split(':').map(Number);
      const targetAspectRatio = targetWidth / targetHeight;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return reject(new Error('Could not get canvas context.'));
      }

      // Use a consistent base width for the canvas for predictability
      canvas.width = 1024;
      canvas.height = 1024 / targetAspectRatio;

      // Fill background with black
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate the dimensions to draw the image to fit within the canvas
      const imageAspectRatio = img.width / img.height;
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let x = 0;
      let y = 0;

      if (imageAspectRatio > targetAspectRatio) {
        // Image is wider than target, letterbox
        drawHeight = canvas.width / imageAspectRatio;
        y = (canvas.height - drawHeight) / 2;
      } else {
        // Image is taller than target, pillarbox
        drawWidth = canvas.height * imageAspectRatio;
        x = (canvas.width - drawWidth) / 2;
      }

      ctx.drawImage(img, x, y, drawWidth, drawHeight);

      const base64 = canvas.toDataURL(mimeType).split(',')[1];
      resolve({ base64, mimeType });
    };
    img.onerror = reject;
    img.src = imageSrc;
  });
};


const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<UploadedImage | null>(null);
  const [formattedImageForApi, setFormattedImageForApi] = useState<UploadedImage | null>(null);

  const [selectedPose, setSelectedPose] = useState<Pose | 'CUSTOM'>(POSE_OPTIONS[0].value);
  const [customPose, setCustomPose] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | 'CUSTOM'>(LOCATION_OPTIONS[0].value);
  const [customLocation, setCustomLocation] = useState('');
  const [selectedCameraAngle, setSelectedCameraAngle] = useState<CameraAngle | 'CUSTOM'>(CAMERA_ANGLE_OPTIONS[0].value);
  const [customCameraAngle, setCustomCameraAngle] = useState('');
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<AspectRatio>(ASPECT_RATIO_OPTIONS[0].value);
  
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const poseText = selectedPose === 'CUSTOM' ? customPose : selectedPose;
    const locationText = selectedLocation === 'CUSTOM' ? customLocation : selectedLocation;
    const cameraAngleText = selectedCameraAngle === 'CUSTOM' ? customCameraAngle : selectedCameraAngle;
    const aspectRatioText = selectedAspectRatio;

    const newPrompt = `Take the subject and scene from the provided image and generate a new, photorealistic image based on the following instructions. The provided image has been placed into a ${aspectRatioText} frame and may contain black bars.

**Key Instructions:**
1.  **Scene Expansion**: Your primary task is to replace any black bars by intelligently and seamlessly extending the original scene. The final image MUST completely fill the target aspect ratio of ${aspectRatioText}. Do NOT add any new borders, padding, or black bars. The composition must look natural as if it were originally shot in this format.
2.  **New Setting**: Recreate the subject and place them in this new environment: ${locationText}.
3.  **New Pose**: The subject's pose should be: ${poseText}.
4.  **Camera Work**: The camera shot should be a ${cameraAngleText}.
5.  **Style**: The final result must be a high-resolution, incredibly detailed, and cinematic photograph that seamlessly integrates the original subject into the new, expanded scene. Ignore the black bars in the source image and replace them with photographic content.`;
    setPrompt(newPrompt);
  }, [selectedPose, selectedLocation, selectedCameraAngle, customPose, customLocation, customCameraAngle, selectedAspectRatio]);

  // Effect to format the image whenever the original or aspect ratio changes
  useEffect(() => {
    if (originalImage) {
      const fullBase64 = `data:${originalImage.mimeType};base64,${originalImage.base64}`;
      formatImageToAspectRatio(fullBase64, originalImage.mimeType, selectedAspectRatio)
        .then(setFormattedImageForApi)
        .catch(err => {
            console.error("Image formatting failed:", err);
            setError("Gagal memformat gambar untuk rasio aspek yang dipilih.");
        });
    }
  }, [originalImage, selectedAspectRatio]);


  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage({
        base64: (reader.result as string).split(',')[1],
        mimeType: file.type,
      });
      setGeneratedImage(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };
  
  const handleGenerateClick = useCallback(async () => {
    if (!originalImage || !formattedImageForApi) {
      setError('Harap unggah gambar dan tunggu pemformatan selesai.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await editImage(formattedImageForApi.base64, formattedImageForApi.mimeType, prompt);
      setGeneratedImage(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat membuat gambar.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, formattedImageForApi, prompt]);

  const isCustomInvalid = 
    (selectedPose === 'CUSTOM' && !customPose.trim()) ||
    (selectedLocation === 'CUSTOM' && !customLocation.trim()) ||
    (selectedCameraAngle === 'CUSTOM' && !customCameraAngle.trim());

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Controls */}
          <div className="flex flex-col space-y-6 bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-2xl">
            <ImageUploader onImageUpload={handleImageUpload} uploadedImage={originalImage ? `data:${originalImage.mimeType};base64,${originalImage.base64}` : null} />
            
            <ControlPanel
              selectedPose={selectedPose}
              onPoseChange={setSelectedPose}
              customPose={customPose}
              onCustomPoseChange={setCustomPose}
              selectedLocation={selectedLocation}
              onLocationChange={setSelectedLocation}
              customLocation={customLocation}
              onCustomLocationChange={setCustomLocation}
              selectedCameraAngle={selectedCameraAngle}
              onCameraAngleChange={setSelectedCameraAngle}
              customCameraAngle={customCameraAngle}
              onCustomCameraAngleChange={setCustomCameraAngle}
              selectedAspectRatio={selectedAspectRatio}
              onAspectRatioChange={setSelectedAspectRatio}
            />

            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-purple-300 mb-2">
                Prompt yang Dihasilkan
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={10}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 text-sm"
                placeholder="Prompt akan muncul di sini..."
              />
            </div>
            
            <button
              onClick={handleGenerateClick}
              disabled={isLoading || !originalImage || isCustomInvalid}
              className="w-full flex items-center justify-center bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {isLoading ? (
                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
              ) : <MagicWandIcon className="h-5 w-5 mr-2" />}
              {isLoading ? 'Membuat...' : 'Buat Gambar'}
            </button>
            {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
          </div>

          {/* Right Column: Generated Image */}
          <GeneratedImageDisplay
            isLoading={isLoading}
            generatedImage={generatedImage}
            aspectRatio={selectedAspectRatio}
          />

        </div>
      </main>
    </div>
  );
};

export default App;