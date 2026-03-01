function Header() {
  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-md md:px-10">
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 rounded-full bg-blue-500" />
        <h1 className="text-lg font-bold text-gray-800">Mi Pensum</h1>
      </div>
    </header>
  );
}

export default Header;