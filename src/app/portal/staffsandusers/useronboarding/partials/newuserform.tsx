"use client"
import React, { useEffect, useState } from 'react'
import { Input } from 'app/app/components/form-components/input'
import { Textarea } from 'app/app/components/form-components/textarea'
import Selectoption from 'app/app/components/form-components/selectoption'
import { Button } from 'app/app/components/form-components/button';
import Datepicker from 'app/app/components/form-components/datepicker';
import { userDTO, roleDTO, facilityDTO, staffDTO } from 'app/app/types/entitiesDTO'
import useForm from 'app/app/hooks/formHook/useForm'
import { toastnotify } from 'app/app/providers/Toastserviceprovider'
import { z } from 'zod'
import Api from 'app/app/fetch/axiosInstance'
import { AxiosResponse } from 'axios'
import Select2options from 'app/app/components/form-components/select2options'

function Newuserform(props: IFormWithDataProps<userDTO>) {
    const [facilities, setFacilities] = useState<IPaginatedData<facilityDTO> | null>(null)
    const [roles, setRoles] = useState<IPaginatedData<roleDTO> | null>(null)
    const [staffs, setStaffs] = useState<IPaginatedData<staffDTO> | null>(null)
    const { formData, onCancel, onNewDataSucess } = props
    const { post, patch, data, errors, setData, setValidation } = useForm<Partial<userDTO>>(formData ?
        {
            ...formData,
            roleId: formData.role && formData.role.id,
            staffDbId: formData.staff && formData.staff.id,
            facilityId: formData.facility && formData.facility.id
        } : {})

    setValidation({
        username: z.string().min(1, "This Field Is Required"),
        email: z.string().min(1, "This Field Is Required").email(),
        roleId: z.number().min(1, "This Field Is Required"),
        facilityId: z.number().min(1, "This Field Is Required"),
        staffDbId: z.number().min(1, "This Field Is Required")
    })

    const getFacilitiesAsync: () => Promise<AxiosResponse<IPaginatedData<facilityDTO>>> = () => Api.get("/facilities");
    const getRolesAsync: () => Promise<AxiosResponse<IPaginatedData<roleDTO>>> = () => Api.get("/roles");
    const getStaffsAsync: () => Promise<AxiosResponse<IPaginatedData<staffDTO>>> = () => Api.get("/staff");

    const fetchSelectFieldData = async () => {
        try {
            const [_facilities, _roles, _staffs] = await Promise.all([getFacilitiesAsync(), getRolesAsync(), getStaffsAsync()]);
            setRoles(_roles.data)
            setFacilities(_facilities.data)
            setStaffs(_staffs.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleSubmit = () => {
        if (formData?.id) {
            patch("/users/" + formData.id, { onSuccess: () => { toastnotify("User Updated Successfully", "Success"); onNewDataSucess() } })
        } else {
            post("/users", { onSuccess: () => { toastnotify("User Created Successfully", "Success"); onNewDataSucess() } })
        }
    }

    useEffect(() => {
        fetchSelectFieldData();
    }, [])
    useEffect(() => {
        console.log(formData)
    }, [formData])



    return (
        <div className=' max-w-2xl w-full flex flex-col gap-5 p-5 mx-auto'>
            <nav className='grid grid-cols-1  gap-4'>
                <Input
                    error={errors?.username}
                    value={data?.username}
                    onChange={(e) => setData("username", e.target.value)}
                    required name=''
                    label='Username'
                    placeholder='Enter username'
                />
                <Input
                    error={errors?.email}
                    value={data?.email}
                    onChange={(e) => setData("email", e.target.value)}
                    required name=''
                    label='Email'
                    placeholder='example@email.com'
                />
                <Selectoption
                    required
                    label='Staff'
                    placeholder='Select Staff'
                    enableSearch={true}
                    searchPlacholder='Search Staff Name'
                    value={data?.staffDbId}
                    onValueChange={(e) => setData("staffDbId", e)}
                    error={errors?.staffDbId}
                    options={staffs
                        ? staffs.data.map((n) => ({
                            key: `${n.firstName} ${n.lastName}`,
                            value: n.id,
                        }))
                        : []}
                />

                <Selectoption
                    error={errors?.roleId}
                    value={data?.roleId}
                    onValueChange={(e) => setData("roleId", e)}
                    label='Role'
                    placeholder='Select Role'
                    options={roles ? [...Object.entries(roles.data).map(entry => { return { key: entry[1].name, value: entry[1].id } })] : []}
                    required
                />
                <Selectoption
                    error={errors?.facilityId}
                    value={data?.facilityId}
                    onValueChange={(e) => setData("facilityId", e)}
                    label='Facility'
                    placeholder='Select Facility'
                    options={facilities ? [...Object.entries(facilities.data).map(entry => { return { key: entry[1].name, value: entry[1].id } })] : []}
                    required
                />

            </nav>
            <nav className='flex items-center justify-end gap-3'>
                <Button onClick={onCancel} variant='outline' size='sm'>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant='primary' size='sm'>
                    Save
                </Button>
            </nav>
        </div>
    )
}

export default Newuserform