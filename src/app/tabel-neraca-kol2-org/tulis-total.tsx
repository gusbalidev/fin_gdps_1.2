import Divider from '@/components/Divider'
import React from 'react'

function TulisTotal({ value, title }: { value: string, title: string }) {
    return (
        <>
            <div className="flex justify-between">
                <p className='text-md font-medium'>{title}</p>
                <p className='text-end font-medium'>{value}</p>
            </div>
        </>
    )
}

export default TulisTotal
