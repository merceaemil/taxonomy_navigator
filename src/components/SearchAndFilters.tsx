import { useState, useMemo } from "react";

interface SearchAndFiltersProps {
  searchTerm: string;
  category: "mitigation" | "adaptation" | "various";
  onSearchChange: (term: string) => void;
  filters: {
    type?: string;
    level?: string;
    criteriaType?: string;
    isicCodes?: string;
    category?: string;
  };
  onFiltersChange: (filters: any) => void;
  onReset: () => void;
  onInvestmentSelect: (investment: any) => void;
  data: any[];
}

export function SearchAndFilters({
  searchTerm,
  category,
  onSearchChange,
  filters,
  onFiltersChange,
  onReset,
  onInvestmentSelect,
  data,
}: SearchAndFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  // Generate filter options from data
  const filterOptions = useMemo(() => {
    const types = [...new Set(data.map(item => item.type).filter(Boolean))];
    const levels = [...new Set(data.map(item => item.level).filter(Boolean))];
    const isicCodes = [...new Set(data.map(item => item.isicCodes?.split(",").map((x: string) => x.trim())).flat().filter(Boolean))];
    const criteriaTypes = [...new Set(data.map(item => item.criteriaType).filter(Boolean))];
    const category = [...new Set(data.map(item => item.category).filter(Boolean))];

    return { types, levels, criteriaTypes, isicCodes, category };
  }, [data]);

  // Filter and search data
  const searchResults = useMemo(() => {
    const filtered = data.filter(item => {
      // Search in relevant text fields
      const searchFields = [
        item.investment || item.activity || item.eligiblePractices || '',
        item.expectedEffect || item.activityDescription || item.description || '',
        item.sector || '',
        item.hazard || '',
        item.division || item.subSector || ''
      ];

      const searchText = searchFields.join(' ').toLowerCase();
      const matches = searchTerm.toLowerCase().split(' ').every(term =>
        searchText.includes(term)
      );

      if (!matches) return false;

      // Apply filters
      if (filters.type && item.type !== filters.type) return false;
      if (filters.level && item.level !== filters.level) return false;
      if (filters.criteriaType && item.criteriaType !== filters.criteriaType) return false;
      if (filters.isicCodes && !item.isicCodes?.includes(filters.isicCodes)) return false;
      if (filters.category && item.category !== filters.category) return false;

      return true;
    });

    return filtered.splice(0, 100); // Limit results
  }, [data, searchTerm, filters]);

  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value === "" ? undefined : value,
    });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search investments, activities, or practices..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-brand-blue-500  hover:border-black focus:border-brand-blue-500"
        />
      </div>

      {/* Filter Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center px-3 py-2 border border-brand-blue-500 shadow-sm text-sm leading-4 font-medium rounded-md text-brand-blue-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500"
        >
          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
          </svg>
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {(searchTerm || activeFiltersCount > 0) && (
          <button
            onClick={onReset}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Reset all
          </button>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-md border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {category === "mitigation" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ISIC Codes</label>
                <select
                  tabIndex={-1}
                  value={filters.isicCodes || ""}
                  onChange={(e) => {handleFilterChange("isicCodes", e.target.value); e.target.blur();}}
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 hover:border-black focus:border-brand-blue-500 sm:text-sm"
                >
                  <option value="">All codes</option>
                  {filterOptions.isicCodes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {category === "adaptation" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  tabIndex={-1}
                  value={filters.type || ""}
                  onChange={(e) => {handleFilterChange("type", e.target.value); e.target.blur();}}
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500  hover:border-black focus:border-brand-blue-500 sm:text-sm"
                >
                  <option value="">All Types</option>
                  {filterOptions.types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {category === "adaptation" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                <select
                  tabIndex={-1}
                  value={filters.level || ""}
                  onChange={(e) => {handleFilterChange("level", e.target.value); e.target.blur();}}
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500  hover:border-black focus:border-brand-blue-500 sm:text-sm"
                >
                  <option value="">All Levels</option>
                  {filterOptions.levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {category === "adaptation" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Criteria Type</label>
                <select
                  tabIndex={-1}
                  value={filters.criteriaType || ""}
                  onChange={(e) => {handleFilterChange("criteriaType", e.target.value); e.target.blur();}}
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500  hover:border-black focus:border-brand-blue-500 sm:text-sm"
                >
                  <option value="">All Criteria</option>
                  {filterOptions.criteriaTypes.map((criteria) => (
                    <option key={criteria} value={criteria}>
                      {criteria}
                    </option>
                  ))}
                </select>
              </div>
            )}
             {category === "various" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  tabIndex={-1}
                  value={filters.category || ""}
                  onChange={(e) => {handleFilterChange("category", e.target.value); e.target.blur();} }
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500  hover:border-black focus:border-brand-blue-500 sm:text-sm"
                >
                  <option value="">All categories</option>
                  {filterOptions.category.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Search Results */}
      {(searchTerm  || activeFiltersCount > 0) && (
        <div className="bg-white border rounded-md">
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-900">
              Search Results ({searchResults.length})
            </h3>
          </div>
          <div>
            {searchResults.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500">
                No items found matching your search criteria.
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {searchResults.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onInvestmentSelect(item)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h6 className="text-sm font-medium text-blue-900 truncate">
                          {item.investment || item.activity || item.eligiblePractices}
                        </h6>
                        <div className="flex items-center space-x-2 text-sm text-gray-700 mt-1 mb-3">
                          {item.sector && (
                            <>
                              <span className="font-normal">
                                Sector: {item.sector}
                              </span>
                              {(item.subSector || item.hazard) && (
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              )}
                            </>
                          )}
                          {item.hazard && (
                            <>
                              <span className="font-normal">
                                Hazard: {item.hazard}
                              </span>
                              {(item.division) && (
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              )}
                            </>
                          )}
                          {item.division && (
                            <>
                              <span className="font-normal">
                                Division: {item.division}
                              </span>
                            </>
                          )}
                          {item.subSector && (
                            <>
                              <span className="font-normal">
                                Subsector: {item.subSector}
                              </span>
                            </>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {item.expectedEffect || item.activityDescription || item.description}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          {item.type  && category==='adaptation' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              Type: {item.type}
                            </span>
                          )}
                          
                          {item.category  && category==='various' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              Category: {item.category}
                            </span>
                          )}
                          {item.level && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              Level: {item.level}
                            </span>
                          )}
                            {item.criteriaType && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                              Criteria Type: {item.criteriaType}
                            </span>
                          )}

                          {item.isicCodes && item.isicCodes.split(",").map((code: string, idx: number) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              ISIC Code: {code.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                      <svg className="h-5 w-5 text-gray-400 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
  );
}
