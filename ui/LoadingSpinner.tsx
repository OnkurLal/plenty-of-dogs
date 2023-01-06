export default function LoadingSpinner () {
    return (
        <>
        <div className="flex justify-center items-center h-screen w-screen">
        <div className="text-gray-600 w-10 h-10 text-5xl mx-auto">
        <i className="fas fa-spinner fa-spin animate-spin" />
        </div>
        </div>
        </>
        );
}