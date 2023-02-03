import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import Background from '../../components/Layouts/Background';
import Container from '../../components/Layouts/Container';
import { UserAuth } from '../../context/AuthContext';
import * as Yup from 'yup';
import FormInput from '../../components/Assets/FormInput';
import Button from '../../components/Assets/Button';
import Message from '../../components/Assets/Message';
import { useRouter } from 'next/router';

interface LoginProps {
  email: string;
  password: string;
}

const Index = () => {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const { signIn, user } = UserAuth();
  const { push } = useRouter();

  const initialValues = {
    email: '',
    password: '',
  };

  useEffect(() => {
    user && push('/admin/interface');
  }, []);

  const LoginSchema = Yup.object().shape({
    password: Yup.string().required('Vyžadováno'),
    email: Yup.string().email('Neplatná emailová adresa!').required('Vyžadováno'),
  });

  const signInUser = async ({ password, email }: LoginProps): Promise<boolean> => {
    try {
      setError(false);
      setMessage('');
      await signIn(email, password);
      return true;
    } catch (error: any) {
      if (
        error.code === 'auth/invalid-email' ||
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/user-not-found'
      ) {
        setError(true);
        setMessage('Neplatný email nebo heslo.');
      } else {
        setError(true);
        setMessage('Neznámá chyba. Zkuste to prosím později.');
      }
      return false;
    }
  };

  return (
    <Background>
      <Container customStyles="sharedLayout">
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            const res = await signInUser(values);
            res && push('/admin/interface');
          }}
          validationSchema={LoginSchema}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-5 min-h-screen">
              <h1 className="title">Přihlásit se</h1>
              <FormInput name="email" label="Emailová adresa:" placeholder="tvujemail@seznam.cz" />
              <FormInput name="password" type="password" label="Heslo:" placeholder="****" />
              {!!message && <Message isError={error} text={message} />}
              <Button
                customStyles="lg:max-w-[300px]"
                isSubmit
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                <>Přihlásit se</>
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </Background>
  );
};

export default Index;
