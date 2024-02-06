import { ToastOptions } from 'react-hot-toast';
export const infoOptions: ToastOptions = {
    style: {
        background: '#eff6ff',
        color: '#3b82f6',
    },
    className: '',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8q0-.425-.288-.712T12 7q-.425 0-.712.288T11 8q0 .425.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22" /></svg>,
    iconTheme: {
        primary: '#000',
        secondary: '#fff',
    },
    ariaProps: {
        role: 'status',
        'aria-live': 'polite',
    }
}

export const successOptions: ToastOptions = {
    style: {
        background: '#f0fdf4',
        color: '#22c55e',
    },
    className: '',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z" /></svg>,
    iconTheme: {
        primary: '#000',
        secondary: '#fff',
    },
    ariaProps: {
        role: 'status',
        'aria-live': "assertive",
    }
}

export const errorOptions: ToastOptions = {
    style: {
        background: '#fef2f2',
        color: '#ef4444',
    },
    className: '',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" strokeLinecap="round" strokeLinejoin="round" stroke-width="2"><path d="M0 0h24v24H0z" /><path fill="currentColor" d="M17 3.34a10 10 0 1 1-14.995 8.984L2 12l.005-.324A10 10 0 0 1 17 3.34m-6.489 5.8a1 1 0 0 0-1.218 1.567L10.585 12l-1.292 1.293l-.083.094a1 1 0 0 0 1.497 1.32L12 13.415l1.293 1.292l.094.083a1 1 0 0 0 1.32-1.497L13.415 12l1.292-1.293l.083-.094a1 1 0 0 0-1.497-1.32L12 10.585l-1.293-1.292l-.094-.083z" /></g></svg>,
    iconTheme: {
        primary: '#000',
        secondary: '#fff',
    },
    ariaProps: {
        role: 'status',
        'aria-live': "assertive",
    }
}
export const warningOption: ToastOptions = {
    style: {
        background: '#fff7ed',
        color: '#ea580c',
    },
    className: '',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256m0 512a51.2 51.2 0 1 0 0-102.4a51.2 51.2 0 0 0 0 102.4" /></svg>,
    iconTheme: {
        primary: '#000',
        secondary: '#fff',
    },
    ariaProps: {
        role: 'status',
        'aria-live': "assertive",
    }
}


