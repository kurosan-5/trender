import Link from "next/link"

export default function Header () {
    return(
        <nav className="p-0 navbar navbar-expand-lg h-color header shadow  bg-white">
            <div className="container-fluid">
                <Link className="navbar-brand" href="/home"><img style={{margin: 5}} src="/Title.png" alt="TRENDER" width="200" height="28" />
                </Link>
            </div>
        </nav>
    )
}