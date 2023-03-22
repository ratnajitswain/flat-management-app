import ChangeTheme from '@/components/change-theme'
import Login from '@/components/login-component'
export const metadata = {
    title: 'Login - Flat Management App',
    description: 'Manage your Flat expenses with flatmates',
}

export default function Page() {
    return (
        <><ChangeTheme></ChangeTheme>
            <Login></Login>
        </>
    )
}