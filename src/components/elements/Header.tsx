export const Header = () => {
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-2 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
        <div>Sick Ass Logo</div>
        <div>
            Projects
        </div>
        <div>
            About
        </div>
        <div> 
            User Button
        </div>
        <button>
            Login
        </button>
        <button>
            Logout
        </button>

    </header>

    )

    
}

export default Header