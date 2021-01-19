import * as React from 'react';
import { match } from 'react-router';
import { MessageFeed } from '../components';

interface IChannelMatch {
    channelName: string;
}

interface IChannelProps {
    match: match<IChannelMatch>;
}

export function Channel(props: IChannelProps) {
    const { channelName } = props.match.params;
    return <MessageFeed channelName={channelName} />;
}
