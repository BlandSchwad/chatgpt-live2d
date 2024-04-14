import { Avatar, Menu, UnstyledButton, rem } from "@mantine/core"
import { IconLogout } from "@tabler/icons-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
export const Header = () => {
    const session = useSession()
    console.log(session.data)
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-2 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
        <div>Sick Ass Logo</div>
        <div>
            Projects
        </div>
        <div>
            About
        </div>
        <Link href="/signup">
            swooce
        </Link>
        
        <button>
            Login
        </button>
        <div> 
            <Menu shadow="md" width={200}>
                <Menu.Target>
                    <UnstyledButton>
                        <Avatar radius='xl'/>
                    </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item onClick={() => {console.log('Logout')}}
                        icon={<IconLogout style={{ width: rem(14), height: rem(14) }} /> }>Logout
                    </Menu.Item>

                </Menu.Dropdown>
            </Menu>
            
            
        </div>
        {/* <button>
            Logout
        </button> */}

    </header>

    )

    
}

export default Header