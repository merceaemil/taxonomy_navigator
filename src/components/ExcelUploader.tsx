/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";

interface ExcelUploaderProps {
  onDataLoaded: (data: any) => void;
}

export function ExcelUploader({ onDataLoaded }: ExcelUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // const parseExcelFile = useAction(api.excelData.parseExcelFile);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      setError('Please upload an Excel file (.xlsx or .xls)');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // Read file as ArrayBuffer
      const formData = new FormData();
      formData.append('file', file);

      // Call your new Node.js API endpoint
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();

      onDataLoaded(result);
    } catch (err) {
      console.error('Error parsing Excel file:', err);
      setError('Failed to parse Excel file. Please check the file format and try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
      <div className="space-y-4">
        <div className="mx-auto h-12 w-12 text-gray-400">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Upload Excel File
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Upload your Excel file with Climate Mitigation, Climate Adaptation, and Various Objectives sheets
          </p>
          
          <label className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500 cursor-pointer">
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Choose Excel File
              </>
            )}
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="sr-only"
            />
          </label>
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-3">
            {error}
          </div>
        )}

        <div className="text-xs text-gray-500">
          <p>Expected sheets: "Climate Mitigation", "Climate Adaptation", "Various Objectives"</p>
        </div>
      </div>
    </div>
  );
}
