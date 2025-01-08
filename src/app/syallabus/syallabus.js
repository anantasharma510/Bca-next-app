'use client';

import { useState } from 'react';

import { PDFViewer } from './pdfviewer'; // Import your PDFViewer component
import { syllabusData } from './syallabusdata';

export default function Syllabus() {
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleSemesterClick = (semester) => {
    setSelectedSemester(semester);
    setSelectedSubject(null); // Reset subject when a new semester is selected
  };

  const semesterData = syllabusData.find((s) => s.semester === selectedSemester);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Course Syllabus</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {syllabusData.map(({ semester }) => (
          <button
            key={semester}
            onClick={() => handleSemesterClick(semester)}
            className={`py-2 px-4 rounded ${
              selectedSemester === semester
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Semester {semester}
          </button>
        ))}
      </div>

      {selectedSemester && semesterData && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Semester {selectedSemester} Syllabus
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {semesterData.subjects.map((subject, index) => (
              <button
                key={index}
                onClick={() => setSelectedSubject(subject)}
                className="p-4 border rounded-lg bg-gray-50 text-left"
              >
                <h3 className="text-lg font-bold mb-2">{subject.name}</h3>
              </button>
            ))}
          </div>

          {selectedSubject && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">
                {selectedSubject.name} Syllabus
              </h3>
              <PDFViewer pdfUrl={selectedSubject.pdfUrl} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
