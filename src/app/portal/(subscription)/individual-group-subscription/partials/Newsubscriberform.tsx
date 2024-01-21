import React from 'react'
import { Input } from 'app/app/components/form-components/input'
import Datepicker from 'app/app/components/form-components/datepicker'
import Selectoption from 'app/app/components/form-components/selectoption'
import Fileupload from 'app/app/components/ui/fileupload'
import { Button } from 'app/app/components/form-components/button'

function Newsubscriberform() {
    return (
        <div className=' grid grid-cols-1 lg:grid-cols-2  gap-4 p-2'>
            {/* First Section Begins here */}
            <div className=' col-span-1 lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-5'>
                <div className=' grid grid-cols-1 gap-5 !bg-white pb-10 h-max pt-5 px-5 rounded-md border'>
                    <nav className=' flex items-center !gap-1 border-b pb-3 !px-0 font-semibold text-gray-500'>
                        <span> ID Card Selection</span>
                    </nav>
                    <nav className=' grid-cols-1 grid gap-5'>
                        <Selectoption
                            label='ID Type'
                            placeholder='Select ID Type'
                            options={[
                                { key: "Voters ID", value: "Voters ID" },
                                { key: "National ID", value: "National ID" },
                                { key: "Passport", value: "Passport" },
                                { key: "Drivers License", value: "Drivers License" },
                            ]} />
                        <Input
                            label="ID Number"
                            name=""
                            placeholder="Enter ID Number"
                        />
                    </nav>
                </div>
                <div className=' grid grid-cols-1 gap-5 !bg-white  h-max pt-2 pb-2 px-5 rounded-md border'>
                    <nav className=' flex items-center !gap-1 border-b pb-3 !px-0 font-semibold text-gray-500'>
                        <span> Client Picture</span>
                    </nav>
                    <nav className=' grid-cols-1 grid h-48 w-20 '>
                        <Fileupload maxNumber={1} acceptType={['image/jpeg', 'image/jpeg', 'image/png']} />
                    </nav>
                </div>

            </div>

            {/* Second section */}
            <div className='col-span-1  lg:col-span-2 '>
                <div className=' w-full border rounded-md p-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid gap-5'>
                    <Input
                        label="MID"
                        name=""
                        disabled
                        placeholder="Auto Generated"
                    />
                    <Input
                        label="First Name"
                        name=""
                        required
                        placeholder="Enter First Name"
                    />
                    <Input
                        label="Other Names"
                        name=""

                        placeholder="Enter Other Names"
                    />
                    <Input
                        label="Last Name"
                        name=""
                        required
                        placeholder="Enter Last Name"
                    />
                    <Datepicker
                        label="Date of Birth"
                        name=""
                        placeholder="Enter Date of Birth"
                    />
                    <Selectoption
                        label='Gender'
                        placeholder='Select Gender'
                        options={[
                            { key: "Male", value: "Male" },
                            { key: "Female", value: "Female" }
                        ]} />
                    <Input
                        label="Occupation"
                        name=""
                        required
                        placeholder="Enter Occupation"
                    />
                    <Selectoption
                        label='Marital Status'
                        placeholder='Select Marital Status'
                        options={[
                            { key: "Voters ID", value: "Voters ID" },
                            { key: "National ID", value: "National ID" },
                            { key: "Passport", value: "Passport" },
                            { key: "Drivers License", value: "Drivers License" },
                        ]} />
                    <Input
                        label="Address"
                        name=""
                        required
                        placeholder="Enter Address"
                    />
                    <Input
                        label="Contact"
                        name=""
                        required
                        placeholder="Enter Contact"
                    />
                    <Input
                        label="Land Mark"
                        name=""
                        required
                        placeholder="Enter Land Mark"
                    />
                    <Selectoption
                        label='Facility'
                        placeholder='Select Facility'
                        options={[

                        ]} />
                    <Selectoption
                        required
                        label='Staff'
                        placeholder='Select Staff'
                        options={[

                        ]} />
                    <Input
                        label="EMG. Person"
                        name=""
                        required
                        placeholder="Enter EMG. Person"
                    />
                    <Input
                        label="EMG Phone"
                        name=""
                        required
                        placeholder="Enter EMG Phone"
                    />

                    <Selectoption
                        label='Package'
                        required
                        placeholder='Select Package'
                        options={[
                            { key: "Fast Care Premium", value: "Fast Care Premium" },

                        ]} />

                    <Selectoption
                        label='NHIS'
                        required
                        placeholder='Select an option'
                        options={[
                            { key: "Yes", value: "Yes" },
                            { key: "No", value: "No" }
                        ]} />

                    <Selectoption
                        label='Debit Consent ?'

                        placeholder='Select an option'
                        options={[
                            { key: "Yes", value: "Yes" },
                            { key: "No", value: "No" }
                        ]} />

                    <Selectoption
                        required
                        label='Frequency'
                        placeholder='Select Frequency'
                        options={[
                            { key: "Daily", value: "Daily" },
                            { key: "Monthly", value: "Monthly" },
                            { key: "Weekly", value: "Weekly" },
                        ]} />

                    <Selectoption
                        label='Payment Mode'
                        required
                        placeholder='Select Payment Mode'
                        options={[
                            { key: "Cash", value: "Cash" },
                            { key: "MoMo", value: "MoMo" },
                        ]} />

                    <Selectoption
                        label='MoMo Network'
                        required
                        placeholder='Select MoMo Network'
                        options={[
                            { key: "MTN", value: "MTN" },
                            { key: "VODAFONE", value: "VODAFONE" },
                            { key: "AIRTELTIGO", value: "AIRTEL TIGO" },
                        ]} />
                    <Input
                        label="MoMo Number"
                        name=""
                        required
                        placeholder="Enter MoMo Number"
                    />

                    <Selectoption
                        required
                        label='Discount'
                        placeholder='Select Discount (%)'
                        options={[

                        ]} />

                    <Selectoption
                        label='Ass. / Group'
                        placeholder='Select Ass. / Group'
                        options={[

                        ]} />
                    <Input
                        label="Amount (GHC)"
                        name=""
                        required
                        placeholder="0.00"
                    />
                 
                </div>

            </div>
            <nav className='col-span-1  lg:col-span-2 flex items-center justify-end gap-3'>
                <Button variant='outline' size='md'>
                    Cancel
                </Button>
                <Button variant='primary' size='md'>
                    Save and Pay
                </Button>
            </nav>
        </div>



    )
}

export default Newsubscriberform