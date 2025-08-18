'use client'

import React from 'react'

import { Button } from '@/components/ui/button'

import BlokPeriode from './blok-periode'
import BlokTitle from './blok-title'
import BlokHeaderKolom1 from './blok-header-kolom-1'
import BlokHeaderKolom2 from './blok-header-kolom-2'


export default function Page() {
  return (
    <>
        <BlokTitle />
        <div className="flex justify-between">
            <div className='w-1/3'>
                <BlokPeriode />
            </div>
            <div className="w-2/3">
                      <div className='flex justify-between'>
            
                        {/* Kolom1 */}
                        <div className='w-2/5'>
                          <BlokHeaderKolom1 />

                        </div>
            
                        {/* Kolom2 */}
                        <div className='w-2/5'>
                          <BlokHeaderKolom2 />
                        </div>
            
                        {/* Kolom3 */}
                        <div className='w-1/5'>
                          <BlokHeaderKolom3 />
                        </div>
            
                      </div>
                    </div>
        </div>
        
    </>
  )
}


function BlokHeaderKolom3() {
  return (
    <div className="w-full">
      <Button variant="outline" className="w-full">TEST 1</Button>
      <Button variant="outline" className="w-full">TEST 2</Button>
    </div>
  )
}
