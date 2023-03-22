import ChangeTheme from '@/components/change-theme'
import Signup from '@/components/signup-component'
export const metadata = {
    title: 'Signup - Flat Management App',
    description: 'Manage your Flat expenses with flatmates',
}

export default function Page() {
    return (
        <><ChangeTheme></ChangeTheme>
            <Signup></Signup>
        </>
    )
}