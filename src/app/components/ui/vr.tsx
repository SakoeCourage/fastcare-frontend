import React from 'react'

/**
 * Vertical Rule
 */
function Vr({className}:{className?:string}) {
    return (
        <nav className={`min-h-full bg-gray-200 rounded-md w-[1px] ${className}`}>
            &nbsp;
        </nav>
    )
}

export default Vr