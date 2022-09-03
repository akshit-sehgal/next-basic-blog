import { useEffect, useState } from 'react';
import Notification from '../ui/notification';
import classes from './contact-form.module.css';

const sendContactData = async (newMessage) => {
  const resp = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMessage)
  });
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
}

const ContactForm = () => {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();

  useEffect(()=>{
    if(['success', 'error'].includes(requestStatus)){
      const timer = setTimeout(()=>{
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return ()=>{
        clearTimeout(timer);
      }
    }
  },[requestStatus])

   const sendMessage = async (e)=>{
    e.preventDefault();

    const newMessage = {
      email, 
      name,
      message
    };

    setRequestStatus('pending');
    try{
      await sendContactData(newMessage);
      setRequestStatus('success');
      setEmail('');
      setName('');
      setMessage('');
    }
    catch(err){
      setRequestError(err.message);
      setRequestStatus('error');
    }
  }

  let notification;

  if(requestStatus === 'pending'){
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way!'
    }
  }

  if(requestStatus === 'success'){
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent successfully'
    };
  }

  if(requestStatus === 'error'){
    notification = {
      status: 'error',
      title: 'Error!',
      message: requestError
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help?</h1>
      <form className={classes.form} onSubmit={sendMessage}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' value={email} onChange={(e)=>setEmail(e.target.value)} required />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input type='txt' id='name' value={name} onChange={(e)=>setName(e.target.value)} required />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor='message'>Your Message</label>
          <textarea id='message' value={message} onChange={(e)=>setMessage(e.target.value)} required rows="5" />
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && <Notification {...notification}/>}
    </section>
  );
};

export default ContactForm;