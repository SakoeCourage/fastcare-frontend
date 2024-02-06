import React from 'react'
import Individualandgroupsubtable from './partials/Individualandgroupsubtable'
import Api from 'app/app/fetch/axiosInstance';
import { AxiosResponse } from 'axios';
import { groupDTO, facilityDTO, packageDTO, bankDTO } from 'app/app/types/entitiesDTO';
import axios from 'axios';
import { cookies } from 'next/headers'

async function GetFormSelectFieldData() {

  const apiToken = cookies().get("apiToken")?.value
  axios.defaults.headers.common['Authorization'] = `Bearer ${apiToken}`;
  const getGroupAsync: () => Promise<AxiosResponse<IPaginatedData<groupDTO>>> = () => axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/groups`);
  const getFacilitiesAsync: () => Promise<AxiosResponse<IPaginatedData<facilityDTO>>> = () => axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/facilities`);
  const getPackagesAsync: () => Promise<AxiosResponse<IPaginatedData<packageDTO>>> = () => axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/packages`);
  const getBanksAsync: () => Promise<AxiosResponse<IPaginatedData<bankDTO>>> = () => Api.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/banks`);

  const fetchSelectFieldData = async () => {
    try {
      const [_groups, _facilities, _packages, _bank] = await Promise.all([getGroupAsync(), getFacilitiesAsync(), getPackagesAsync(), getBanksAsync()]);
      console.log(_groups, _facilities, _packages, _bank)
      return { groups: _groups.data, facilities: _facilities.data, packages: _packages.data, bank: _bank.data };
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const data = await fetchSelectFieldData();

  return data
}

async function page() {


  return (
    <div className=' container mx-auto p-5'>
      <div className=' w-full mb-2 flex flex-col gap-2  md:flex-row p-5  items-center justify-between py-2'>
        <h1 className=' text-gray-500 font-medium text-lg flex items-center'>
          Individual & Groups Subscription List
        </h1>
      </div>
      <Individualandgroupsubtable />
    </div>
  )
}



export default page