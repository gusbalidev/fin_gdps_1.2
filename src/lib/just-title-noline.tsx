import React from 'react'
import Divider from '@/components/Divider'

function JustTitleNoline({ title }: { title: string }) {
    return (
        <>
            <div>
                <p className='text-start font-medium'>{title}</p>
            </div>
        </>
    )
}


function JustTitleNolineBold({ title }: { title: string }) {
    return (
        <>
            <div>
                <p className='text-start font-bold'>{title}</p>
            </div>
        </>
    )
}

export { JustTitleNoline, JustTitleNolineBold }
