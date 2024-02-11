import React from 'react'
import Coporatesubscriptiontable from './partials/Corporatesubscriptionstable'
import { ISelectData, getBanksAsync, getFacilitiesAsync, getPackagesAsync } from 'app/app/fetch/getselectfieldsdata';


export async function GetFormSelectFieldData() {
  const fetchSelectFieldData = async () => {
      try {
          const [_facilities, _packages, _bank] = await Promise.all([getFacilitiesAsync(), getPackagesAsync(), getBanksAsync()]);
          return { facilities: _facilities.data, packages: _packages.data, banks: _bank.data };
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }
  const data = await fetchSelectFieldData();

  return data
}

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