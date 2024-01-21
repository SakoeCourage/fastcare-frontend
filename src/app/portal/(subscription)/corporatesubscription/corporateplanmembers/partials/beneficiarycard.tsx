import React from 'react'
import IconifyIcon from 'app/app/components/ui/iconsbutton'
import { IBeneficiariesProps } from './beneficiarieslist'
import Moretableoptions from 'app/app/components/datatable/moretableoptions'

function Beneficiarycard(props: IBeneficiariesProps) {
  const { showNewCorporateMemberForm, setShowNewCorporateMemberForm } = props
  return <div className='flex bg-gray-50/60 p-2 rounded-md border items-center gap-2 w-full relative'>
    <nav className=' h-12 w-12 shadow text-blue-500 font-medium rounded-full bg-blue-100 p-1 aspect-square flex items-center justify-center gap-1'>
      SK
    </nav>
    <nav className='flex grow flex-col text-sm'>
      <h1 className=' font-medium text-gray-500'>Sakoe Courage</h1>
      <h1 className=' font-thin'>0203232323</h1>
    </nav>
    <nav className=' text-xs absolute right-0 p-2 bg-gray-100 inset-y-0 flex  items-center justify-center'>
      <Moretableoptions options={[{
        optionName: "Edit",
        icon: "bitcoin-icons:edit-outline",
        theme: "primary",
        onOptionSelected: ()=>setShowNewCorporateMemberForm(true)
      },
      {
        optionName: "Remove",
        icon: "iconamoon:sign-times-thin",
        theme: "danger",
        onOptionSelected: () => void (0)
      }
      ]} />

      {/* <button onClick={()=>setShowNewCorporateMemberForm(true)} className='flex grow border-b border-b-gray-200 items-center text-green-400 p-1 justify-start gap-1'>
        <IconifyIcon fontSize="1rem" icon='bitcoin-icons:edit-outline' className=' bg-transparent !h-5 !w-5 !p-0' />
        <span>Edit</span>
      </button>
      <button onClick={()=>setShowNewCorporateMemberForm(true)} className='flex grow items-center text-red-400 p-1 justify-start gap-1'>
        <IconifyIcon  fontSize="1rem" icon='iconamoon:sign-times-thin' className=' bg-transparent !h-5 !w-5 !p-0' />
        <span>Remove</span>
      </button> */}

    </nav>
  </div>
}

export default Beneficiarycard