"use client"
import './globals.css'
import 'simplebar-react/dist/simplebar.min.css';
import Nprogressprovider from './providers/Nprogressprovider';
import Toastserviceprovider from './providers/Toastserviceprovider';
import Sidebarserviceprovider from './providers/Sidebarserviceprovider';
import Nextsessionprovider from './providers/Nextsessionprovider';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
            <body className='overflow-hidden w-full'>
                <Nextsessionprovider>
                    <Nprogressprovider>
                        <Toastserviceprovider>
                            <Sidebarserviceprovider>
                                {children}
                            </Sidebarserviceprovider>
                        </Toastserviceprovider>
                    </Nprogressprovider>
                </Nextsessionprovider>

                {/* ----------------- Preloader starts here ---------------- */}
                {/* <div className="preloader"
                    style={{
                        zIndex: "100",
                        position: "relative",
                        inset: "0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        justifyItems: "center",
                        height: "100vh",
                        width: "100vw",
                        overflow: "hidden"
                    }}>
                    <div style={{ display: "flex", alignItems: 'center', gap: "1.5rem" }}>
                        <svg style={{
                            transition: 'transform 0.8s ease-in-out infinite',
                            color: "red",
                            transform: `rotate(360deg)`,
                        }} width="66" height="69" viewBox="0 0 66 69" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30.3825 1.61749C28.9836 3.01639 28.765 3.40984 28.9836 4.76503C29.071 5.63934 29.9454 8 30.9508 10.0546C31.9126 12.1093 32.7869 14.1639 32.8743 14.6448C33.0492 15.388 33.1366 15.3443 33.6612 14.2077C33.9672 13.4645 34.8415 11.4973 35.6284 9.83607C36.4153 8.13115 37.1585 6.3388 37.3333 5.77049C38.0765 3.40984 35.5847 7.49558e-07 33.0929 7.49558e-07C32.4809 7.49558e-07 31.388 0.655738 30.3825 1.61749Z" fill="currentColor" />
                            <path d="M32.1749 25.9672C31.1694 29.071 29.071 31.4317 26.0547 32.7869C24.7432 33.3989 23.6066 33.9672 23.6066 34.0984C23.6066 34.2295 24.3935 34.6667 25.3552 35.1038C26.317 35.4973 27.8907 36.5464 28.8525 37.4208C30.5574 38.9508 32.7869 42.8852 32.7869 44.459C32.8306 44.8962 33.3989 44.1093 34.0984 42.6667C35.5847 39.6066 38.9071 36.1093 41.3115 35.0164L43.0601 34.2295L40.9618 33.224C38.2077 31.9126 34.8415 28.1967 34.0984 25.6175C33.7924 24.5246 33.3989 23.6066 33.2241 23.6066C33.0492 23.6066 32.5683 24.6557 32.1749 25.9672Z" fill="currentColor" />
                            <path d="M3.06011 30.2951C2.44809 30.6011 1.70492 31.388 1.39891 32.0437C1.0929 32.6995 0.655738 33.224 0.393443 33.224C0.174863 33.224 0 33.7049 0 34.3169C0 34.929 0.218579 35.4098 0.437158 35.4098C0.699454 35.4098 1.13661 35.8907 1.39891 36.5027C1.6612 37.1148 2.14208 37.5956 2.4918 37.5956C2.79781 37.5956 3.06011 37.7705 3.06011 38.0328C3.06011 38.2514 3.54098 38.5574 4.15301 38.7322C4.89617 38.9071 6.51366 38.3388 10.0109 36.6339C14.4262 34.4918 15.6503 33.6612 14.3388 33.6612C14.0765 33.6612 12.3279 32.8743 10.5355 31.9563C6.60109 29.9454 4.59016 29.4645 3.06011 30.2951Z" fill="currentColor" />
                            <path d="M56.306 31.8251C53.9453 32.9618 52.0219 33.9672 52.0219 34.0984C52.0219 34.2295 52.765 34.6667 53.6831 35.1038C54.5574 35.4973 56.5683 36.5465 58.1421 37.3771C61.4208 39.1694 62.5137 39.1257 64.3934 37.1148C66.4044 34.9727 65.7923 31.6503 63.1694 30.3825C62.3825 30.0328 61.4645 29.7268 61.1147 29.7268C60.8087 29.7268 58.6229 30.6885 56.306 31.8251Z" fill="currentColor" />
                            <path d="M32.612 54.2076C32.4809 54.9945 31.6065 57.0929 30.7322 58.929C27.9344 64.5683 28.6339 67.9344 32.6557 68.5027C34.2295 68.7213 34.6229 68.5464 36.1093 67.1913C38.2514 65.2678 38.2514 63.7377 36.153 59.847C35.3224 58.2732 34.4044 56.2186 34.0983 55.2568C33.3552 52.8962 32.9617 52.5902 32.612 54.2076Z" fill="currentColor" />
                        </svg>
                        <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                            <nav style={{ fontSize: "2.4rem", fontFamily: "serif", color: "#2563eb" }}>FastCare</nav>
                            <nav style={{ alignSelf: "flex-end", color: '#f43f5e', fontSize: "1rem", fontWeight: "normal" }}>Clinics</nav>
                        </nav>
                    </div>
                </div> */}
                {/* ----------------- Preloader ends here ---------------- */}
            </body>

        </html>
    )
}