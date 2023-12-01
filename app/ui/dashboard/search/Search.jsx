"use client"

import { MdSearch } from 'react-icons/md'
import styles from './search.module.css'

import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

const Search = ({placeholder}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { replace } = useRouter();

  const handleChange = useDebouncedCallback((event) => {

    // change URL dynamically
    const params = new URLSearchParams(searchParams);
    params.set("page", 1);
    if(event.target.value){
      // SET QUERY PARAMETER
      event.target.value.length > 2 & params.set("q", event.target.value);
    }else{
      // DELETE QUERY PARAMETER
      params.delete("q")
    }

    replace(`${pathname}?${params}`)
  },300);
 
  return (
    <div className={styles.container}>
        <MdSearch/>
        <input 
          type="text" 
          placeholder={placeholder} 
          className={styles.input} 
          onChange={handleChange}
        />
    </div>
  )
}

export default Search