const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="relative flex items-center justify-center">
        {/* Outer frame */}
        <div className="absolute h-24 w-24 animate-pulse rounded-full border-4 border-blue-500 opacity-50"></div>
        {/* Inner frame */}
        <div className="absolute h-16 w-16 animate-pulse rounded-full border-4 border-blue-300 delay-150"></div>
        {/* Center lens */}
        <div className="h-10 w-10 animate-bounce rounded-full bg-blue-600"></div>
      </div>
      <p className="mt-4 text-lg font-semibold text-blue-600">Focusing...</p>
    </div>
  );
};

export default Loading;
