const capitalizeFirstLetter = (text) => {
    if (text)
        return text?.charAt(0)?.toUpperCase() + text.slice(1);
}

export default capitalizeFirstLetter