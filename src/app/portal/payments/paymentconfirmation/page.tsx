import React from 'react'
import Paymentconfirmationtable from './partial/Paymentconfirmationtable'
function page() {
  return (
    <div className=' container mx-auto p-5'>
    <div className=' w-full mb-2 flex flex-col gap-2  md:flex-row p-5  items-center justify-between py-2'>
      <h1 className=' text-gray-500 font-medium text-lg flex items-center'>
      Confirm Payment Received By Sales Executives
      </h1>
    </div>
    <Paymentconfirmationtable />
  </div>
  )
}

export default page