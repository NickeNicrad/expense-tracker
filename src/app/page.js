import Feed from '@/components/Feed'

function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className='bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl text-center'>
        Expense tracker
        <br className='max-md:hidden' />
        <span className='text-center'> Expense tracking made effortless</span>
      </h1>
      <p className='desc text-center'>
        Empower your financial journey with clarity, control and precision.
        Budgeting is a fundamental financial skill that helps you manage your money effectively, achieve your financial goals and maintain financial stability.
      </p>
      <Feed />
    </section>
  )
}

export default Home
