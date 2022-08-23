import { createContext } from "react";

const UserContext = createContext({
    user: null,
    changeUser: null,
    currentCourse: null,
    changeCourse: null,
    currentPeriod: null,
    changePeriod: null
})

export default UserContext;