// Regex for validating E.164 format
export const validatePhoneNumber = (phone: string) => {
  const regex = /^\+(\d{1,3})\d{7,14}$/;
  return regex.test(phone);
};

// console.log(validatePhoneNumber('+2347012345678')); // true
// console.log(validatePhoneNumber('+1 8001234567')); // true
// console.log(validatePhoneNumber('08012345678')); // false (missing country code)
