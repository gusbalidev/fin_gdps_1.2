import React from 'react'
import Divider from './Divider'

function TulisRekapRp({ value, title }: { value: string, title: string }) {
    return (
        <>
            <div className='flex justify-between p-0.5'>
                <p className='text-[0.8em] font-medium text-blue-600 dark:text-orange-500'>{title}</p>
                <p className='text-[0.8em] font-medium text-gray-700 dark:text-gray-400'>{value}</p>
            </div>
        </>
    )
}

export default TulisRekapRp