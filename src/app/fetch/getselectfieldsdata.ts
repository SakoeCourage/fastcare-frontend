import { groupDTO,facilityDTO,packageDTO,bankDTO } from "../types/entitiesDTO";
import { AxiosResponse } from "axios";
import serverReq from "./axioserverinstace";

export interface ISelectData {
    groups: IPaginatedData<groupDTO>;
    facilities: IPaginatedData<facilityDTO>;
    packages: IPaginatedData<packageDTO>;
    banks: IPaginatedData<bankDTO>;
  }
  
const getGroupAsync: () => Promise<AxiosResponse<IPaginatedData<groupDTO>>> = () => serverReq.get(`/groups`);
const getFacilitiesAsync: () => Promise<AxiosResponse<IPaginatedData<facilityDTO>>> = () => serverReq.get(`/facilities`);
const getPackagesAsync: () => Promise<AxiosResponse<IPaginatedData<packageDTO>>> = () => serverReq.get(`/packages`);
const getBanksAsync: () => Promise<AxiosResponse<IPaginatedData<bankDTO>>> = () => serverReq.get(`/banks`);



export {getBanksAsync,getPackagesAsync,getFacilitiesAsync,getGroupAsync}    