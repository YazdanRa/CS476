import React, {useState} from "react";

function Menu({current_path}) {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    const menuItems = [
        {href: "/dashboard", label: "Dashboard"},
        {href: "/profile", label: "Profile Setting"},
        {href: "/elections/myVotingHistory", label: "My Voting History"},
        {href: "/elections/myElections", label: "My Elections"},
        {href: "/elections/createElection", label: "Create Election"},
        {href: "/auth/logout", label: "Logout"}
    ];

    return (
        <div className="dropdown">
            <button onClick={toggleMenu} className="menu-button">Menu</button>
            {showMenu && (
                <div className="menu-list">
                    {menuItems.map((item, index) =>
                        current_path !== item.href && <a key={index} href={item.href}>{item.label}</a>
                    )}
                </div>
            )}
        </div>
    )
}

export default Menu;
