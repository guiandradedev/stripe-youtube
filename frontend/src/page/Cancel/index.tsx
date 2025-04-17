export default function Cancel() {
    return (
        <div className="min-h-screen bg-red-100 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-red-700">Payment Canceled</h1>
            <p className="text-lg mt-4">Your payment was not completed. Please try again.</p>
        </div>
    )
}