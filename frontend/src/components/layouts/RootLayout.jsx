import { Outlet } from "@tanstack/react-router";

export const RootLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
      <main className="flex-1 px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};
