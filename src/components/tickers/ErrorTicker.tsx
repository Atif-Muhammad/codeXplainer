

function ErrorTicker({ error }: { error: string }) {
    return (
        <div className="w-screen min-h-screen flex items-center justify-center bg-white overflow-hidden">
            <div
                className="bg-red-100 text-red-800 p-4 rounded-lg shadow-md"
                style={{
                    animation: 'ticker 0.6s ease-out',
                    transform: 'translateX(0)',
                }}
            >
                <h2 className="font-bold text-lg">Error</h2>
                <p>{error}</p>
            </div>
            <style>
                {`
        @keyframes ticker {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0); }
        }
      `}
            </style>
        </div>
    )
}

export default ErrorTicker