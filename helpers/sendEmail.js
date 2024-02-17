import formData from 'form-data';
import Mailgun from 'mailgun.js';
import config from '../environment.js';

const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
});

export const sendEmail = body => {
  const emailInfo = {
    ...body,
    from: 'Matcha Magic <matchamagic3@gmail.com>',
  };

  mg.messages
    .create(config.MAILGUN_DOMAIN, emailInfo)
    .then(msg => console.log(msg))
    .catch(err => console.log(err));
};
