import Search from "./Search"
function Header() {
  return (
    <header className="h-16 xl:px-88 lg:px-28 md:px-12 px-4">
      <div className="w-full h-full flex items-center">
        <a href="/" className="text-2xl font-bold cursor-pointer"> Ersagun Tosun & Research</a>
        <div className="hidden md:block ms-auto">
          <Search />
        </div>
      </div>
    </header>
  )
}

export default Header