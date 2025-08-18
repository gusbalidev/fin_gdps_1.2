import React from 'react'
import Divider from './Divider'

function TulisTotalRp({ value, title }: { value: string, title: string }) {
    return (
        <>
            <Divider />
            <div className='flex justify-between'>
                <p className='text-[0.8em] font-medium text-blue-600 dark:text-orange-500'>Total {title}:</p>
                <p className='text-[0.8em] font-bold'>{value}</p>
            </div>
        </>
    )
}

export default TulisTotalRp