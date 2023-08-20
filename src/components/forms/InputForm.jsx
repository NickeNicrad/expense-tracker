import capitalizeFirstLetter from "@/functions/capitalizeFirstLetter"

function InputForm({ type, name, value, required, placeholder, onChange }) {
    return (
        <>
            {/* <label htmlFor={type}>
                {capitalizeFirstLetter(type)}
            </label> */}
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                required={required}
                className='form_input'
                placeholder={placeholder}
                onChange={onChange && onChange}
            />
        </>
    )
}

export default InputForm