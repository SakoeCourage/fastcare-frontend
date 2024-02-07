
import React from 'react'
const Customcheckb: React.FC<{ onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, checked: boolean }> = (props) => {
    return (
        <div className="checkbox-wrapper-56">
            <label className="container">
                <input defaultChecked={props.checked} onChange={(e) => { props.onChange(e) }} type="checkbox" />
                <div className="checkmark"></div>
            </label>
        </div>
    )
}


export default Customcheckb;