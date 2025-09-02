// import { Link } from 'lucide-react'
import React from 'react'
import { ChartCashflow } from './chart-cashflow';

interface MenuBoxButtonProps {
  title: string;
  desc: string;
  menulink: string;
}

export default function GraphBox({ title, desc, menulink }: MenuBoxButtonProps) {

  const handleClick = () => {
    console.log('Button clicked');
    window.open(menulink, '_blank');
  };

  return (
    <div className="rounded-xl cursor-pointer" >

      <ChartCashflow />
    </div>
  )
}

// function handleClick() {
//   window.open('/neraca-t', '_blank');

// }

