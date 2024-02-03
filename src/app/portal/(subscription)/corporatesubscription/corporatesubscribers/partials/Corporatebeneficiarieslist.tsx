import React, { useEffect, useState } from 'react'
import IconifyIcon from 'app/app/components/ui/iconsbutton'
import Corporatebeneficiarycard from './Corporatebeneficiarycard'
import SimpleBar from 'simplebar-react'
import Modal from 'app/app/components/ui/modal'
import { corporateBeneficiaryDTO, corporateSubscriberDTO } from 'app/app/types/entitiesDTO'
import Api from 'app/app/fetch/axiosInstance'
import { AxiosResponse } from 'axios';

export interface IBeneficiariesProps {
  corporateData: corporateSubscriberDTO
  currentBeneficiaryData: IFormWithDataProps<corporateBeneficiaryDTO>
  setcurrentBeneficiary: React.Dispatch<React.SetStateAction<corporateBeneficiaryDTO | null>>
  setShowBeneficiaryForm: React.Dispatch<React.SetStateAction<boolean>>
  fetchCorporateData: () => void;
}

function Corporatebeneficiarieslist(props: IBeneficiariesProps) {
  const { corporateData, currentBeneficiaryData, setcurrentBeneficiary, setShowBeneficiaryForm, fetchCorporateData } = props
  const [familyApiData, setFamilyApiData] = useState<corporateSubscriberDTO | null>(null)

  useEffect(() => {
    fetchCorporateData()
  }, [])

  return (
    <div className=' p-5'>
      <nav className=' bg-gray-50/70 p-5 rounded-md gap-5 shadow-light grid grid-cols-1 md:grid-cols-2 '>
        <nav className=' rounded-md flex gap-2  items-center md:border-r'>
          <IconifyIcon className=' !bg-blue-400 text-blue-100' icon='material-symbols:bookmark-outline' />
          <nav className=' flex flex-col gap-1'>
            <nav className=' text-sm text-blue-500 font-medium'>{corporateData?.name}</nav>
            <nav className=' text-sm text-gray-400 uppercase'>Coporate</nav>
          </nav>
        </nav>
        <nav className=' rounded-md flex gap-2  items-center '>
          <IconifyIcon className=' !bg-blue-400 text-blue-100' icon='material-symbols:bookmark-outline' />
          <nav className=' flex flex-col gap-1'>
            <nav className=' text-sm text-blue-500 font-medium'>{corporateData?.corporateMembershipID}</nav>
            <nav className=' text-sm text-gray-400 uppercase'>Membership ID</nav>
          </nav>
        </nav>

      </nav>
      <nav className=' text-gray-400 mt-3 mb-2 font-medium'>
        Beneficiaries List ({corporateData?.beneficiaries?.length} Members)
      </nav>
      <div className=' border rounded-md p-1 '>
        <div className="flex items-center justify-between mb-2 border-b">
          <input className=' p-3 mb-2 text-sm focus:border-gray-400 focus:outline-none rounded-md border ' placeholder='Search Beneficiary Name' type="text" name="" id="" />
          <button onClick={() => setShowBeneficiaryForm(true)} className=" border-gray-300 border rounded-md text-sm py-2 px-3  flex items-center flex-nowrap gap-1  bg-blue-50 text-blue-400 ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" /></svg>
            <span className=' whitespace-nowrap hidden lg:block'>Add Beneficiary</span>
          </button>
        </div>
        <SimpleBar className=' max-h-96'>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-2 '>
            {corporateData?.beneficiaries?.map((beneficiary, i) => <Corporatebeneficiarycard
              setShowBeneficiaryForm={setShowBeneficiaryForm}
              setcurrentBeneficiary={setcurrentBeneficiary}
              currentBeneficiaryData={currentBeneficiaryData}
              beneficiaryData={beneficiary} key={i}
            />)}
          </div>
        </SimpleBar>
      </div>
    </div>

  )
}

export default Corporatebeneficiarieslist