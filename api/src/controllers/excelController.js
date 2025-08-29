const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const { 
  parseMitigationData, 
  parseAdaptationData, 
  parseVariousData 
} = require('../utils/parsers');

// const parseExcelFile = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const filePath = req.file.path;
//     const fileName = req.file.originalname;

//     // Read the file into a buffer
//     const fileBuffer = fs.readFileSync(filePath);
//     const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

//     const result = {};

//     // Parse Climate Mitigation sheet
//     if (workbook.SheetNames.includes('Climate Mitigation') || workbook.SheetNames.includes('I. Climate Mitigation')) {
//       const sheetName = workbook.SheetNames.find(name => 
//         name.includes('Climate Mitigation') || name.includes('Mitigation')
//       );
//       if (sheetName) {
//         const worksheet = workbook.Sheets[sheetName];
//         const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//         result.mitigation = parseMitigationData(data);
//       }
//     }

//     // Parse Climate Adaptation sheet
//     if (workbook.SheetNames.includes('Climate Adaptation') || workbook.SheetNames.includes('II. Climate Adaptation')) {
//       const sheetName = workbook.SheetNames.find(name => 
//         name.includes('Climate Adaptation') || name.includes('Adaptation')
//       );
//       if (sheetName) {
//         const worksheet = workbook.Sheets[sheetName];
//         const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//         result.adaptation = parseAdaptationData(data);
//       }
//     }

//     // Parse Various Objectives sheet
//     if (workbook.SheetNames.includes('Various Objectives') || workbook.SheetNames.includes('III. Various Objectives')) {
//       const sheetName = workbook.SheetNames.find(name => 
//         name.includes('Various Objectives') || name.includes('Various')
//       );
//       if (sheetName) {
//         const worksheet = workbook.Sheets[sheetName];
//         const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//         result.various = parseVariousData(data);
//       }
//     }

//     // Save the parsed result to a file
//     const parsedDir = path.join(__dirname, '../../data/parsed');
//     const resultFileName = `${Date.now()}-${fileName.replace('.xlsx', '.json')}`;
//     const resultPath = path.join(parsedDir, resultFileName);
    
//     fs.writeFileSync(resultPath, JSON.stringify(result, null, 2));

//     try {
//       fs.unlinkSync(filePath);
//       console.log(`Successfully deleted uploaded file: ${filePath}`);
//     } catch (err) {
//       console.error(`Error deleting uploaded file ${filePath}:`, err);
//       // Don't fail the request if deletion fails
//     }

//     // Respond with the parsed data
//     res.json(result);

//   } catch (error) {
//     console.error('Error parsing Excel file:', error);
//     res.status(500).json({ error: `Failed to parse Excel file: ${error.message}` });
//   }
// };

// const getLastParsedFile = async (req, res) => {
//   try {
//     const parsedDir = path.join(__dirname, '../../data/parsed');
    
//     // Check if directory exists
//     if (!fs.existsSync(parsedDir)) {
//       return res.status(404).json({ error: 'No parsed files found' });
//     }

//     // Get all files in the directory
//     const files = fs.readdirSync(parsedDir)
//       .filter(file => file.endsWith('.json'))
//       .map(file => ({
//         name: file,
//         time: fs.statSync(path.join(parsedDir, file)).mtime.getTime()
//       }))
//       .sort((a, b) => b.time - a.time);

//     if (files.length === 0) {
//       return res.status(404).json({ error: 'No parsed files found' });
//     }

//     // Get the most recent file
//     const mostRecentFile = files[0].name;
//     const filePath = path.join(parsedDir, mostRecentFile);
//     const fileContent = fs.readFileSync(filePath, 'utf8');

//     res.json({
//       fileName: mostRecentFile,
//       data: JSON.parse(fileContent)
//     });
//   } catch (error) {
//     console.error('Error getting last parsed file:', error);
//     res.status(500).json({ error: `Failed to get last parsed file: ${error.message}` });
//   }
// };

const processAndGetLatestData = async (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '../../data/uploads');
    const parsedDir = path.join(__dirname, '../../data/parsed');

    // Check for new Excel files in uploads directory
    if (fs.existsSync(uploadsDir)) {
      const excelFiles = fs.readdirSync(uploadsDir)
        .filter(file => file.endsWith('.xlsx') || file.endsWith('.xls'));

      if (excelFiles.length > 0) {
        // Process the first Excel file found (you might want to sort and pick newest)
        const excelFile = excelFiles[0];
        const excelFilePath = path.join(uploadsDir, excelFile);

        // Read and parse the Excel file
        const fileBuffer = fs.readFileSync(excelFilePath);
        const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

        const result = {};

        // Parse Climate Mitigation sheet
        if (workbook.SheetNames.includes('Climate Mitigation') || workbook.SheetNames.includes('I. Climate Mitigation')) {
          const sheetName = workbook.SheetNames.find(name => 
            name.includes('Climate Mitigation') || name.includes('Mitigation')
          );
          if (sheetName) {
            const worksheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            result.mitigation = parseMitigationData(data);
          }
        }

        // Parse Climate Adaptation sheet
        if (workbook.SheetNames.includes('Climate Adaptation') || workbook.SheetNames.includes('II. Climate Adaptation')) {
          const sheetName = workbook.SheetNames.find(name => 
            name.includes('Climate Adaptation') || name.includes('Adaptation')
          );
          if (sheetName) {
            const worksheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            result.adaptation = parseAdaptationData(data);
          }
        }

        // Parse Various Objectives sheet
        if (workbook.SheetNames.includes('Various Objectives') || workbook.SheetNames.includes('III. Various Objectives')) {
          const sheetName = workbook.SheetNames.find(name => 
            name.includes('Various Objectives') || name.includes('Various')
          );
          if (sheetName) {
            const worksheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            result.various = parseVariousData(data);
          }
        }

        // Save the parsed result to a file
        if (!fs.existsSync(parsedDir)) {
          fs.mkdirSync(parsedDir, { recursive: true });
        }
        
        const resultFileName = `${Date.now()}-${excelFile.replace('.xlsx', '.json').replace('.xls', '.json')}`;
        const resultPath = path.join(parsedDir, resultFileName);
        fs.writeFileSync(resultPath, JSON.stringify(result, null, 2));

        // Delete the processed Excel file
        try {
          fs.unlinkSync(excelFilePath);
          console.log(`Successfully deleted processed Excel file: ${excelFilePath}`);
        } catch (err) {
          console.error(`Error deleting Excel file ${excelFilePath}:`, err);
        }
      }
    }

    // Now return the last parsed file (either newly created or existing)
    if (!fs.existsSync(parsedDir)) {
      return res.status(404).json({ error: 'No parsed files found' });
    }

    const jsonFiles = fs.readdirSync(parsedDir)
      .filter(file => file.endsWith('.json'))
      .map(file => ({
        name: file,
        time: fs.statSync(path.join(parsedDir, file)).mtime.getTime()
      }))
      .sort((a, b) => b.time - a.time);

    if (jsonFiles.length === 0) {
      return res.status(404).json({ error: 'No parsed files found' });
    }

    const mostRecentFile = jsonFiles[0].name;
    const filePath = path.join(parsedDir, mostRecentFile);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    res.json({
      fileName: mostRecentFile,
      data: JSON.parse(fileContent)
    });

  } catch (error) {
    console.error('Error processing and getting latest data:', error);
    res.status(500).json({ error: `Failed to process and get latest data: ${error.message}` });
  }
};

module.exports = {
  // parseExcelFile,
  // getLastParsedFile,
  processAndGetLatestData
};