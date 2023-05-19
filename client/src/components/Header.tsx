"use client"
import { state } from "@/store"
import { AiOutlineSearch } from "react-icons/ai"
import { MdLightMode, MdDarkMode } from "react-icons/md"
import { RiShoppingCartLine } from "react-icons/ri"
import { RxHamburgerMenu } from "react-icons/rx"
import { useSnapshot } from "valtio"
import { useRouter } from "next/navigation"

export const Header = ({
    categories,
    subcategories
}: {
    categories: any[],
    subcategories: any[],
}) => {
    const snap = useSnapshot(state)

    const setDarkTheme = () => {
      state.darkTheme = true
    }
  
    const setLightTheme = () => {
      state.darkTheme = false
    }

    const router = useRouter()

    const navigate = (path:string) => {
        if (router) {
            router.push(path)
            state.showCartSidebar = false
            state.showNavSidebar = false
        }
    }

    return (
        <header className={`sticky top-0 border-b-2 px-6 ${snap.darkTheme ? 'header-dark' : 'header-light'}`}>
            <div className="flex h-20 items-center max-w-screen-lg mx-auto">
                <div className="flex-[2] flex md:flex-1 sm:gap-6 justify-between items-center h-full">
                    <button className="md:hidden flex justify-center items-center aspect-square rounded-full" onClick={() => state.showNavSidebar = true}>
                        <RxHamburgerMenu />
                    </button>
                    <button className="md:hidden flex justify-center items-center aspect-square rounded-full">
                        <AiOutlineSearch />
                    </button>
                    <button className="w-min text-xl" role="link" onClick={() => navigate("/catalog")}>
                        <span>Total</span>
                        <span className="text-blue-400">Wash</span>
                    </button>
                </div>
                <div className="hidden md:flex flex-[2] border-2 justify-end  border-black rounded-sm h-9 focus-within:border-blue-500">
                    <input type="text" className={snap.darkTheme ? 'header-search-input-dark' : 'header-search-input'} placeholder="Search" />
                    <button className={snap.darkTheme ? 'header-search-btn-dark' : 'header-search-btn'}>
                        <AiOutlineSearch />
                    </button>
                </div>
                <div className="flex-1 justify-evenly gap-3 pl-3 hidden xxs:flex">
                    <div className="flex flex-1 justify-end">
                    {snap.darkTheme ?            
                    <button
                    onClick={setLightTheme}
                    className="flex items-center text-base gap-3 md:rounded-xl md:w-auto aspect-square md:aspect-auto rounded-full justify-center hover:underline underline-offset-4">
                        <MdLightMode />
                        <span className="hidden md:inline">Theme</span>
                    </button>
                    :
                    <button
                    onClick={setDarkTheme}
                    className="flex items-center text-base gap-3 md:rounded-xl md:w-auto aspect-square md:aspect-auto rounded-full justify-center hover:underline underline-offset-4">
                        <MdDarkMode />
                        <span className="hidden md:inline">Theme</span>
                    </button>
                    }
                    </div>
                    <div className="flex flex-1 justify-end">
                    <button
                    onClick={() => state.showCartSidebar = true}
                    className="flex items-center text-base gap-3 md:rounded-xl md:w-auto aspect-square md:aspect-auto rounded-full justify-center hover:underline underline-offset-4">
                        <RiShoppingCartLine />
                        <span className="hidden md:inline">Cart</span>
                    </button>
                    </div>
                </div>
            </div>
            <nav className="hidden w-full justify-between md:flex text-base flex-nowrap py-3 max-w-screen-lg mx-auto">
            {categories.map((category) =>
                <div className="hover:underline underline-offset-4 relative group" key={category._id}>
                    <button className="hover:underline underline-offset-4" role="link" onClick={() => navigate(`/catalog/${category.slug}`)}>
                        <span>{category.name}</span>
                    </button>
                    <div className="absolute flex-col hidden group-hover:flex bg-gray-50 px-5 py-10 gap-6 w-48">
                        {subcategories.map((subcategory) => subcategory.categories[0]._id === category._id &&
                        <div key={subcategory._id}>
                            <button className="hover:underline underline-offset-4" role="link" onClick={() => navigate(`/catalog/${subcategory.slug}`)}>
                                <span>{subcategory.name}</span>
                            </button>
                        </div>
                        )}
                    </div>
                </div>
                )}
            </nav>
        </header>
    )
}