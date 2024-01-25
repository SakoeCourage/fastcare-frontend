"use client"
import './globals.css'
import 'simplebar-react/dist/simplebar.min.css';
import Nprogressprovider from './providers/Nprogressprovider';
import Toastserviceprovider from './providers/Toastserviceprovider';
import Sidebarserviceprovider from './providers/Sidebarserviceprovider';


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

  
    return (
        <html lang="en">
            <body className='overflow-hidden w-full'>
                <Nprogressprovider>
                    <Toastserviceprovider>
                        <Sidebarserviceprovider>
                            {children}
                        </Sidebarserviceprovider>
                    </Toastserviceprovider>
                </Nprogressprovider>
            </body>
        </html>
    )
}