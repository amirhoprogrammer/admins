"use client";

import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* پس‌زمینه تیره */}
      <div
        className="absolute inset-0 bg-gray backdrop-blur-sm"
        onClick={onClose}
      />

      {/* خود مودال */}
      <div className="relative bg-product rounded-2xl shadow-2xl w-full max-w-4xl max-h-[100vh] mx-4 p-6 animate-in fade-in zoom-in duration-200">
        {/* دکمه بستن */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none"
        >
          ×
        </button>

        {title && <h2 className="text-xl font-bold mb-4 pr-8">{title}</h2>}

        <div>{children}</div>
      </div>
    </div>
  );
}
