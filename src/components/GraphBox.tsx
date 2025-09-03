import React from 'react'

export default function GraphBox({ graphComp }: { graphComp?: React.ReactNode }) {
  return (
    <div className="rounded-xl cursor-pointer bg-green-100 hover:bg-orange-300" >
      {graphComp}
    </div>
  )
}

