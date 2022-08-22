import { createContext } from "react";

const PageContext = createContext({
    changePage: null,
    toggle: null
})

export default PageContext;