"use client";

const stepLabels = ["Basisgegevens", "Onderhoudsstatus"];

export function ProgressIndicator({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  return (
    <div className="mb-8 sm:mb-10">
      {/* Step circles */}
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNum = i + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <div key={i} className="flex items-center gap-2 sm:gap-3">
              <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 sm:h-10 sm:w-10 ${
                    isCompleted
                      ? "bg-[#2E5E4E] text-white shadow-md shadow-[#2E5E4E]/20"
                      : isActive
                      ? "bg-[#2E5E4E] text-white shadow-lg shadow-[#2E5E4E]/25 ring-4 ring-[#2E5E4E]/10"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  ) : (
                    stepNum
                  )}
                </div>
                <span
                  className={`text-[0.65rem] font-medium transition-colors duration-300 sm:text-xs ${
                    isActive || isCompleted ? "text-[#2E5E4E]" : "text-gray-400"
                  }`}
                >
                  {stepLabels[i]}
                </span>
              </div>

              {/* Connector line */}
              {i < totalSteps - 1 && (
                <div className="mb-6 h-0.5 w-10 sm:w-24">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isCompleted ? "bg-[#2E5E4E]" : "bg-gray-200"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
