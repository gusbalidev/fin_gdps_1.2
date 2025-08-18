import React from 'react'
import Divider from './Divider'

function TulisRekapRp({ value, title }: { value: string, title: string }) {
    return (
        <>
            <div className='flex justify-between p-0.5'>
                {/* <p className='text-sm font-medium'>{title}</p> */}
                <p></p>
                <p className='text-[0.8em] text-blue-600 dark:text-orange-500'>{value}</p>
                {/* <p className='text-m'>{value}</p> */}
            </div>
        </>
    )
}

export default TulisRekapRp