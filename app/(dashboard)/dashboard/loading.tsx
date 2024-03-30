export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            <h1 className="text-4xl font-bold ml-4">Loading...</h1>
        </div>
    );
}
