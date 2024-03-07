import React from 'react'
import Makepaymenttable from './partials/Makepaymenttable'
import { ISelectData, getBanksAsync, getPackagesAsync } from 'app/app/fetch/getselectfieldsdata';


async function GetFormSelectFieldData() {
  const fetchSelectFieldData = async () => {
    try {
      const [_packages, _bank] = await Promise.all([ getPackagesAsync(), getBanksAsync()]);
      return {  packages: _packages.data, banks: _bank.data };
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
        Premium Payments List
      </h1>
    </div>
    <Makepaymenttable {...selectData} />
  </div>
  )
}

export default page