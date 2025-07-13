import { Outlet } from "@tanstack/react-router";
import { Suspense } from "react";

const RootLayout = () => {
  return (
    <Suspense fallback={<div className="p-4 text-gray-600">Loading...</div>}>
      <div className="flex min-h-screen flex-col bg-white text-black">
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </Suspense>
  );
};

export default RootLayout;
