import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const DefaultLayout = ({ children }) => {
    const { user } = useSelector((state) => state.users);
    const [collapsed, setCollapsed] = React.useState(false);

    const navigate = useNavigate();

    const userMenu = [
        {
            title: "Home",
            icon: <i class="ri-home-4-line"></i>,
            onClick: () => navigate("/"),
            path: "/"
        },
        {
            title:"Transactions",
            icon:<i class="ri-bank-line"></i>,
            onClick: ()=>navigate('/transactions'),
            path:"/transactions"
        },
        {
            title:"Requests",
            icon:<i class="ri-hand-coin-line"></i>,
            onClick:()=>navigate('/requests'),
            path:'/requests'
        },
        {
            title:"Profile",
            icon:<i class="ri-user-3-line"></i>,
            onClick:()=>navigate('/profile'),
            path:"/profile"
        },
        {
            title:"Logout",
            icon:<i class="ri-logout-box-line"></i>,
            onClick:()=>navigate("/login"),
            path:"/login"
        }

    ]

    const adminMenu = [
        {
            title: "Home",
            icon: <i class="ri-home-4-line"></i>,
            onClick: () => navigate("/"),
            path: "/"
        },
        {
            title: "Users",
            icon: <i class="ri-user-settings-line"></i>,
            onClick: () => navigate("/users"),
            path: "/users"
        },
        {
            title:"Transactions",
            icon:<i class="ri-bank-line"></i>,
            onClick: ()=>navigate('/transactions'),
            path:"/transactions"
        },
        {
            title:"Requests",
            icon:<i class="ri-hand-coin-line"></i>,
            onClick:()=>navigate('/requests'),
            path:'/requests'
        },
        {
            title:"Profile",
            icon:<i class="ri-user-3-line"></i>,
            onClick:()=>navigate('/profile'),
            path:"/profile"
        },
        {
            title:"Logout",
            icon:<i class="ri-logout-box-line"></i>,
            onClick:()=>navigate("/login"),
            path:"/login"
        }

    ]

    const menuToRender = user?.isAdmin ? adminMenu : userMenu;


    return (
        <div className='layout'>
            <div className='sidebar'>
                <div className='menu'>
                    {menuToRender.map((item)=>{
                        const isActive = window.location.pathname === item.path;
                        return (
                            <div className={`menu-item ${isActive ? "active-menu-item" : " "}`} onClick={item.onClick}>
                                {item.icon}
                                {!collapsed && <h1 className='text-white text-sm'>{item.title}</h1>}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='body'>
                <div className='header flex justify-between items-center'>
                    <div className='text-white'>
                        {!collapsed && <i class="ri-close-large-fill" onClick={() => setCollapsed(!collapsed)}></i>}
                        {collapsed && <i class="ri-menu-2-line" onClick={() => setCollapsed(!collapsed)}></i>}
                    </div>

                    <div>
                        <h1 className='text-xl text-white'>My Wallet</h1>
                    </div>

                    <div>
                        <h1 className='text-lg underline text-white'>{user?.firstName} {user?.lastName}</h1>
                    </div>
                </div>
                <div className='content'>{children}</div>
            </div>
        </div>
    )
}

export default DefaultLayout