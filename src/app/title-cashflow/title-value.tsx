import React from 'react'
import Divider from '@/components/Divider'

function JustTitle({ title }: { title: string }) {
    return (
        <>
            <Divider />
            <div>
                <p className='text-start font-bold'>{title}</p>
            </div>
        </>
    )
}

function JustTitleNoline({ title }: { title: string }) {
    return (
        <>
            <div>
                <p className='text-start font-medium'>{title}</p>
            </div>
        </>
    )
}

function JustTitleNoline2({ title }: { title: string }) {
    return (
        <>
            <div>
                <p className='text-start text-xl font-medium text-blue-600 dark:text-orange-600'>{title}</p>
            </div>
        </>
    )
}


function JustValueTotal({ value }: { value: string }) {
    return (
        <>
            <Divider />
            <div>
                <p className='text-end font-medium'>{value}</p>
            </div>
        </>
    )
}

function JustValueTotalBold({ value }: { value: string }) {
    return (
        <>
            <Divider />
            <div>
                <p className='text-end font-bold'>{value}</p>
            </div>
        </>
    )
}

function JustValueTotalNoLine({ value }: { value: string }) {
    return (
        <>
            <div>
                <p className='text-end font-medium'>{value}</p>
            </div>
        </>
    )
}


function JustValueTotalNoLineBold({ value }: { value: string }) {
    return (
        <>
            <div>
                <p className='text-end font-bold'>{value}</p>
            </div>
        </>
    )
}

function JustValueTotalNoLineBold2({ value }: { value: string }) {
    return (
        <>
            <div>
                <p className='text-end text-xl font-bold text-blue-600 dark:text-orange-600'>{value}</p>
            </div>
        </>
    )
}


export { JustTitle, JustTitleNoline, JustTitleNoline2, JustValueTotal, JustValueTotalNoLine, JustValueTotalBold, JustValueTotalNoLineBold, JustValueTotalNoLineBold2 }
