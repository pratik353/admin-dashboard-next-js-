import React from 'react'
import Link from 'next/link'
import Pagination from '../../ui/dashboard/pagination/Pagination'
import Image from 'next/image'
import Search from '../../ui/dashboard/search/Search'
import styles from '../../ui/dashboard/products/products.module.css'
import { fetchProducts } from '../../lib/data'
import { deleteProduct } from '../../lib/actions'

const ProductPage = async({searchParams}) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const {products, count} = await fetchProducts(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a product..." />
        <Link href="/dashboard/products/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Stock</td>
            <td>Created At</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td><div className={styles.product}>
                <Image className={styles.productImage} src={product.img || '/noavatar.png'} alt="" width={40} height={40} />
                {product.title}
              </div></td>
              <td>{product.desc}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.createdAt?.toString()}</td>
              <td>
              <div className={styles.buttons}>
                <Link href={`/dashboard/products/${product._id}`}>
                  <button className={`${styles.button} ${styles.view}`}>
                    View
                  </button>
                </Link>
                <form action={deleteProduct}>
                  <input type="hidden" value={product.id} name="id" />
                  <button className={`${styles.button} ${styles.delete}`}>
                    Delete
                  </button>
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

export default ProductPage