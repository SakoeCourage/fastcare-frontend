export class RequestEvents {
    static readonly REQUEST_MADE_EVENT_CONSTANT = 'api-request-made';
    static readonly REQUEST_CANCELLED_EVENT_CONSTANT = 'api-request-cancelled';
    static readonly REQUEST_ERROR_EVENT_CONSTANT = 'api-request-error';
    static readonly REQUEST_COMPLETE_EVENT_CONSTANT = 'api-request-complete';
    static readonly REQUEST_CALLBACK_URL_CONSTACT = 'location-callback-url';

    private static dispatchEvent = (eventConstant: string) => {
        const customEvent = new Event(eventConstant);
        if (typeof window !== 'undefined') {
            window.dispatchEvent(customEvent);
        }
    };

    static onRequestMadeEvent = () => {
        RequestEvents.dispatchEvent(RequestEvents.REQUEST_MADE_EVENT_CONSTANT);
    }

    static onRequestCancelledEvent = () => {
        RequestEvents.dispatchEvent(RequestEvents.REQUEST_CANCELLED_EVENT_CONSTANT);
    }

    static onRequestErrorEvent = () => {
        RequestEvents.dispatchEvent(RequestEvents.REQUEST_ERROR_EVENT_CONSTANT);
    }

    static onRequestCompleteEvent = () => {
        RequestEvents.dispatchEvent(RequestEvents.REQUEST_COMPLETE_EVENT_CONSTANT);
    }

}

