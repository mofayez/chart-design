import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Services/store";
import classes from "./MasterLayout.module.css";


interface Props {
    children: JSX.Element | null;
}

/**
 * return MasterLayout for the whole app pages
 * 
 * @param param0 
 * @returns ReactElement
 */
const MasterLayout: React.FC<Props> = ({children}): ReactElement => {

    const darkMode: boolean = useSelector((state: RootState) => state.ui.darkMode);
    const en: boolean = useSelector((state: RootState) => state.ui.en);

    const darkModeClass = darkMode ? classes['dark-mode'] : '';
    document.documentElement.lang = en ? 'en' : 'ar';

    return (
        <main className={`${classes.default} ${darkModeClass}`}>{children}</main>
    );
}

export default MasterLayout;