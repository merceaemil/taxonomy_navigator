/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState, useRef } from "react";
import { SearchAndFilters } from "./SearchAndFilters";
import { HierarchyView } from "./HierarchyView";
import { InvestmentDetails } from "./InvestmentDetails";

type Category = "mitigation" | "adaptation" | "various";

export function DataStructureTool({ dataUrl }: { dataUrl?: string }) {
  const [activeTab, setActiveTab] = useState<Category>("mitigation");
  const [selectedInvestment, setSelectedInvestment] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{
    type?: string;
    level?: string;
    criteriaType?: string;
    isicCodes?: string;
  }>({});
  const [excelData, setExcelData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const tabs = [
    { id: "mitigation" as Category, label: "Climate Mitigation", color: "bg-brand-green-100" },
    { id: "adaptation" as Category, label: "Climate Adaptation", color: "bg-brand-blue-100" },
    { id: "various" as Category, label: "Various Objectives", color: "bg-brand-gold-100" },
  ];

  const changeTab = (category: Category) => {
    setActiveTab(category);
    setSearchTerm("");
    setFilters({});
    setSelectedInvestment(null);
  };

  const handleInvestmentSelect = (investment: any) => {
    setSelectedInvestment(investment);
  };

  const handleCloseDetails = () => {
    setSelectedInvestment(null);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setFilters({});
  };

  // --- Scrollable tabs logic ---
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkForScrollPosition = () => {
    const el = scrollerRef.current;
    if (!el) return;
    console.log(el.scrollLeft);
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    const fetchLastParsedFile = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(dataUrl || "http://localhost:3000/api/data");

        if (response.ok) {
          const data = await response.json();
          setExcelData(data.data);
        } else if (response.status !== 404) {
          console.error("Error fetching last parsed file:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching last parsed file:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLastParsedFile();
  }, []);

  useEffect(() => {
    checkForScrollPosition();
    const el = scrollerRef.current;
    if (!el) return;

    window.addEventListener("resize", checkForScrollPosition);
    return () => {
      window.removeEventListener("resize", checkForScrollPosition);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const scrollAmount = 200;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white border p-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
          <p className="text-gray-600 mt-2">Preparing your data</p>
        </div>
      </div>
    );
  }

  if (!excelData) {
    return (
      <div className="bg-white border p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Taxonomy Navigator</h2>
            <p className="text-gray-600">No data to preview</p>
          </div>
        </div>
      </div>
    );
  }

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="bg-white border relative">
      {/* Tab Navigation with Scroll + Arrows */}
      <div className="border-b border-gray-200 relative overflow-hidden">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 h-full 2 z-10 bg-white p-1 m-0 shadow-[8px_0_8px_-8px_rgba(0,0,0,0.1)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <nav
          ref={scrollerRef}
          onScroll={checkForScrollPosition}
          className="flex space-x-8 px-6 overflow-x-auto scrollbar-hide scroll-smooth"
          aria-label="Tabs"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => changeTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex-shrink-0 ${
                activeTab === tab.id
                  ? "border-brand-blue-500 text-brand-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-2 flex-nowrap min-w-max">
                <div className={`w-3 h-3 rounded-full ${tab.color}`}></div>
                <span>{tab.label}</span>
                {excelData[tab.id] && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {excelData[tab.id].length}
                  </span>
                )}
              </div>
            </button>
          ))}
        </nav>

        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 h-full 2 z-10 bg-white p-1 m-0 shadow-[-8px_0_8px_-8px_rgba(0,0,0,0.1)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="p-6">
        <SearchAndFilters
          searchTerm={searchTerm}
          category={activeTab}
          onSearchChange={setSearchTerm}
          filters={filters}
          onFiltersChange={setFilters}
          onReset={handleResetFilters}
          onInvestmentSelect={handleInvestmentSelect}
          data={excelData[activeTab] || []}
        />

        <div className="mt-6 relative">
          {!searchTerm && !activeFiltersCount && (
            <HierarchyView
              category={activeTab}
              filters={filters}
              onInvestmentSelect={handleInvestmentSelect}
              data={excelData[activeTab] || []}
            />
          )}
        </div>
      </div>

      {/* Investment Details Modal */}
      {selectedInvestment && (
        <InvestmentDetails investment={selectedInvestment} onClose={handleCloseDetails} />
      )}
    </div>
  );
}
