import React from 'react'
import { Input } from 'app/app/components/form-components/input'
import { Textarea } from 'app/app/components/form-components/textarea'
import Selectoption from 'app/app/components/form-components/selectoption'
import { Button } from 'app/app/components/form-components/button';
import Select2options from 'app/app/components/form-components/select2options';

function Newcorporatesubscriptionform() {
  return (
    <div className=' flex flex-col gap-5 p-10'>
      <nav className=' bg-white mt-5 rounded-md gap-5 shadow-light grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <nav className='border flex overflow-hidden truncate flex-col items-center gap-2 p-2 py-4 rounded-md shadow-sm'>
          <svg className=' text-green-600' xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 14 14"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M5 6.5a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5m-4.5 7h9v-.542A4.51 4.51 0 0 0 4.796 8.5A4.51 4.51 0 0 0 .5 12.958zm8.5-7a2.5 2.5 0 0 0 0-5m2.5 12h2v-.542A4.51 4.51 0 0 0 10 8.61" /></svg>
          <span className=' text-indigo-700 font-bold text-lg whitespace-nowrap'>Identification Number</span>
          <span className="mt-5 text-green-600 font-bold text-xl whitespace-nowrap  px-2 inline-block">
            {"..."}
          </span>
        </nav>

        <nav className='border flex overflow-hidden truncate flex-col items-center gap-2 p-2 py-4 rounded-md shadow-sm'>
          <svg className=' text-sky-700' xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><circle cx="24" cy="11" r="7" /><path d="M4 41c0-8.837 8.059-16 18-16m9 17l10-10l-4-4l-10 10v4z" /></g></svg>
          <span className=' text-indigo-700 font-bold text-lg whitespace-nowrap'>Corporate Name</span>
          <span className="mt-5 text-green-600 font-bold text-xl whitespace-nowrap  px-2 inline-block">
            {"..."}
          </span>
        </nav>
        <nav className='border flex overflow-hidden truncate flex-col items-center gap-2 p-2 py-4 rounded-md shadow-sm'>
          <svg className=' text-pink-700' xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 20"><path fill="currentColor" d="M11.5 7.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0M7 10.75V11a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-.25a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0-.75.75M4 4v12a2 2 0 0 0 2 2h9.5a.5.5 0 0 0 0-1H6a1 1 0 0 1-1-1h10a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2m10-1a1 1 0 0 1 1 1v11H5V4a1 1 0 0 1 1-1z" /></svg>
          <span className=' text-indigo-700 font-bold text-lg whitespace-nowrap'>Address</span>
          <span className="mt-5 text-green-600 font-bold text-xl whitespace-nowrap  px-2 inline-block">
            {"..."}
          </span>
        </nav>
        <nav className='border flex overflow-hidden truncate flex-col items-center gap-2 p-2 py-4 rounded-md shadow-sm'>
          <svg className=' text-orange-700' xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 28 28"><path fill="currentColor" d="M7 4.75A2.75 2.75 0 0 1 9.75 2h8.5A2.75 2.75 0 0 1 21 4.75v8.266a7.634 7.634 0 0 0-1.5.05V4.75c0-.69-.56-1.25-1.25-1.25h-8.5c-.69 0-1.25.56-1.25 1.25v18.5c0 .69.56 1.25 1.25 1.25h3.77l-.44 1.5H9.75A2.75 2.75 0 0 1 7 23.25V4.75ZM27 20.5a6.5 6.5 0 0 1-9.647 5.688l-2.717.791a.5.5 0 0 1-.62-.62l.795-2.713a6.5 6.5 0 1 1 12.19-3.146ZM18 19a.5.5 0 0 0 0 1h5a.5.5 0 1 0 0-1h-5Zm-.5 2.5a.5.5 0 0 0 .5.5h2.5a.5.5 0 1 0 0-1H18a.5.5 0 0 0-.5.5Z" /></svg>
          <span className=' text-indigo-700 font-bold text-lg whitespace-nowrap'>Contact</span>
          <span className="mt-5 text-green-600 font-bold text-xl whitespace-nowrap  px-2 inline-block">
            {"..."}
          </span>
        </nav>

        <nav className='border flex overflow-hidden truncate flex-col items-center gap-2 p-2 py-4 rounded-md shadow-sm'>
          <svg className=' text-purple-700' xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M12 1.25a4.75 4.75 0 1 0 0 9.5a4.75 4.75 0 0 0 0-9.5ZM8.75 6a3.25 3.25 0 1 1 6.5 0a3.25 3.25 0 0 1-6.5 0ZM12 12.25c-2.313 0-4.445.526-6.024 1.414C4.42 14.54 3.25 15.866 3.25 17.5v.102c-.001 1.162-.002 2.62 1.277 3.662c.629.512 1.51.877 2.7 1.117c1.192.242 2.747.369 4.773.369s3.58-.127 4.774-.369c1.19-.24 2.07-.605 2.7-1.117c1.279-1.042 1.277-2.5 1.276-3.662V17.5c0-1.634-1.17-2.96-2.725-3.836c-1.58-.888-3.711-1.414-6.025-1.414ZM4.75 17.5c0-.851.622-1.775 1.961-2.528c1.316-.74 3.184-1.222 5.29-1.222c2.104 0 3.972.482 5.288 1.222c1.34.753 1.961 1.677 1.961 2.528c0 1.308-.04 2.044-.724 2.6c-.37.302-.99.597-2.05.811c-1.057.214-2.502.339-4.476.339c-1.974 0-3.42-.125-4.476-.339c-1.06-.214-1.68-.509-2.05-.81c-.684-.557-.724-1.293-.724-2.601Z" clipRule="evenodd" /></svg>
          <span className=' text-indigo-700 font-bold text-lg whitespace-nowrap'>Agent</span>
          <span className="mt-5 text-green-600 font-bold text-xl whitespace-nowrap  px-2 inline-block">
            {"..."}
          </span>
        </nav>
      </nav>

      <div className=' grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <Selectoption
          required
          options={[

          ]} name='type' label='Package' placeholder='Select Package' />

        <Selectoption
          required
          options={[

          ]} name='type' label='Facility' placeholder='Select Facility' />

        <Input name='type' label='Number of Members' placeholder='Enter Number of Members' />

        <Input name='' label='Package Amount' placeholder='0.00' />

        <Selectoption
          options={[

          ]} name='type' label='Discount' placeholder='Select Discount(%)' />

        <Selectoption
          options={[

          ]} name='type' label='Payment Mode' placeholder='Select Payment Mode' />

        <Input name='' label='Amount to Debit' placeholder='0.00' />
        <Selectoption
          options={[

          ]} name='type' label='Frequency Of Auto Debit ' placeholder='Select... ' />

        <Selectoption
          options={[

          ]} name='type' label='MoMo Number ' placeholder='Select MoMo Number' />
        <Selectoption
          options={[

          ]} name='type' label='MoMo Network ' placeholder='Select MoMo Network' />


      </div>
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

export default Newcorporatesubscriptionform