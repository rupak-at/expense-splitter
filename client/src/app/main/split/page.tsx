"use client"
import { useAppSelector } from '@/app/hooks'
import { getSplit } from '@/lib/queryProvider/getSplit'
import React from 'react'

const page = () => {
    const {group} = useAppSelector((state) => state.groupDetails)
    const {data, isLoading} = getSplit(group?._id)
    if (!isLoading && data) {
        console.log(data)
    }
  return (

    // to show data in table/ chart
    <div>page</div>
  )
}

export default page