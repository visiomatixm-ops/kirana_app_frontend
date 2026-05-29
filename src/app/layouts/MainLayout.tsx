import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100">

      <header className="h-16 bg-white shadow flex items-center px-4">
        <h1 className="font-bold text-lg">
          Kirana App
        </h1>
      </header>

      <main className="p-4">
        <Outlet />
      </main>

      <footer className="fixed bottom-0 left-0 right-0 h-14 bg-white border-t flex items-center justify-around">
        Bottom Navigation
      </footer>

    </div>
  );
}