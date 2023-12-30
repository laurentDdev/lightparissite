"use client"
import {Switch} from "@/components/ui/switch";
import {useTheme} from "next-themes";

const ToggleTheme = () => {

    const {theme, setTheme} = useTheme();

    const onChangeTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    }

    return (
        <>
                <Switch checked={true} onClick={onChangeTheme} className={"hidden dark:block"}/>
                <Switch checked={false} onClick={onChangeTheme} className={"dark:hidden"}/>
        </>
    );
};

export default ToggleTheme;
