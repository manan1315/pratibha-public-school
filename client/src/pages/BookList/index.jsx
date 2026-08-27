import React from 'react';
import { FiDownload, FiFileText } from 'react-icons/fi';

const BookList = () => {
  const pdfUrl = '/assets/book-list-2023-24.pdf';

  return (
    <div>
      <div className="bg-gradient-to-r from-[#1a237e] to-[#0d1452] py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold font-['Playfair_Display'] mb-4">Book List</h1>
          <p className="text-gray-300">Home / Book List</p>
        </div>
      </div>

      <section className="py-10 md:py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-[#1a237e]/10 flex items-center justify-center mx-auto mb-4">
              <FiFileText className="text-[#1a237e] text-4xl" />
            </div>
            <h2 className="section-title">Book List — Session 2023-24</h2>
            <p className="section-subtitle">Download or view the complete book list for all classes</p>
            <a
              href={pdfUrl}
              download="PPS Basna Book List 2023-24.pdf"
              className="inline-flex items-center gap-2 bg-[#1a237e] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#0d1452] hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <FiDownload size={18} /> Download Book List
            </a>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-4 bg-[#1a237e] text-white flex items-center justify-between">
              <span className="font-semibold">Book List 2023-24.pdf</span>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors"
              >
                Open in New Tab
              </a>
            </div>
            <div className="w-full" style={{ height: '70vh', minHeight: '500px' }}>
              <iframe
                src={`${pdfUrl}#toolbar=1&navpanes=0`}
                title="Book List 2023-24"
                className="w-full h-full border-0"
                type="application/pdf"
              >
                <p className="p-8 text-center text-gray-600">
                  Your browser does not support embedded PDFs.{' '}
                  <a href={pdfUrl} className="text-[#1a237e] underline" target="_blank" rel="noreferrer">
                    Click here to open the PDF
                  </a>
                </p>
              </iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookList;
