"use client"
import { state } from "@/store"
import { useEffect, useRef } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { useSnapshot } from "valtio"
import { useOutsideClick } from "@/hooks"

export const MobileSearch = ({
    closeSearch,
}: {
    closeSearch: () => void,
}) => {
    const snap = useSnapshot(state)

    const searchRef = useOutsideClick(closeSearch)

    const inputRef = useRef<HTMLInputElement>(null)

    const buttonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (!inputRef.current) return
        inputRef.current.focus()
    }, [])

    useEffect(() => {
        const checkFocus = () => {
            if (!inputRef.current) return
            if (inputRef.current !== document.activeElement && buttonRef.current !== document.activeElement) {
                closeSearch()
            }
        }

        Object.keys(window).forEach(key => {
            if (/^on/.test(key)) {
                window.addEventListener(key.slice(2), checkFocus)
            }
        })

        return () => {
            Object.keys(window).forEach(key => {
                if (/^on/.test(key)) {
                    window.removeEventListener(key.slice(2), checkFocus)
                }
            })
        }
    }, [])
    
    return (
        <div className={`absolute left-0 right-0 md:!hidden px-6 py-3 bg-inherit`} ref={searchRef}>
            <div
            id="mobileSearchBar"
            className={`border-2 justify-end  border-black rounded-sm h-9 focus-within:border-blue-500 flex`}>
                    <input
                    ref={inputRef}
                    type="text"
                    className={snap.darkTheme ? 'header-search-input-dark' : 'header-search-input'}
                    placeholder="Search"
                    autoFocus/>
                    <button
                    ref={buttonRef}
                    className={snap.darkTheme ? 'header-search-btn-dark' : 'header-search-btn'}>
                        <AiOutlineSearch />
                    </button>
            </div>
        </div>
    )
}