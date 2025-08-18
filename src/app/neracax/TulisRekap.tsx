import React from 'react'

function TulisRekapFull ({ value, title }: { value: string, title: string }) {
    return (
        <>
            <div className='flex justify-between p-0.5'>
                <p className='text-[0.8em] font-medium text-blue-600 dark:text-orange-500'>{title}</p>
                <p className='text-[0.8em] font-medium text-gray-700 dark:text-gray-400'>{value}</p>
            </div>
        </>
    )
}

function TulisRekapFullBold ({ value, title }: { value: string, title: string }) {
    return (
        <>
            <div className='flex justify-between p-0.5'>
                <p className='text-[0.8em] font-bold text-blue-600 dark:text-orange-500'>{title}</p>
                <p className='text-[0.8em] font-bold text-gray-700 dark:text-gray-400'>{value}</p>
            </div>
        </>
    )
}

function TulisRekap ({ value }: { value: string }) {
    return (
        <>
            <div className='text-end p-0.5'>
                <p className='text-[0.8em] font-medium text-blue-600 dark:text-orange-500'>{value}</p>
            </div>
        </>
    )
}

function TulisRekapBold ({ value }: { value: string }) {
    return (
        <>
            <div className='text-end font-bold p-0.5'>
                <p className='text-[0.8em] font-bold text-blue-600 dark:text-orange-500'>{value}</p>
            </div>
        </>
    )
}

export { TulisRekap, TulisRekapFull, TulisRekapBold, TulisRekapFullBold };