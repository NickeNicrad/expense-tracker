import '@/styles/globals.css'

import Nav from '@/components/Nav'

import SessProvider from '@/contexts/SessProvider'
import DataProvider from '@/contexts/DataProvider'
import AlertProvider from '@/contexts/AlertProvider'
import AlertCard from '@/components/cards/AlertCard'

export const metadata = {
  title: 'Expense Tracker',
  description: "Empower your financial journey with clarity, control and precision."
}

function Layout({children}) {
  return (
    <html lang='en'>
      <body>
        <DataProvider>
          <SessProvider>
            <AlertProvider>
              <div className='main'>
                <AlertCard />
                <div className='gradient' />
              </div>

              <main className='app'>
                <Nav />
                {children}
              </main>
            </AlertProvider>
          </SessProvider>
        </DataProvider>
      </body>
    </html>
  )
}

export default Layout