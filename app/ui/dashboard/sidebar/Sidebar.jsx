import React from 'react'
import Image from 'next/image';
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
import MenuLink from '../sidebar/menulink/MenuLink'
import styles from './sidebar.module.css' 
import {auth, signOut} from '../../../auth';


const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Products",
        path: "/dashboard/products",
        icon: <MdShoppingBag />,
      },
      {
        title: "Transactions",
        path: "/dashboard/transactions",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/dashboard/revenue",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: "/dashboard/teams",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = async() => {
  const session = await auth();
  return (

    <div className={styles.container}>
      <div className={styles.user}>
        <Image className={styles.userImage} src={session.img || '/noavatar.png'} alt='' width={50} height={50}/>
        <div className={styles.userDetail}>
          <span className={styles.username}>{session.username}</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
      {menuItems.map( cat => {
        return (
            <li key={cat.title}>
              <span className={styles.cat}>
                {cat.list.map(item => {
                  return (
                    <MenuLink item={item} key={item.title}/>
                  )
                })}
              </span>
            </li>
          )
        })}
      </ul>
      <form action={async()=>{
        "use server";
        const result = await signOut();
      }}>
        <button className={styles.logout}>
          <MdLogout/>Logout
        </button>
      </form>
    </div>
  )
}

export default Sidebar