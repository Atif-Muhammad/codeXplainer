import axios from "axios";
import { useRef, useState } from "react";
import OutputModal from "./components/OutputModal";
import ErrorTicker from "./components/tickers/ErrorTicker"


function App() {

  const codeRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [response, setResponse] = useState<any>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [features] = useState([
    {
      id: 1,
      icon: (
        <path d="M10 3L3 12L10 21L8.5 22.5L0 12L8.5 1.5L10 3ZM14 3L21 12L14 21L15.5 22.5L24 12L15.5 1.5L14 3ZM13 5H11L9 19H11L13 5Z" />
      ),
      title: "Smart Analysis",
      desc: "Advanced algorithms break down your code structure and logic",
    },
    {
      id: 2,
      icon: (
        <path d="M6 2H14L20 8V22H6V2ZM14 3.5V9H19.5L14 3.5ZM8 12H16V14H8V12ZM8 16H16V18H8V16Z" />
      ),
      title: "Export Ready",
      desc: "Generate PDF reports or copy explanation to your clipboard",
    },
    {
      id: 3,
      icon: (
        <path d="M13 2L3 14H11L9 22L21 8H13L13 2Z" />
      ),
      title: "Lightening Fast",
      desc: "Get instant explanations without waiting for complex processing",
    },
  ]);


  const handleSubmit = async () => {
    setLoading(true);
    // console.log("Code submitted:", codeRef.current?.value);
    try {
      const response = await axios.post(import.meta.env.VITE_N8N, { data: codeRef.current?.value });
      if (response.status === 200) {
        // console.log("Response from server:", response.data.output?.replace(/```(?:json)?\n?([\s\S]*?)\n?```/g, '$1').trim());
        const cleanedResponse = response.data.output?.replace(/```(?:json)?\n?([\s\S]*?)\n?```/g, '$1').trim();
        setResponse(cleanedResponse);
        setError(null);
        setShowModal(true);
        // Handle the response data as needed
      } else {
        setError(`Error: ${response.status} - ${response.statusText}`);
        console.error("Error in response:", response.status, response.statusText);
      }

    } catch (error) {
      setError("An error occurred while processing your request.");
      console.log(error)
    }
    setLoading(false);
  }


  if (error) return (
    <ErrorTicker error={error} /> 
  )
  return (
    <div className="w-screen min-h-screen overflow-x-hidden overflow-y-auto relative bg-[url(./assets/bg.jpeg)] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-start ">

      <div className="w-full backdrop-blur-sm flex flex-col items-center justify-center gap-y-8 ">

        {/* Header Section */}
        <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-y-2 text-center py-5 px-4 sm:px-6 lg:px-12">
          <div className="px-3 h-10 py-2 rounded-xl gap-x-2 bg-blue-500/30 flex items-center justify-center">
            <svg className="h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
              <path fill="#1548E6" d="M24 2L27.3 12.2L37.6 15.5L27.3 18.8L24 29L20.7 18.8L10.4 15.5L20.7 12.2L24 2Z" />
              <path fill="#1548E6" d="M36 26L37.6 30.8L42.5 32.5L37.6 34.2L36 39L34.3 34.2L29.4 32.5L34.3 30.8L36 26Z" />
              <path fill="#1548E6" d="M12 30L13 33L16 34L13 35L12 38L11 35L8 34L11 33L12 30Z" />
            </svg>
            <p className="text-xs font-bold text-blue-700">AI-Powered Coding Understanding</p>
          </div>

          <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl">
            Understand Any Code <span className="text-blue-500/90">Instantly</span>
          </h1>

          <p className="text-md sm:text-lg text-slate-600 max-w-3xl">
            Paste your code and get instant detailed explanation, documentation-style analysis, and insights that help you understand complex programming concepts quickly and easily.
          </p>
        </div>

        {/* Features Section */}
        <div className="flex flex-wrap items-center justify-center w-full max-w-6xl gap-4">
          {features?.map(({ id, icon, title, desc }, idx) => (
            <div key={idx} className="flex-1 min-w-[280px] max-w-sm p-6 flex flex-col items-center justify-center bg-white rounded-xl shadow-lg gap-y-3 cursor-pointer hover:shadow-xl transition">
              <div className={`w-16 h-16 py-3 rounded-xl ${id === 1 ? 'bg-blue-600/30' : id === 2 ? 'bg-green-600/30' : 'bg-purple-600/30'} grid place-items-center`}>
                <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={id === 1 ? "#408BFF" : id === 2 ? "#34D399" : "#A855F7"}>
                  {icon}
                </svg>
              </div>
              <p className="font-semibold text-lg">{title}</p>
              <p className="text-center text-sm text-slate-600">{desc}</p>
            </div>
          ))}
        </div>

        {/* Code Input Section */}
        <div className="bg-white shadow-xl border border-gray-300 rounded-xl p-5 w-full max-w-4xl flex flex-col items-start gap-y-5 mt-10">
          <div>
            <div className="w-full flex items-center gap-x-2">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#408BFF">
                <path d="M9.4 4L3 12L9.4 20L11 18.6L6.2 12L11 5.4L9.4 4ZM14.6 4L13 5.4L17.8 12L13 18.6L14.6 20L21 12L14.6 4Z" />
              </svg>
              <h2 className="text-lg font-bold">Paste Your Code</h2>
            </div>
            <p className="text-sm text-slate-500">Paste your code below to see the magic happen!</p>
          </div>

          <div className="w-full flex flex-col items-end gap-y-3">
            <textarea ref={codeRef} className="border border-gray-300 rounded-lg w-full p-3 text-sm outline-none" placeholder="// Paste your code here..." rows={10}></textarea>
            <button
              onClick={handleSubmit}
              className="px-3 py-2 rounded-lg bg-blue-500 text-white font-semibold tracking-wide hover:bg-blue-600 transition cursor-pointer flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              ) : (
                "Analyze Code"
              )}
            </button>

          </div>
        </div>

      </div>


      {(showModal && response) && (
        <OutputModal showModal={showModal} setShowModal={setShowModal} response={JSON.parse(response)} />
      )};
    </div>

  )
}

export default App