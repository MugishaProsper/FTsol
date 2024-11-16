export const generateRandomPassword = () => {
  const length = 20;
  const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  
  const allChars = upperCaseChars + lowerCaseChars + numberChars;
  let password = '';

  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      password += allChars[randomIndex];
  }
  return password;
}
