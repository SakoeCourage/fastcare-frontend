import React, { useState } from 'react'
import IconifyIcon from 'app/app/components/ui/iconsbutton'
import Beneficiarycard from './beneficiarycard'
import SimpleBar from 'simplebar-react'
import Modal from 'app/app/components/ui/modal'
import Newfamilymemberforms from './newfamilymemberforms'
export interface IBeneficiariesProps {
  showNewFamilyMemberForm: boolean,
  setShowNewFamilyMemberForm: React.Dispatch<React.SetStateAction<boolean>>,
}
function Beneficiarieslist(props: IBeneficiariesProps) {
  const { showNewFamilyMemberForm, setShowNewFamilyMemberForm } = props
  return (
    <div className=' p-5'>
      <nav className=' bg-gray-50/70 p-5 rounded-md gap-5 shadow-light grid grid-cols-1 md:grid-cols-2 '>
        <nav className=' rounded-md flex gap-2  items-center md:border-r'>
          <IconifyIcon className=' !bg-blue-400 text-blue-100' icon='material-symbols:bookmark-outline' />
          <nav className=' flex flex-col gap-1'>
            <nav className=' text-sm text-blue-500 font-medium'>Sakoe</nav>
            <nav className=' text-sm text-gray-400 uppercase'>Family</nav>
          </nav>
        </nav>
        <nav className=' rounded-md flex gap-2  items-center '>
          <IconifyIcon className=' !bg-blue-400 text-blue-100' icon='material-symbols:bookmark-outline' />
          <nav className=' flex flex-col gap-1'>
            <nav className=' text-sm text-blue-500 font-medium'>Agbobloshie</nav>
            <nav className=' text-sm text-gray-400 uppercase'>Facility</nav>
          </nav>
        </nav>
        <nav className=' rounded-md flex gap-2 items-center md:border-r'>
          <IconifyIcon className=' !bg-blue-400 text-blue-100' icon='material-symbols:bookmark-outline' />
          <nav className=' flex flex-col gap-1'>
            <nav className=' text-sm text-blue-500 font-medium'>FNOF10000001</nav>
            <nav className=' text-sm text-gray-400 uppercase'>Subscription ID</nav>
          </nav>
        </nav>
        <nav className=' rounded-md flex gap-2 items-center'>
          <IconifyIcon className=' !bg-blue-400 text-blue-100' icon='material-symbols:bookmark-outline' />
          <nav className=' flex flex-col gap-1'>
            <nav className=' text-sm text-blue-500 font-medium'>Daily</nav>
            <nav className=' text-sm text-gray-400 uppercase'>Payment Frequency</nav>
          </nav>
        </nav>
      </nav>
      <nav className=' text-gray-400 mt-3 mb-2 font-medium'>
        Beneficiaries List (7 Members)
      </nav>
      <div className=' border rounded-md p-1 '>
        <div className="flex items-center justify-between mb-2 border-b">
          <input className=' p-3 mb-2 text-sm focus:border-gray-400 focus:outline-none rounded-md border ' placeholder='Search Beneficiary Name' type="text" name="" id="" />
          <button onClick={() => setShowNewFamilyMemberForm(true)} className=" border-gray-300 border rounded-md text-sm py-2 px-3  flex items-center flex-nowrap gap-1  bg-blue-50 text-blue-400 ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" /></svg>
            <span className=' whitespace-nowrap hidden lg:block'>Add Family Member</span>
          </button>
        </div>
        <SimpleBar className=' max-h-96'>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-2 '>
            {[...new Array(5)].map((ar, i) => <Beneficiarycard key={i} showNewFamilyMemberForm={showNewFamilyMemberForm} setShowNewFamilyMemberForm={setShowNewFamilyMemberForm} />)}
          </div>

        </SimpleBar>
      </div>
    </div>

  )
}

export default Beneficiarieslist