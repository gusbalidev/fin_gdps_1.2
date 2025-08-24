import React from 'react'
import Divider from '@/components/Divider'

export default function TulisTotal({ value, title }: { value: string, title: string }) {
    return (
        <>
            <Divider />
            <div>
                {/* <p className='text-lg font-bold'>{title}</p> */}
                <p className='text-end font-bold'>{value}</p>
            </div>
        </>
    )
}

