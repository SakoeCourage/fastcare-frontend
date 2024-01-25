export class RequestEvents {

    static readonly REQUEST_MADE_EVENT_CONSTANT = 'api-request-made';
    static readonly REQUEST_CANCELLED_EVENT_CONSTANT = 'api-request-cancelled';
    static readonly REQUEST_ERROR_EVENT_CONSTANT = 'api-request-error';
    static readonly REQUEST_COMPLETE_EVENT_CONSTANT = 'api-request-complete';

    static onRequestMadeEvent = () => {
        const customEvent = new Event(this.REQUEST_MADE_EVENT_CONSTANT);
        window.dispatchEvent(customEvent);
    }

    static onRequestCancelledEvent = () => {
        const customEvent = new Event(this.REQUEST_CANCELLED_EVENT_CONSTANT);
        window.dispatchEvent(customEvent);
    }

    static onRequestErrorEvent = () => {
        const customEvent = new Event(this.REQUEST_ERROR_EVENT_CONSTANT);
        window.dispatchEvent(customEvent);
    }

    static onRequestCompleteEvent = () => {
        const customEvent = new Event(this.REQUEST_COMPLETE_EVENT_CONSTANT);
        window.dispatchEvent(customEvent);
    }
}

