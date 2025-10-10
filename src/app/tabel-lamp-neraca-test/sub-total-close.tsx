import React, { Suspense } from 'react';
import Loading from '@/components/Loading';
import { textStyles } from '@/lib/text-styles';

function SubTotalAB({ value, title }: { value: string; title: string }) {

    return (
        <>
            <div className='flex justify-between p-0.5'>
                {/* <p className='text-sm font-medium'>{title}</p> */}
                <p></p>
                <p className='text-m font-medium'>{value}</p>
            </div>
        </>
    );
}

// export default SubTotalAB;

function SubTotalABX({ value, title }: { value: string; title: string }) {
    return (
        <>
            <Suspense fallback={<Loading section="......" />}>
                <div className='flex justify-between p-0.5'>
                    <p className='text-m font-medium'>{title}</p>
                    <p className='text-m font-medium'>{value}</p>
                </div>
            </Suspense>
        </>
    )
}

function SubTotalAll({ value, title }: { value: string; title: string }) {

    return (
        <>
            <div className='flex justify-between items-center'>
                <p className='text-m font-light'>{title}</p>
                <p className='text-xl font-bold'>{value}</p>
            </div>
        </>
    );
}


function TulisRekapRpX({ value, title }: { value: string, title: string }) {
    return (
        <>
            <div className='flex justify-between p-0.5'>
                <p className={`${textStyles.sizes.small}  text-blue-600 dark:text-orange-500`}>{title}</p>
                <p className={`${textStyles.sizes.small}  text-gray-700 dark:text-gray-400`}>{value}</p>
            </div>
        </>
    )
}

function TulisRekapRp({ value, title }: { value: string, title: string }) {
    return (
        <>
            <div className='flex justify-between p-0.5'>
                <p></p>
                <p className={`${textStyles.sizes.small}  text-blue-600 dark:text-orange-500`}>{value}</p>
            </div>
        </>
    )
}

export { SubTotalAB, SubTotalABX, SubTotalAll, TulisRekapRpX, TulisRekapRp };
