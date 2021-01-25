import * as React from 'react';
import { Comment, Dimmer, Header, Loader } from 'semantic-ui-react';
import { fetchMessages, IMessage } from '../api/client';

interface IMessageFeedProps {
    channelName: string;
    shouldReload: boolean;
    setShouldReload: (shouldReload: boolean) => void;
}

export function MessageFeed(props: IMessageFeedProps) {
    const [messages, setMessages] = React.useState<Array<IMessage>>(
        new Array<IMessage>()
    );

    const [channelName, setChannelName] = React.useState<string>(
        props.channelName
    );

    const [isLoading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setChannelName(props.channelName);
    }, [props.channelName]);

    React.useEffect(() => {
        setLoading(true);
        getMessages();
    }, [channelName]);

    React.useEffect(() => {
        if (props.shouldReload) {
            getMessages();
        }
    }, [props.shouldReload]);

    const getMessages = () => {
        props.setShouldReload(false);
        fetchMessages(channelName)
            .then((response) => {
                setMessages(response.data.messages);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (isLoading) {
        return (
            <Dimmer active>
                <Loader size="massive" />
            </Dimmer>
        );
    }

    return (
        <Comment.Group>
            <Header as="h3" dividing>
                {props.channelName}
            </Header>
            {messages
                .slice()
                .reverse()
                .map((message: IMessage) => (
                    <Comment key={message.id}>
                        <Comment.Avatar
                            src={message.user.avatar || '/img/avatar.png'}
                        />
                        <Comment.Content>
                            <Comment.Author as="a">
                                {message.user.name}
                            </Comment.Author>
                            <Comment.Metadata>
                                <div>{message.date}</div>
                            </Comment.Metadata>
                            <Comment.Text>{message.body}</Comment.Text>
                        </Comment.Content>
                    </Comment>
                ))}
        </Comment.Group>
    );
}
