import React from 'react'
import Coporatesubscriptiontable from './partials/Corporatesubscriptionstable'
import { GetFormSelectFieldData } from '../../familysubscription/familysubscribers/page'
import { ISelectData } from 'app/app/fetch/getselectfieldsdata'

async function page() {
  const selectData: Partial<ISelectData> = await GetFormSelectFieldData()

  return (
    <div className=' container mx-auto p-5'>
      <div className=' w-full mb-2 flex flex-col gap-2  md:flex-row p-5  items-center justify-between py-2'>
        <h1 className=' text-gray-500 font-medium text-lg flex items-center'>
          Setup Corporate Subscribers
        </h1>
      </div>
      <Coporatesubscriptiontable {...selectData} />
    </div>
  )
}

export default page