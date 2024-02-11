import React from 'react'
import IconifyIcon from 'app/app/components/ui/IconifyIcon'
import { IBeneficiariesProps } from './Corporatebeneficiarieslist'
import Moretableoptions from 'app/app/components/datatable/moretableoptions'
import { corporateBeneficiaryDTO } from 'app/app/types/entitiesDTO'
import Modal from 'app/app/components/ui/modal'
import Tableinitials from 'app/app/components/datatable/partials/tableinitials'

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
            <Tableinitials name={beneficiaryData.name} address={beneficiaryData.contact} />
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