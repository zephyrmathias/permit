// PdfAnnotation.js
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { PdfHighlighter } from "react-pdf-highlighter";
import '@react-pdf-viewer/highlight/lib/styles/index.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfAnnotation = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = (data) => {
    console.log(data.canvasFactory)
    setNumPages(data.numPages);
  };


  return (
    <div className="relative">
      <Document
        file="/files/interview_permit_pdf.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} width={600} />
      </Document>
    </div>
  );
};

export default PdfAnnotation;
