import Form from 'react-bootstrap/Form';

type AppProps = {
    label : string;
    value : string;
}

export default function Textarea(props : AppProps){
    
    return (
        <Form.Group >
            <Form.Label>{props.label}</Form.Label>
            <Form.Control as="textarea" rows={3} defaultValue={props.value}></Form.Control>
        </Form.Group>
    )
}



