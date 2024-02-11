import React from 'react'
import { getInitials } from 'app/app/lib/utils'
import classNames from 'classnames'

interface TableinitialsProps extends React.ComponentPropsWithoutRef<'div'> {
    address: string,
    name: string
}

function Tableinitials({ address, name, className, ...rest }: TableinitialsProps) {
    return (
        <div {...rest} className={classNames({
            "flex rounded-md items-center gap-2 w-full ": true,
            className: true
        })}>
            <nav className=' overflow-hidden h-12 w-12 shadow text-blue-500 font-medium rounded-full bg-blue-100 p-1 aspect-square uppercase flex items-center justify-center gap-1'>
                {getInitials(name)}
            </nav>
            <nav className='flex grow flex-col text-sm'>
                <h1 className=' font-medium text-gray-500'>{name}</h1>
                <h1 className=' font-thin'>{address}</h1>
            </nav>
        </div>
    )
}

export default Tableinitials