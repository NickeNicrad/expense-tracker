function Form({ title, type, children, handleSubmit }) {
    return (
        <section className='w-full max-w-full flex-center flex-col'>
            <h1 className='bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl text-center'>
                <span className='blue_gradient'>{type && type}</span>
            </h1>
            <p className='desc max-w-md'>
                {title && title}
            </p>
            <form
                onSubmit={handleSubmit && handleSubmit}
                className='mt-10 w-full max-2xl flex flex-col gap-7 glassmorphism'
            >
                {children}
            </form>
        </section>
    )
}

export default Form