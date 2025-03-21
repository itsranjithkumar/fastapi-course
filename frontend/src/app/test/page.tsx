export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl hover:scale-105 transition-transform">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Tailwind CSS Test
        </h1>
        <p className="text-gray-600">
          If you can see this styled card with a gradient background, Tailwind CSS is working perfectly! 🎉
        </p>
        <div className="mt-4 space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Button 1
          </button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
            Button 2
          </button>
        </div>
      </div>
    </div>
  );
}
