export const isValidEmail = (email: string) => {

  // Regular Expression (Accepts every special
  // character along with @ symbol)
  const regexp = /\S+@\S+\.\S+/;

  // Converting the email to lowercase
  return regexp.test(String(email).toLowerCase());
}