import Form from 'react-bootstrap/Form';

type AppProps = {
    label : string;
    value : string;
}

export default function InputText(props : AppProps){
    
    return (
        <Form.Group >
              <Form.Label>{props.label}</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" defaultValue={props.value} />
        </Form.Group>
    )
}