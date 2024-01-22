import React, { useState } from 'react'
import IconifyIcon from 'app/app/components/ui/iconsbutton'
import Beneficiarycard from './beneficiarycard'
import SimpleBar from 'simplebar-react'
import Modal from 'app/app/components/ui/modal'
import Newfamilymemberforms from './newcorporatememberforms'
export interface IBeneficiariesProps {
  showNewCorporateMemberForm: boolean,
  setShowNewCorporateMemberForm: React.Dispatch<React.SetStateAction<boolean>>,
  setShowFileUploadModal: React.Dispatch<React.SetStateAction<boolean>>,
}
function Beneficiarieslist(props: IBeneficiariesProps) {
  const { showNewCorporateMemberForm, setShowNewCorporateMemberForm,setShowFileUploadModal } = props
  return (
    <div >
      <nav className=' bg-gray-50/70 p-5 rounded-md gap-5 shadow-light grid grid-cols-1 md:grid-cols-2 '>
        <nav className=' rounded-md flex gap-2  items-center md:border-r'>
          <IconifyIcon className=' !bg-blue-400 text-blue-100' icon='material-symbols:bookmark-outline' />
          <nav className=' flex flex-col gap-1'>
            <nav className=' text-sm text-blue-500 font-medium'>Sakoe</nav>
            <nav className=' text-sm text-gray-400 uppercase'>Corporate Name</nav>
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
            <nav className=' text-sm text-gray-400 uppercase'>MID</nav>
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
      <nav className=' text-gray-400 mt-5 mb-3 font-medium'>
        Beneficiaries List (7 Members)
      </nav>

      <div className=' border rounded-md p-1 '>
        <div className="flex items-center justify-between mb-2 border-b">
          <input className=' p-3 mb-2 text-sm focus:border-gray-400 focus:outline-none rounded-md border ' placeholder='Search Beneficiary Name' type="text" name="" id="" />
          <nav className="flex items-center gap-1">

            <button onClick={() => setShowNewCorporateMemberForm(true)} className=" border-gray-300 border rounded-md text-sm py-2 px-3  flex items-center flex-nowrap gap-1  bg-blue-50 text-blue-400 ml-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" /></svg>
              <span className=' whitespace-nowrap hidden lg:block'>Add Member</span>
            </button>

            <button onClick={() => setShowFileUploadModal(true)} className=" border-gray-300 border rounded-md text-sm py-2 px-3  flex items-center flex-nowrap gap-1 bg-red-50 text-red-400 ml-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" /></svg>
              <span className=' whitespace-nowrap hidden lg:block'>Upload From CSV</span>
            </button>
          </nav>
        </div>

        <SimpleBar className=' max-h-52  '>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-2 '>
            {[...new Array(5)].map((ar, i) => <Beneficiarycard key={i} setShowFileUploadModal={setShowFileUploadModal} showNewCorporateMemberForm={showNewCorporateMemberForm} setShowNewCorporateMemberForm={setShowNewCorporateMemberForm} />)}
          </div>

        </SimpleBar>
      </div>
    </div>

  )
}

export default Beneficiarieslist