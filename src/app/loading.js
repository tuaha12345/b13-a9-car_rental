export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-danger">Loading...</h1>
      <div className="w-16 h-16 border-4 border-gray-200 rounded-full border-t-[#f97316] animate-spin"></div>
    </div>
  );
}