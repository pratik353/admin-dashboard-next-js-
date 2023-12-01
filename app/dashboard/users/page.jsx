import React from 'react'
import styles from '../../ui/dashboard/users/users.module.css'
import Search from '../../ui/dashboard/search/Search'
import Link from 'next/link'
import Image from 'next/image'
import Pagination from '../../ui/dashboard/pagination/Pagination'
import { fetchUsers } from '../../lib/data'
import { deleteUser } from '../../lib/actions'

const UsersPage = async({searchParams}) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const {users, count} = await fetchUsers(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder={'Search for a user'}/>
        <button className={styles.addButton}>
          <Link href={'/dashboard/users/add'}>Add New</Link>
        </button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Created at</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
            <td>
              <div className={styles.user}>
                <Image className={styles.userImage} src={user.img || '/noavatar.png'} alt="" width={40} height={40} />
                {user.username}
              </div>
            </td>
            <td>{user.email}</td>
            <td>{user.createdAt?.toString()}</td>
            <td>{user.isAdmin ? "Admin" : "Client"}</td>
            <td>{user.isActive ? "Active" : "Inactive"}</td>
            <td>
              <div className={styles.buttons}>
                <Link href={`/dashboard/users/${user.id}`}>
                  <button className={`${styles.button} ${styles.view}`}>View</button>
                </Link>
                <form action={deleteUser}>
                  <input type="hidden" value={user.id} name="id" />
                  <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                </form>
              </div>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count}/>
    </div>
  )
}

export default UsersPage