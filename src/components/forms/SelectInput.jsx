import React from 'react'

function SelectInput({ name, value, placeholder, data=[], onChange }) {
    return (
        <select
            name={name && name}
            className='form_input'
            defaultValue={value && value}
            onChange={onChange && onChange}
        >
            <option value="" disabled>
                {placeholder && placeholder}
            </option>
            {data.length > 0 && data.map(item => (
                <option key={item?._id} value={item?._id}>
                    {item?.name} {item?.code && `(${item?.code})`} {item?.type?.name && `(${item?.type?.name})`}
                </option>
            ))}
        </select>
    )
}

export default SelectInput