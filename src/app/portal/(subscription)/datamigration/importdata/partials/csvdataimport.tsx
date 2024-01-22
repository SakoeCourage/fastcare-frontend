import React from 'react'
import Fileupload from 'app/app/components/ui/fileupload'
import Noticecard from 'app/app/components/ui/noticecard'
function csvdataimport() {
    return (
        <div className=' flex items-center flex-col justify-center gap-6 p-10'>
            <Fileupload maxNumber={1} acceptType={['text/csv']} />
        </div>
    )
}

export default csvdataimport