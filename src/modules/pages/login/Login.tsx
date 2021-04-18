import { useState, FC } from 'react';
import './Login.scss';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase/config';
import Loader from '../../loader/Loader';
import { useForm } from 'react-hook-form';
import FormError from '../../formError/FormError';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Inputs {
  email: string;
  password: string;
}

toast.configure();

const LogIn: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onHandleSubmit = (data: Inputs) => {
    const { email, password } = data;

    setLoading(true);

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push('/');
      })
      .catch((err) => {
        toast.error(err.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
          className: 'Toastify__toast--error',
          bodyClassName: 'Toastify__close-button',
        });
        setLoading(false);
      }); 
  };

  return (
    <section>
      {loading ? (
        <Loader />
      ) : (
        <div className="login__container">
          <h2>Log In</h2>

          <form
            onSubmit={handleSubmit(onHandleSubmit)}
            className="login__form"
            noValidate
          >
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Please enter valid email',
                },
              })}
              type="email"
              placeholder="Enter email"
            />
            <FormError>
              {errors.email && <p>{errors.email.message}</p>}
            </FormError>

            <input
              {...register('password', {
                required: 'Password is required'
              })}
              type="password"
              placeholder="Enter password"
            />
            <FormError>
              {errors.password && <p>{errors.password.message}</p>}
            </FormError>

            <button>Submit</button>
          </form>

          <p>
            Need an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      )}
    </section>
  );
};

export default LogIn;
