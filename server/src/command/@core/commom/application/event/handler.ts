import Event from '../../domain/building-blocks/event';

interface Handler {
    handlerEventName: string
    handle(event: Event): Promise<void>
};

export default Handler;
