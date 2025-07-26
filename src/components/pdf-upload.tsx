"use client";

import React from "react";
import { Upload, X, FileText } from "lucide-react";
import { toast } from "sonner";
import { UploadThingError } from "uploadthing/server";
import { uploadFiles } from "@/lib/uploadthing";

interface PDFUploadProps {
  onUploadComplete: (url: string) => void;
  disabled?: boolean;
}

export function PDFUpload({ onUploadComplete, disabled }: PDFUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [dragActive, setDragActive] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const pdfFile = fileArray.find(file => file.type === "application/pdf");
    
    if (!pdfFile) {
      toast.error("Please select a PDF file");
      return;
    }

    if (pdfFile.size > 32 * 1024 * 1024) { // 32MB limit
      toast.error("File size must be less than 32MB");
      return;
    }

    try {
      setIsUploading(true);
      
      const res = await uploadFiles("pdfUploader", {
        files: [pdfFile],
      });

      if (res[0]) {
        toast.success("PDF uploaded successfully");
        onUploadComplete(res[0].url);
      }
    } catch (error) {
      console.error("Upload error:", error);
      
      if (error instanceof UploadThingError) {
        const errorMessage = error.data && "error" in error.data 
          ? error.data.error 
          : "Upload failed";
        toast.error(errorMessage);
        return;
      }

      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (disabled || isUploading) return;
    
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (disabled || isUploading) return;
    
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleClick = () => {
    if (disabled || isUploading) return;
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      type="button"
      disabled={disabled || isUploading}
      className={`relative border-2 border-dashed transition-colors cursor-pointer w-full ${
        dragActive
          ? "border-foreground bg-foreground/5"
          : "border-foreground/30 hover:border-foreground/50"
      } ${disabled || isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleChange}
        disabled={disabled || isUploading}
        className="sr-only"
      />
      
      <div className="flex flex-col items-center justify-center py-8 px-6 text-center">
        {isUploading ? (
          <>
            <div className="animate-pulse mb-4">
              <FileText className="w-8 h-8 text-foreground/60" />
            </div>
            <p className="text-sm text-foreground/60 font-mono">
              Uploading PDF...
            </p>
          </>
        ) : (
          <>
            <div className="mb-4">
              <Upload className="w-8 h-8 text-foreground/60" />
            </div>
            <p className="text-sm font-bold mb-1 tracking-wide uppercase">
              Upload PDF File
            </p>
            <p className="text-xs text-foreground/60 font-mono">
              Drop your PDF here or click to browse
            </p>
            <p className="text-xs text-foreground/40 font-mono mt-2">
              Max 32MB • PDF files only
            </p>
          </>
        )}
      </div>
    </button>
  );
} 