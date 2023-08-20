function TextAreaForm({ value, required, placeholder, onChange }) {
    return (
        <textarea
            value={value}
            required={required}
            className='form_textarea'
            placeholder={placeholder}
            onChange={onChange && onChange}
        >
        </textarea>
    )
}

export default TextAreaForm