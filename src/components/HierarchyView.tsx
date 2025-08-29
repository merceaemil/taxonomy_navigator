import { useState, useMemo } from "react";

type Category = "mitigation" | "adaptation" | "various";

interface HierarchyViewProps {
  category: Category;
  filters: {
    type?: string;
    level?: string;
    criteriaType?: string;
    isicCodes?: string;
    category?: string;
  };
  onInvestmentSelect: (investment: any) => void;
  data: any[];
}



export function HierarchyView({ category, filters, onInvestmentSelect, data }: HierarchyViewProps) {
  const [expandedSectors, setExpandedSectors] = useState<Set<string>>(new Set());
  const [expandedHazards, setExpandedHazards] = useState<Set<string>>(new Set());
  const [expandedDivisions, setExpandedDivisions] = useState<Set<string>>(new Set());

  const renderHtmlContent = (html: string) => {
    return { __html: html };
  };

  // Group data hierarchically based on category
  const hierarchicalData = useMemo(() => {
    if (!data || data.length === 0) return {};

    const grouped: any = {};

    data.forEach(item => {
      // Apply filters
      if (filters.type && item.type !== filters.type) return;
      if (filters.level && item.level !== filters.level) return;
      if (filters.criteriaType && item.criteriaType !== filters.criteriaType) return;
      if (filters.isicCodes && !item.isicCodes?.includes(filters.isicCodes)) return;
      if (filters.category && item.category !== filters.category) return;  

      if (category === 'adaptation') {
        // Group by Sector > Hazard > Division > Investment
        const sector = item.sector || 'Unknown Sector';
        const hazard = item.hazard || 'Unknown Hazard';
        const division = item.division || 'Unknown Division';

        if (!grouped[sector]) grouped[sector] = {};
        if (!grouped[sector][hazard]) grouped[sector][hazard] = {};
        if (!grouped[sector][hazard][division]) grouped[sector][hazard][division] = [];
        
        grouped[sector][hazard][division].push(item);
      } else if (category === 'mitigation') {
        // Group by Sector > Activity
        const sector = item.sector || 'Unknown Sector';
        
        if (!grouped[sector]) grouped[sector] = [];
        grouped[sector].push(item);
      } else if (category === 'various') {
        // Group by Sector > Sub-sector > Eligible Practices
        const sector = item.sector || 'Unknown Sector';
        const subSector = item.subSector || 'Unknown Sub-sector';
        
        if (!grouped[sector]) grouped[sector] = {};
        if (!grouped[sector][subSector]) grouped[sector][subSector] = [];
        
        grouped[sector][subSector].push(item);
      }
    });

    return grouped;
  }, [data, category, filters]);

  const toggleSector = (sector: string) => {
    const newExpanded = new Set(expandedSectors);
    if (newExpanded.has(sector)) {
      newExpanded.delete(sector);
    } else {
      newExpanded.add(sector);
    }
    setExpandedSectors(newExpanded);
  };

  const toggleHazard = (hazard: string) => {
    const newExpanded = new Set(expandedHazards);
    if (newExpanded.has(hazard)) {
      newExpanded.delete(hazard);
    } else {
      newExpanded.add(hazard);
    }
    setExpandedHazards(newExpanded);
  };

  const toggleDivision = (division: string) => {
    const newExpanded = new Set(expandedDivisions);
    if (newExpanded.has(division)) {
      newExpanded.delete(division);
    } else {
      newExpanded.add(division);
    }
    setExpandedDivisions(newExpanded);
  };

  if (Object.keys(hierarchicalData).length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No data available for the current filters.
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="relative border border-gray-200 overflow-clip">
        <div className="section-name-wrapper">
          <div className="section-name uppercase bg-gray-50"> SECTORS </div>
        </div>
        <div  className="ml-8 divide-y divide-gray-200">
          {Object.entries(hierarchicalData).map(([sector, sectorData]) => (
            <div key={sector} className="border-gray-200 border-s">
              <button
                onClick={() => toggleSector(sector)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {expandedSectors.has(sector) ? (
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{sector}</h3>
                  </div>
                </div>
              </button>

              {expandedSectors.has(sector) && (
                <div className="border-t border-gray-200 bg-gray-50 relative  overflow-clip">
                  <div className="section-name-wrapper">
                    <div className="section-name uppercase">
                      {category === 'adaptation' ? 'HAZARDS' : ''}
                      {category === 'mitigation' ? 'ACTIVITIES' : ''}
                      {category === 'various' ? 'SUBSECTORS' : ''}
                    </div>
                  </div>
                  <div className="pl-8 divide-y divide-gray-200">
                    {category === 'adaptation' && typeof sectorData === 'object' && !Array.isArray(sectorData) && sectorData ? (
                      // Adaptation: Show Hazards
                      Object.entries(sectorData).map(([hazard, hazardData]) => (
                        <div key={hazard} className="border-gray-200 border-s rounded-0 bg-white">
                          <button
                            onClick={() => toggleHazard(hazard)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="flex-shrink-0">
                                {expandedHazards.has(hazard) ? (
                                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                  </svg>
                                ) : (
                                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                  </svg>
                                )}
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-gray-800">{hazard}</h4>
                              </div>
                            </div>
                          </button>

                          {expandedHazards.has(hazard) && (
                            <div className="border-t border-gray-200 bg-gray-50 relative overflow-clip">
                              <div className="section-name-wrapper">
                                <div className="section-name uppercase"> DIVISIONS </div>
                              </div>
                              <div className="pl-8 divide-y divide-gray-200">
                                {Object.entries(hazardData).map(([division, investments]) => (
                                  <div key={division} className="border-gray-200 border-s rounded-0 bg-white">
                                    <button
                                      onClick={() => toggleDivision(division)}
                                      className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 flex items-center justify-between"
                                    >
                                      <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                          {expandedDivisions.has(division) ? (
                                            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                            </svg>
                                          ) : (
                                            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                          )}
                                        </div>
                                        <div>
                                          <h5 className="text-sm font-medium text-gray-700">{division}</h5>
                                        </div>
                                      </div>
                                    </button>

                                    {expandedDivisions.has(division) && (
                                      <div className="border-t border-gray-200 bg-gray-50 relative overflow-clip">
                                        <div className="section-name-wrapper">
                                          <div className="section-name uppercase"> INVESTMENTS </div>
                                        </div>
                                        <div className="pl-8 divide-y divide-gray-200">
                                          {(investments as any[]).map((investment) => (
                                            <button
                                              key={investment.id}
                                              onClick={() => onInvestmentSelect(investment)}
                                              className="w-full px-4 py-3 text-left border-s border-gray-200 bg-white hover:bg-blue-50 focus:outline-none focus:bg-blue-50"
                                            >
                                              <div className="flex items-start justify-between">
                                                <div className="flex-1 min-w-0">
                                                  <h6 className="text-sm font-medium text-blue-900 truncate">
                                                    {investment.document}. {investment.code}. {investment.investment}
                                                  </h6>
                                                  <p className="text-xs text-gray-600 mt-1 truncate"  dangerouslySetInnerHTML={renderHtmlContent(investment.expectedEffect)}>

                                                  </p>
                                                  <div className="flex items-center space-x-2 mt-1">
                                                    {investment.type && (
                                                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                                        Type: {investment.type}
                                                      </span>
                                                    )}
                                                    {investment.level && (
                                                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                        Level: {investment.level}
                                                      </span>
                                                    )}
                                                    {investment.criteriaType && (
                                                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                                        Criteria Type: {investment.criteriaType}
                                                      </span>
                                                    )}
                                                  </div>
                                                </div>
                                                <svg className="h-4 w-4 text-gray-400 ml-2 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                              </div>
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    ) : category === 'various' && typeof sectorData === 'object' && !Array.isArray(sectorData) && sectorData ? (
                      // Various: Show Sub-sectors
                      Object.entries(sectorData).map(([subSector, practices]) => (
                        <div key={subSector} className="border-s border-gray-200 rounded-0 bg-white">
                          <button
                            onClick={() => toggleHazard(subSector)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="flex-shrink-0">
                                {expandedHazards.has(subSector) ? (
                                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                  </svg>
                                ) : (
                                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                  </svg>
                                )}
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-gray-800">{subSector}</h4>
                              </div>
                            </div>
                          </button>

                          {expandedHazards.has(subSector) && (
                            <div className="border-t border-gray-200 bg-gray-50 relative overflow-clip">
                              <div className="section-name-wrapper">
                                <div className="section-name uppercase"> PRACTICIES </div>
                              </div>
                              <div className="pl-8 divide-y divide-gray-200">
                                {(practices as any[]).map((practice) => (
                                  <button
                                    key={practice.id}
                                    onClick={() => onInvestmentSelect(practice)}
                                    className="w-full px-4 py-3 text-left border-s border-gray-200 bg-white hover:bg-blue-50 focus:outline-none focus:bg-blue-50"
                                  >
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1 min-w-0">
                                        <h6 className="text-sm font-medium text-blue-900 truncate">
                                          {practice.document} {practice.taxonomyReference}. {practice.eligiblePractices}
                                        </h6>
                                        <p className="text-xs text-gray-600 mt-1 truncate"  dangerouslySetInnerHTML={renderHtmlContent(practice.description)} >

                                        </p>
                                        <div className="flex items-center space-x-2 mt-1">
                                          {practice.category && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                              Category: {practice.category}
                                            </span>
                                          )}
                                          {practice.level && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                              Level: {practice.level}
                                            </span>
                                          )}
                                            {practice.criteriaType && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                              Criteria Type: {practice.criteriaType}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                      <svg className="h-4 w-4 text-gray-400 ml-2 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                      </svg>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      // Mitigation: Show Activities directly
                      <div className="divide-y divide-gray-200">
                        {(sectorData as any[]).map((activity) => (
                          <button
                            key={activity.id}
                            onClick={() => onInvestmentSelect(activity)}
                            className="w-full px-4 py-3 text-left hover:bg-blue-50 focus:outline-none focus:bg-blue-50 border-s border-gray-200 bg-white"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <h6 className="text-sm font-medium text-blue-900 truncate">
                                  {activity.document}. {activity.taxonomyReference} {activity.activity}
                                </h6>
                                <p className="text-xs text-gray-600 mt-1 truncate"  dangerouslySetInnerHTML={renderHtmlContent(activity.activityDescription)}>

                                </p>
                                <div className="flex items-center space-x-2 mt-1">
                                  {activity.isicCodes &&
                                    activity.isicCodes.split(",").map((code: string, idx: number) => (
                                      <span
                                        key={idx}
                                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                                      >
                                        ISIC Code: {code.trim()}
                                      </span>
                                    ))}
                                </div>
                              </div>
                              <svg className="h-4 w-4 text-gray-400 ml-2 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
