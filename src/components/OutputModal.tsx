import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";


type OutputModalProps = {
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
    response: any;
};

export default function OutputModal({ showModal, setShowModal, response }: OutputModalProps) {

    console.log(response)

    const containerRef = useRef<HTMLDivElement>(null);


    const handleExportPDF = async () => {

    };




    if (!showModal) return null;

    return (
        <div className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center p-4 font-mono tracking-tight">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl p-8 max-h-[90vh] flex flex-col border border-blue-100">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full shadow-sm">
                            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 2H14L20 8V22H6V2ZM14 3.5V9H19.5L14 3.5Z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Code Analysis Report</h2>
                            <p className="text-sm text-gray-500">Detailed explanation of your code</p>
                        </div>
                    </div>
                    <button onClick={() => setShowModal(false)} className="transition hover:scale-110 duration-200 cursor-pointer">
                        <svg className="w-6 h-6 text-gray-400 hover:text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* Action Buttons */}
                {/* <div className="flex gap-3 mb-6">

                    <button
                        onClick={handleExportPDF}
                        className="bg-blue-100 text-blue-700 font-medium text-sm px-4 py-2 rounded-md hover:bg-blue-200 transition cursor-pointer"
                    >
                        ⬇️ Export PDF
                    </button>
                </div> */}

                {/* Scrollable Body */}
                <div ref={containerRef} className="overflow-y-auto grow space-y-6 pr-2">

                    {/* Explanation */}
                    <section>
                        <h3 className="text-lg font-bold mb-1">💬 Code Explanation</h3>
                        <p className="text-gray-700">{response?.explanation}</p>
                    </section>
                    <hr />

                    {/* Time & Space Complexity */}
                    <section>
                        <h3 className="text-lg font-semibold mb-1">⏱️ Time Complexity</h3>
                        <p className="text-semibold text-gray-600">{response?.timeComplexity?.comp}</p>
                        <p className="text-sm text-gray-600">{response?.timeComplexity?.exp}</p>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold mb-1">📦 Space Complexity</h3>
                        <p className="text-semibold text-gray-600">{response?.spaceComplexity?.comp}</p>
                        <p className="text-sm text-gray-600">{response?.spaceComplexity?.exp}</p>
                    </section>
                    <hr />

                    {/* Bugs */}
                    {response?.potentialBugs?.length > 0 && <section>
                        <h3 className="text-lg font-semibold mb-2 text-red-600">🐞 Potential Bugs</h3>
                        {response?.potentialBugs.map((bug: object, index: number) => (
                            <div key={index} className="mb-2">
                                {response?.potentialBugs?.length > 1 && <span className="font-semibold text-gray-800">Bug {index + 1}:</span>}
                                <p className="text-sm text-gray-700">{Object.values(bug)[0]}</p>
                            </div>
                        ))}
                    </section>}

                    {response?.confirmedBugs?.length > 0 && <section>
                        <h3 className="text-lg font-semibold mb-2 text-red-800">✅ Confirmed Bugs</h3>
                        {response?.confirmedBugs.map((bug: object, index: number) => (
                            <div key={index} className="mb-2">
                                {response?.confirmedBugs?.length > 1 && <span className="font-semibold text-gray-800">Bug {index + 1}:</span>}
                                <p className="text-sm text-gray-700">{Object.values(bug)[0]}</p>
                            </div>
                        ))}
                    </section>}

                    {/* Suggestions */}
                    {response?.suggestionsImprovement && <section>
                        <h3 className="text-lg font-semibold mb-2 text-green-700">💡 Suggestions for Improvement</h3>
                        {response?.suggestionsImprovement.map((sug: object, index: number) => (
                            <div key={index} className="mb-2">
                                <span className="font-semibold text-gray-800">Suggestion {index + 1}:</span>
                                <p className="text-sm text-gray-700">{Object.values(sug)[0]}</p>
                            </div>
                        ))}
                    </section>}
                    <hr />

                    {/* Rating */}
                    <section>
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold">📊 Rating:</span>
                            <span className="text-xl font-bold text-blue-600">{response?.rating?.score}/10</span>
                        </div>
                        {response?.rating?.explanation && <p className="text-sm text-gray-500 mt-1">{response?.rating?.explanation}</p>}
                    </section>

                </div>
            </div>
        </div>


    );
}
