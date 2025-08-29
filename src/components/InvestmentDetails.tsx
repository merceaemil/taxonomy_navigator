interface InvestmentDetailsProps {
  investment: any;
  onClose: () => void;
}

export function InvestmentDetails({ investment, onClose }: InvestmentDetailsProps) {
  if (!investment) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  const renderHtmlContent = (html: string) => {
    return { __html: html };
  };

  const renderAdaptationDetails = () => (
    <>
      <div className="bg-gray-50 border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-1">Taxonomy Context</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-700  mb-3">
          <span className="font-normal">Sector: {investment.sector}</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="font-normal">Hazard: {investment.hazard}</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="font-normal">Division: {investment.division}</span>
        </div>
        <div className="text-sm text-gray-700">
          {investment.document && <p><span className="font-medium">Document:</span> {investment.document}</p>}
          {investment.code && <p><span className="font-medium">Code:</span> {investment.code}</p>}
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 p-4">
        <h1 className="text-lg font-bold text-gray-900 mb-2">{investment.investment}</h1>
        <div className="flex items-center space-x-3">
          {investment.type && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              Type: {investment.type}
            </span>
          )}
          {investment.level && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Level: {investment.level}
            </span>
          )}
          {investment.criteriaType && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              Criteria Type: {investment.criteriaType}
            </span>
          )}
        </div>
      </div>

      {investment.expectedEffect && (
        <div className="bg-gray-50 border border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Expected Effect</h3>
          <div 
            className="text-gray-700 leading-relaxed" 
            dangerouslySetInnerHTML={renderHtmlContent(investment.expectedEffect)} 
          />
        </div>
      )}

      {investment.expectedResult && (
        <div className="bg-gray-50 border border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Expected Result</h3>
          <div 
            className="text-gray-700 leading-relaxed" 
            dangerouslySetInnerHTML={renderHtmlContent(investment.expectedResult)} 
          />
        </div>
      )}

      {investment.genericDNSH && (
        <div className="bg-gray-50 border border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Do No Significant Harm (DNSH)
          </h3>
          <div 
            className="text-gray-700 leading-relaxed" 
            dangerouslySetInnerHTML={renderHtmlContent(investment.genericDNSH)} 
          />
        </div>
      )}
    </>
  );

  const renderMitigationDetails = () => (
    <>
      <div className="bg-gray-50 border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-1">Taxonomy Context</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-700 mb-3">
          <span className="font-normal">Sector: {investment.sector}</span>
        </div>
        <div className="text-sm text-gray-700 ">
          {investment.document && <p><span className="font-medium">Document:</span> {investment.document}</p>}
          {investment.taxonomyReference && <p><span className="font-medium">Taxonomy Section:</span> {investment.taxonomyReference}</p>}
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{investment.activity}</h1>
        <div className="flex items-center space-x-2 mt-1">
          {investment.isicCodes &&
            investment.isicCodes.split(",").map((code: string, idx: number) => (
              <span
                key={idx}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
              >
                ISIC Code: {code.trim()}
              </span>
            ))}
        </div>

        {investment.activityDescription && (
          <div 
            className="text-gray-600 mt-4" 
            dangerouslySetInnerHTML={renderHtmlContent(investment.activityDescription)} 
          />
        )}
      </div>

      {investment.substantialContribution && (
        <div className="bg-gray-50 border border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Substantial Contribution Criteria</h3>
          <div 
            className="text-gray-700 leading-relaxed" 
            dangerouslySetInnerHTML={renderHtmlContent(investment.substantialContribution)} 
          />
        </div>
      )}

      {investment.ineligibilityCriteria && (
        <div className="bg-gray-50 border border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Ineligibility Criteria</h3>
          <div 
            className="text-gray-700 leading-relaxed" 
            dangerouslySetInnerHTML={renderHtmlContent(investment.ineligibilityCriteria)} 
          />
        </div>
      )}

      <div className="bg-gray-50 border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">DNSH Criteria</h3>
        <div className="space-y-5 text-gray-700">
          {investment.generalDNSH && (
            <div>
              <h4 className="text-lg font-medium mb-2 border-b border-gray-200">General DNSH</h4>
              <div 
                className="text-sm" 
                dangerouslySetInnerHTML={renderHtmlContent(investment.generalDNSH)} 
              />
            </div>
          )}
          {investment.dnshClimateAdaptation && (
            <div>
              <h4 className="text-lg font-medium mb-2 border-b border-gray-200">Climate Change Adaptation</h4>
              <div 
                className="text-sm" 
                dangerouslySetInnerHTML={renderHtmlContent(investment.dnshClimateAdaptation)} 
              />
            </div>
          )}
          {investment.dnshWaterResources && (
            <div>
              <h4 className="text-lg font-medium mb-2 border-b border-gray-200">Water Resources</h4>
              <div 
                className="text-sm" 
                dangerouslySetInnerHTML={renderHtmlContent(investment.dnshWaterResources)} 
              />
            </div>
          )}
          {investment.dnshCircularEconomy && (
            <div>
              <h4 className="text-lg font-medium mb-2 border-b border-gray-200">Circular Economy</h4>
              <div 
                className="text-sm" 
                dangerouslySetInnerHTML={renderHtmlContent(investment.dnshCircularEconomy)} 
              />
            </div>
          )}
          {investment.dnshPollutionPrevention && (
            <div>
              <h4 className="text-lg font-medium mb-2 border-b border-gray-200">Pollution Prevention</h4>
              <div 
                className="text-sm" 
                dangerouslySetInnerHTML={renderHtmlContent(investment.dnshPollutionPrevention)} 
              />
            </div>
          )}
          {investment.dnshBiodiversity && (
            <div>
              <h4 className="text-lg font-medium mb-2 border-b border-gray-200">Biodiversity Protection</h4>
              <div 
                className="text-sm" 
                dangerouslySetInnerHTML={renderHtmlContent(investment.dnshBiodiversity)} 
              />
            </div>
          )}
        </div>
      </div>
    </>
  );

  const renderVariousDetails = () => (
    <>
      <div className="bg-gray-50 border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-1">Taxonomy Context</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-700 mb-3">
          <span className="font-normal">Sector: {investment.sector}</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="font-normal">Subsector: {investment.subSector}</span>
        </div>
        <div className="text-sm text-gray-700">
          {investment.document && <p><span className="font-medium">Document:</span> {investment.document}</p>}
          {investment.taxonomyReference && <p><span className="font-medium">Taxonomy Section:</span> {investment.taxonomyReference}</p>}
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 p-4">
        <h1 className="text-xl font-bold text-gray-900 mb-2">{investment.eligiblePractices}</h1>
        {investment.category && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
            Category: {investment.category}
          </span>
        )}

        {investment.description && (
          <div 
            className="text-gray-700 leading-relaxed mt-4" 
            dangerouslySetInnerHTML={renderHtmlContent(investment.description)} 
          />
        )}


      </div>

      {investment.eligibleInput && (
        <div className="bg-gray-50 border border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Eligible Input</h3>
          <div 
            className="text-gray-700 leading-relaxed" 
            dangerouslySetInnerHTML={renderHtmlContent(investment.eligibleInput)} 
          />
        </div>
      )}

      {investment.ineligiblePractices && (
        <div className="bg-gray-50 border border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Ineligible Practices</h3>
          <div 
            className="text-gray-700 leading-relaxed" 
            dangerouslySetInnerHTML={renderHtmlContent(investment.ineligiblePractices)} 
          />
        </div>
      )}

      {investment.genericDNSH && (
        <div className="bg-gray-50 border border-gray-200 p-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 ">
            Do No Significant Harm (DNSH)
          </h3>
          <div 
            className="leading-relaxed text-gray-700 " 
            dangerouslySetInnerHTML={renderHtmlContent(investment.genericDNSH)} 
          />
        </div>
      )}
    </>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white overflow-hidden rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {investment.category === 'adaptation' ? 'Investment' : 
             investment.category === 'mitigation' ? 'Activity' : 'Practice'} Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6 overflow-y-auto flex-1">
          {investment.category === 'adaptation' && renderAdaptationDetails()}
          {investment.category === 'mitigation' && renderMitigationDetails()}
          {investment.mainCategory === 'various' && renderVariousDetails()}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-brand-blue-600 text-white rounded-md hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}