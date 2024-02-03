import React from 'react'
import IconifyIcon from 'app/app/components/ui/iconsbutton'
import { IBeneficiariesProps } from './Corporatebeneficiarieslist'
import Moretableoptions from 'app/app/components/datatable/moretableoptions'
import { corporateBeneficiaryDTO } from 'app/app/types/entitiesDTO'
import Modal from 'app/app/components/ui/modal'

interface IFamilyBenProp {
    beneficiaryData: corporateBeneficiaryDTO,
    currentBeneficiaryData: IFormWithDataProps<corporateBeneficiaryDTO>
    setShowBeneficiaryForm: React.Dispatch<React.SetStateAction<boolean>>
    setcurrentBeneficiary: React.Dispatch<React.SetStateAction<corporateBeneficiaryDTO | null>>
}

function Corporatebeneficiarycard(props: IFamilyBenProp) {
    const { beneficiaryData, currentBeneficiaryData, setShowBeneficiaryForm, setcurrentBeneficiary } = props

    return <>
        <div className='flex bg-gray-50/60 p-2 rounded-md border items-center gap-2 w-full relative'>
            <nav className=' h-12 w-12 shadow text-blue-500 font-medium rounded-full bg-blue-100 uppercase p-1 aspect-square flex items-center justify-center gap-1'>
                {beneficiaryData?.name
                    .split(" ")
                    .map(name => name.charAt(0))
                    .join("")
                }
            </nav>
            <nav className='flex grow flex-col text-sm'>
                <h1 className=' font-medium text-gray-500'>{beneficiaryData?.name}</h1>
                <h1 className=' font-thin'>{beneficiaryData?.contact}</h1>
            </nav>
            <nav className=' text-xs absolute right-0 p-2 bg-gray-100 inset-y-0 flex  items-center justify-center'>
                <Moretableoptions options={[{
                    optionName: "Edit",
                    icon: "bitcoin-icons:edit-outline",
                    theme: "primary",
                    onOptionSelected: () => { setcurrentBeneficiary(beneficiaryData); setShowBeneficiaryForm(true) }
                },
                {
                    optionName: "Remove",
                    icon: "iconamoon:sign-times-thin",
                    theme: "danger",
                    onOptionSelected: () => void (0)
                }
                ]} />

            </nav>
        </div>
    </>
}

export default Corporatebeneficiarycard