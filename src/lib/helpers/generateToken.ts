import crypto from 'crypto';

export const generateRecoveryToken = () => {
  const buffer = crypto.randomBytes(32);
  const token = buffer.toString('hex');
  return token;
};

export const generateActivationToken = () => {
  const buffer = crypto.randomBytes(32);
  const token = buffer.toString('hex');
  return token;
};