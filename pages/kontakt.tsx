import { Form, Formik } from 'formik';
import React from 'react';
import Button from '../components/Assets/Button';
import DatePicker from '../components/Assets/FormDate';
import FormInput from '../components/Assets/FormInput';
import FormSelect from '../components/Assets/FormSelect';
import FormTextArea from '../components/Assets/FormTextArea';
// import Message from '../components/Assets/Message'
import Background from '../components/Layouts/Background';
import Container from '../components/Layouts/Container';
import * as Yup from 'yup';
import { InboxIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { iconClasses } from '../components/Navbar/Footer';

const Services = [
  {
    value: 'Svatební videoklip',
    label: 'Svatební videoklip',
  },
  { value: 'Promo video', label: 'Promo video' },
  { value: 'Předsvatební natáčení', label: 'Předsvatební natáčení' },
  { value: 'Event', label: 'Event' },
];

const contacts = [
  {
    value: 'info@perspective-video.cz',
    icon: <InboxIcon className={iconClasses} />,
  },
  {
    value: '+420 608 813 049',
    icon: <PhoneIcon className={iconClasses} />,
  },
];

const Kontakt = () => {
  // const [message, setMessage] = useState<string>('');
  // const [error, setError] = useState<boolean>(false);
  const initialValues = {
    name: '',
    email: '',
    place: '',
    servis: Services[0].value,
    message: '',
    date: '',
  };

  const schema = Yup.object().shape({
    name: Yup.string().min(2, 'Moc krátké').required('Vyžadováno'),
    email: Yup.string().email('Neplatná emailová adresa').required('Vyžadováno'),
    place: Yup.string().min(2, 'Moc krátké').required('Vyžadováno'),
    message: Yup.string().min(2, 'Moc krátké').required('Vyžadováno'),
    servis: Yup.string().required('Vyžadováno'),
    date: Yup.date().required('Vyžadováno'),
  });

  return (
    <Background>
      <Container customStyles="sharedLayout min-h-screen">
        <div className="flex flex-col gap-5">
          <h1 className="title">Kontakt</h1>
          <p>
            Pokud si chcete objednat služby nebo se na cokoliv zeptat, můžete využít kontaktní
            formulář níže.
          </p>
          <p>
            Pokud Vám do pár dní nepřijde odpověď, zkontrolujte si prosím spam, nebo mi napište na
            sociální sítě. Případně se nebojte zavolat.
          </p>
          {contacts.map(({ value, icon }) => (
            <div key={value} className="flex items-center gap-5">
              {icon}
              <p className="text-primary-gray">{value}</p>
            </div>
          ))}

          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={async () => {}}
            key="contactFormik"
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-5 mt-10">
                <FormInput name="name" label="Jméno a příjmení" placeholder="Jiří Novotný" />
                <FormInput
                  name="email"
                  label="Emailová adresa:"
                  placeholder="jirinovotny@seznam.cz"
                />
                <FormInput name="place" label="Místo konání:" placeholder="Brno" />
                <FormSelect name="servis" label="O jakou službu máte zájem?" options={Services} />
                <FormTextArea name="message" label="Zpráva:" cols={5} rows={5} />
                <DatePicker name="date" label="Datum události:" />
                {/* {!!message && <Message isError={error} text={message} />} */}
                <Button isSubmit loading={isSubmitting} customStyles="lg:w-[300px]">
                  Odeslat
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </Background>
  );
};

export default Kontakt;
