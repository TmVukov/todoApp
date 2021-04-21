import { FC } from 'react';
import './FormError.scss';

interface FormProps {
  children: any;
}

const FormError: FC<FormProps> = ({ children }) => {
  return <div className="error__container">{children}</div>;
};

export default FormError;
