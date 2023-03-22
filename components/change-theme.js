'use client'
import { useTheme } from 'next-themes'
const ThemeChanger = () => {
    const { theme, setTheme } = useTheme()

    return (
        <div className="w-max absolute top-0 right-0 cursor-pointer hover:bg-gray-400 p-2 rounded-sm ">
            {
                theme == "dark" ? 
                <i onClick={() => setTheme("light")} className="bi bi-sun-fill text-base"></i> :
                    <i onClick={() => setTheme("dark")} className="bi bi-moon-fill text-base"></i>
            }
        </div>
    )
}
export default ThemeChanger;