import { FC , useState} from 'react';
import Toast from 'react-bootstrap/Toast';

const Notify: FC<{message:string}> = ({message}) => {
    const [show, setShow] = useState(false);
  return (
    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}

export default Notify;