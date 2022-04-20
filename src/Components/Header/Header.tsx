import React, { ReactElement } from 'react';
import classes from "./Header.module.css";
import Switch from "react-switch";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Services/store';
import { uiActions } from '../../Services/slices/ui-slice';
import { useTranslation } from 'react-i18next';


interface Props {

}

/**
 * renders page header
 * 
 * @param props 
 * @returns ReactElement
 */
const Header: React.FC<Props> = (props: Props): ReactElement => {

    const dispatch = useDispatch();

    const { t, i18n } = useTranslation();

    const darkMode: boolean = useSelector((state: RootState) => state.ui.darkMode);
    const en: boolean = useSelector((state: RootState) => state.ui.en);

    // listen for theme color switch input
    // push the value to the store
    const handleChange = (checked: any) => {
        dispatch(uiActions.setDarkMode(checked));
    }

    // listen for language selection
    // push a boolean indicates the EN is selected, otherwise -> AR
    const handleLangChange = (checked: any) => {

        dispatch(uiActions.setEn(!en));

        if (checked) {
            i18n.changeLanguage('en');
        } else { 
            i18n.changeLanguage('ar');
        }
    }

    return (
        <header>
            <div>
                <h1 title='mainHeader' className={classes['main-header']}>{t("mainHeader.label")}</h1>
                <h2 title='subHeader' className={classes['sub-header']}>{t("numLessons.label")}</h2>
            </div>
            <div>
                <label className={classes['switch']}>
                    <span>{darkMode ? t("darkMode.label") : t("ligthMode.label")}</span>
                    <Switch checked={darkMode} onChange={handleChange} data-testid="changeTheme" />
                </label>
                <label className={classes['switch']}>
                    <span>{en ? 'EN' : 'العربية' } </span>
                    <Switch checked={en} onChange={handleLangChange} data-testid="changeLang" />
                </label>
            </div>
        </header>
    );
}

export default Header;