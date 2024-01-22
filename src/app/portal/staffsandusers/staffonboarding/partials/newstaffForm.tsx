import React from 'react'
import { Input } from 'app/app/components/form-components/input'
import { Textarea } from 'app/app/components/form-components/textarea'
import Selectoption from 'app/app/components/form-components/selectoption'
import { Button } from 'app/app/components/form-components/button';
import Datepicker from 'app/app/components/form-components/datepicker';

function newstaffForm() {
    return (
        <div className=' max-w-2xl w-full flex flex-col gap-5 p-5 mx-auto'>
            <nav className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Input required name='' label='Staff Code' disabled placeholder='Auto Generated' />
                <Selectoption
                    required
                    options={[
                        {
                            key: "Mr",
                            value: "Mr"
                        },
                        {
                            key: "Mrs",
                            value: "Mrs"
                        },
                        {
                            key: "Miss",
                            value: "Miss"
                        },
                        {
                            key: "Dr",
                            value: "Dr"
                        },
                        {
                            key: "Prof",
                            value: "Prof"
                        },
                        {
                            key: "Hon",
                            value: "Hon"
                        }
                    ]} name='type' label='Title' placeholder='Title' />
                <Input required name='' label='First Name' placeholder='First Name' />
                <Input required name='' label='Last Name' placeholder='Last Name' />
                <Input required name='' label='Other Names Name' placeholder='Other Names Name' />
                <Selectoption
                    label='Gender'
                    placeholder='Select Gender'
                    options={[{
                        key: "Male",
                        value: "Male"
                    },
                    {
                        key: "Female",
                        value: "Female"
                    }]}
                    required
                />
                <Input name='' label='Phone' placeholder='(000) 0000 000' />
                <Input required name='' label='Nationality' placeholder='Nationality' />
                <Input required name='' label='Position' placeholder='Enter Position' />
                <Selectoption
                    label='Marital Status'
                    placeholder='Select Marital Status'
                    options={[
                        { key: "Single", value: "Single" },
                        { key: "Married", value: "Married" },
                        { key: "Divorced", value: "Divorced" }
                    ]}
                    required
                />
                <Input required name='' label='National ID' placeholder='National ID' />
                <Datepicker label='Date of Birth' placeholder='Date of Birth' />

            </nav>
            <nav className='flex items-center justify-end gap-3'>
                <Button variant='outline' size='sm'>
                    Cancel
                </Button>
                <Button variant='primary' size='sm'>
                    Save
                </Button>
            </nav>
        </div>
    )
}

export default newstaffForm