import React from "react";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  galleryInfo: {
    name: string;
    address: string;
    closedDay: string;
    distance: string;
  };
}
export default function Gallery_Modal({
  isOpen,
  closeModal,
  galleryInfo,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-96 p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">{galleryInfo.name}</h2>
        <p className="text-sm">{galleryInfo.address}</p>
        <p className="text-sm">휴관일: {galleryInfo.closedDay}</p>
        <p className="text-right text-sm">{galleryInfo.distance}m</p>
        <button
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={closeModal}
        >
          닫기
        </button>
      </div>
    </div>
  );
}
