import { useState } from 'react';

export function PDFViewer({ pdfUrl }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : 'h-[70vh]'}`}>
      <iframe
        src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
        className="w-full h-full border-2 border-gray-300 rounded-lg"
      />
      <button
        onClick={toggleFullscreen}
        className="absolute bottom-4 right-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
      </button>
    </div>
  );
}
