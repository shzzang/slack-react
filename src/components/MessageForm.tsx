import * as React from 'react';
import { Form, TextArea, Segment, Button } from 'semantic-ui-react';
import { postMessage } from '../api/client';

interface IMessageFormProps {
    channelName: string;
    setShouldReload: (shouldReload: boolean) => void;
}

export function MessageForm(props: IMessageFormProps) {
    const [body, setBody] = React.useState('');

    const handleTextAreaChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setBody(e.currentTarget.value);
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        postMessage(props.channelName, {
            body,
        })
            .then(() => {
                setBody('');
                props.setShouldReload(true);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <Segment basic textAlign="center">
            <Form onSubmit={handleFormSubmit}>
                <Form.Field>
                    <TextArea
                        placeholder="Write your message"
                        value={body}
                        onChange={handleTextAreaChange}
                    />
                </Form.Field>
                <Button primary type="submit">
                    Send
                </Button>
            </Form>
            <p>입력 중인 내용 : {body}</p>
        </Segment>
    );
}
