import Divider from '@/components/Divider'
import React from 'react'

export function TulisTitle({ title }: { title: string }) {
    return (
        <>
            <div className='text-start'>
                <p className='text-[0.9rem] text-blue-600'>{title}</p>
            </div>
        </>
    )
};

export function TulisTitleBold({ title }: { title: string }) {
    return (
        <>
            <div className='text-start'>
                <p className='font-bold text-blue-600 dark:text-orange-500'>{title}</p>
            </div>
        </>
    )
};


export function TulisTitleBoldHide({ title }: { title: string }) {
    return (
        <>
            <div className='text-start'>
                <p className='font-bold text-blue-600 dark:text-orange-500 opacity-0'>{title}</p>
            </div>
        </>
    )
};


export function TulisTotal({ title }: { title: string }) {
    return (
        <>
            <Divider />
            <div className='text-start'>
                <p className='font-bold text-blue-600 dark:text-orange-500'>{title}</p>
            </div>
        </>
    )
};

export function TulisItemTotal({ value }: { value: string }) {
    return (
        <>
            <div className='text-end'>
                <p className='text-[0.9rem] text-blue-600'>{value}</p>
            </div>
        </>
    )
};

