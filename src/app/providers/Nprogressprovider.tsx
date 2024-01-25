'use client';
import react, { useEffect } from 'react'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import NProgress from 'nprogress';
import { RequestEvents } from '../fetch/apiEvent';
const Nprogressprovider = ({ children }: { children: React.ReactNode }) => {
    
    const startNProgressIndicator = () => {
        NProgress.done();
        NProgress.start();
        NProgress.set(0.3);
        NProgress.trickle();
    }
    const endNProgressIndicator = () => {
        NProgress.done();
    }

    useEffect(() => {
        window.addEventListener(RequestEvents.REQUEST_MADE_EVENT_CONSTANT, startNProgressIndicator);
        window.addEventListener(RequestEvents.REQUEST_COMPLETE_EVENT_CONSTANT, endNProgressIndicator);
        window.addEventListener(RequestEvents.REQUEST_ERROR_EVENT_CONSTANT, endNProgressIndicator);
        window.addEventListener(RequestEvents.REQUEST_CANCELLED_EVENT_CONSTANT, endNProgressIndicator);

        return () => {
            window.removeEventListener(RequestEvents.REQUEST_MADE_EVENT_CONSTANT, startNProgressIndicator);
            window.removeEventListener(RequestEvents.REQUEST_COMPLETE_EVENT_CONSTANT, endNProgressIndicator);
            window.removeEventListener(RequestEvents.REQUEST_ERROR_EVENT_CONSTANT, endNProgressIndicator);
            window.removeEventListener(RequestEvents.REQUEST_CANCELLED_EVENT_CONSTANT, endNProgressIndicator);
        }
    }, []);


    return (
        <>
            <ProgressBar
                height="5px"
                color="#4880FF"
                options={{ showSpinner: true }}
                shallowRouting
            />
            {children}
        </>
    );
};

export default Nprogressprovider;