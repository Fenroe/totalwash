import { proxy } from "valtio"

export const state = proxy({
    darkTheme: false,
    showNavSidebar: false,
    showCartSidebar: false,
})
