export const checkPasswordStrength = (password) => {
  if (!password) return { strength: 0, message: '' };

  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);

  let strength = 0;
  if (hasMinLength) strength += 1;
  if (hasNumber) strength += 1;
  if (hasSpecialChar) strength += 1;
  if (hasUpperCase) strength += 1;
  if (hasLowerCase) strength += 1;

  let message = '';
  if (strength <= 1) message = 'Weak';
  else if (strength <= 3) message = 'Medium';
  else message = 'Strong';

  return {
    strength: (strength / 5) * 100, // Convert to percentage
    message
  };
};