import * as React from 'react';
import { match } from 'react-router';
import { MessageFeed, MessageForm } from '../components';

interface IChannelMatch {
    channelName: string;
}

interface IChannelProps {
    match: match<IChannelMatch>;
}

export function Channel(props: IChannelProps) {
    const { channelName } = props.match.params;
    const [shouldReload, setShouldReload] = React.useState(false);

    return (
        <>
            <MessageFeed
                shouldReload={shouldReload}
                setShouldReload={setShouldReload}
                channelName={channelName}
            />
            <MessageForm
                setShouldReload={setShouldReload}
                channelName={channelName}
            />
        </>
    );
}
