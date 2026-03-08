import { useState, useRef } from "react";
import { Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhotoUploadProps {
  currentPhoto?: string;
  name?: string;
  onPhotoChange: (dataUrl: string) => void;
  onPhotoRemove?: () => void;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-14 h-14 text-xl",
  md: "w-20 h-20 text-2xl",
  lg: "w-28 h-28 text-3xl",
};

const PhotoUpload = ({ currentPhoto, name = "", onPhotoChange, onPhotoRemove, size = "md" }: PhotoUploadProps) => {
  const [preview, setPreview] = useState(currentPhoto || "");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("File must be under 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      onPhotoChange(result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview("");
    onPhotoRemove?.();
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex items-center gap-4">
      <div className={`${sizeClasses[size]} rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold shrink-0 overflow-hidden relative`}>
        {preview ? (
          <img src={preview} alt={name} className="w-full h-full object-cover" />
        ) : (
          name[0]?.toUpperCase() || "?"
        )}
      </div>
      <div className="flex flex-col gap-2">
        <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()} className="border-primary/30">
          <Camera className="w-4 h-4 mr-1" /> {preview ? "Change Photo" : "Upload Photo"}
        </Button>
        {preview && onPhotoRemove && (
          <Button type="button" variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={handleRemove}>
            <X className="w-4 h-4 mr-1" /> Remove
          </Button>
        )}
      </div>
    </div>
  );
};

export default PhotoUpload;
