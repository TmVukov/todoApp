import { useState, FC } from 'react';
import './Signup.scss';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { database } from '../../firebase/config';
import firebase from 'firebase/app';
import Loader from '../../loader/Loader';
import { useForm } from 'react-hook-form';
import FormError from '../../formError/FormError';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Inputs {
  email: string;
  password: string;
  passwordConfirm: string;
}

toast.configure();

const SignUp: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onHandleSubmit = (data: Inputs) => {
    const { email, password, passwordConfirm } = data;

    if (password !== passwordConfirm) {
      return setError('Passwords do not match');
    }

    setLoading(true);

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        if (!resp.user) return;
        return database.collection('users').doc(resp.user.uid).set({
          email: email,
          id: resp.user.uid,
        });
      })
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

  const handleFacebookSubmit = () => {
    const provider = new firebase.auth.FacebookAuthProvider();

    auth
      .signInWithPopup(provider)
      .then((resp) => {
        if (!resp.user || !auth.currentUser) return;
        return database.collection('users').doc(resp.user.uid).set({
          email: auth.currentUser.email,
          id: resp.user.uid,
        });
      })
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
      });
  };

  return (
    <section>
      {loading ? (
        <Loader />
      ) : (
        <div className="signup__container">
          <h2>Sign Up</h2>
          <p>
            Or register with{' '}
            <button onClick={handleFacebookSubmit} className="fb__link">
              Facebook
            </button>
          </p>

          <form
            onSubmit={handleSubmit(onHandleSubmit)}
            className="signup__form"
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
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password should contain at least 6 characters',
                },
              })}
              type="password"
              placeholder="Enter password"
            />
            <FormError>
              {errors.password && <p>{errors.password.message}</p>}
            </FormError>

            <input
              {...register('passwordConfirm', {
                required: 'Password confirmation is required',
              })}
              type="password"
              placeholder="Confirm password"
            />
            <FormError>
              {error ? (
                <p>{error}</p>
              ) : errors.passwordConfirm ? (
                <p>{errors.passwordConfirm.message}</p>
              ) : (
                ''
              )}
            </FormError>

            <button>Submit</button>
          </form>

          <p>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      )}
    </section>
  );
};

export default SignUp;


