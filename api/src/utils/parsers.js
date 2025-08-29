function textToHtml(text) {
  return text ? text
    .replace(/\r\n|\n\r|\n|\r/g, "<br>")
    .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;")
    .replace(/\•/g, "&nbsp;&nbsp;&nbsp;&nbsp; •").trim() : '';
}

function cleanField(text) {
  return text ? text.toString().trim() : '';
}

function parseMitigationData(data) {
  if (data.length < 2) return [];
  
  const headers = data[0];
  const rows = data.slice(1);
  
  return rows.map((row, index) => ({
    id: `mitigation_${index}`,
    srNo: cleanField(row[0]),
    isicCodes: cleanField(row[1]),
    document: cleanField(row[2]),
    taxonomyReference: cleanField(row[3]),
    sector: cleanField(row[4]),
    activity: cleanField(row[5]),
    activityDescription: textToHtml(row[6]),
    substantialContribution: textToHtml(row[7]),
    ineligibilityCriteria: textToHtml(row[8]),
    generalDNSH: textToHtml(row[9]),
    dnshClimateAdaptation: textToHtml(row[10]),
    dnshWaterResources: textToHtml(row[11]),
    dnshCircularEconomy: textToHtml(row[12]),
    dnshPollutionPrevention: textToHtml(row[13]),
    dnshBiodiversity: textToHtml(row[14]),
    remarks: textToHtml(row[15]),
    type: 'Mitigation',
    category: 'mitigation'
  })).filter(item => item.srNo || item.sector || item.activity);
}

function parseAdaptationData(data) {
  if (data.length < 2) return [];
  
  const headers = data[0];
  const rows = data.slice(1);
  
  return rows.map((row, index) => ({
    id: `adaptation_${index}`,
    srNo: cleanField(row[0]),
    document: cleanField(row[1]),
    code: cleanField(row[2]),
    sector: cleanField(row[3]),
    hazard: cleanField(row[4]),
    division: cleanField(row[5]),
    investment: cleanField(row[6]),
    expectedEffect: textToHtml(row[7]),
    expectedResult: cleanField(row[8]),
    type: cleanField(row[9]),
    level: cleanField(row[10]),
    criteriaType: cleanField(row[11]),
    genericDNSH: textToHtml(row[12]),
    category: 'adaptation'
  })).filter(item => item.srNo || item.sector || item.investment);
}

function parseVariousData(data) {
  if (data.length < 2) return [];
  
  const headers = data[0];
  const rows = data.slice(1);
  
  return rows.map((row, index) => ({
    id: `various_${index}`,
    srNo: cleanField(row[0]),
    document: cleanField(row[1]),
    taxonomyReference: cleanField(row[2]),
    sector: cleanField(row[3]),
    subSector: cleanField(row[4]),
    eligiblePractices: cleanField(row[5]),
    category: cleanField(row[6]),
    description: textToHtml(row[7]),
    eligibleInput: textToHtml(row[8]),
    ineligiblePractices: textToHtml(row[9]),
    genericDNSH: textToHtml(row[10]),
    type: 'Various',
    mainCategory: 'various'
  })).filter(item => item.srNo || item.sector || item.eligiblePractices);
}

module.exports = {
  parseMitigationData,
  parseAdaptationData,
  parseVariousData
};