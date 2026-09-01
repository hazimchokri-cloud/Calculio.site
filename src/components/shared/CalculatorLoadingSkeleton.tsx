import React from 'react';

export const CalculatorLoadingSkeleton: React.FC = () => {
  return (
    <div className="w-full space-y-6 animate-pulse py-4" aria-busy="true" aria-label="Loading calculator interface">
      <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
        <div className="h-6 bg-[#E2E8F0] rounded-lg w-48" />
        <div className="h-6 bg-[#E2E8F0] rounded-lg w-20" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="h-4 bg-[#E2E8F0] rounded w-28" />
          <div className="h-11 bg-[#F1F5F9] rounded-xl border border-[#E2E8F0]" />
          
          <div className="h-4 bg-[#E2E8F0] rounded w-32 mt-4" />
          <div className="h-11 bg-[#F1F5F9] rounded-xl border border-[#E2E8F0]" />

          <div className="h-4 bg-[#E2E8F0] rounded w-24 mt-4" />
          <div className="h-11 bg-[#F1F5F9] rounded-xl border border-[#E2E8F0]" />
        </div>

        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 flex flex-col justify-between min-h-[220px]">
          <div className="space-y-3">
            <div className="h-4 bg-[#E2E8F0] rounded w-36" />
            <div className="h-10 bg-[#E2E8F0] rounded-xl w-3/4" />
            <div className="h-4 bg-[#E2E8F0] rounded w-1/2" />
          </div>
          <div className="h-10 bg-[#FED7AA] rounded-xl w-full mt-6" />
        </div>
      </div>
    </div>
  );
};
