import web3 from "web3";

const validate = values => {
  const errors = {};
  // signup
  if (!values.email) {
    errors.email = "email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,64}$/i.test(values.email)) {
    errors.email = "invalid email address";
  }
  if (!values.ethAddress) {
    errors.ethAddress = "ETH address is required";
  } else if (!web3.utils.isAddress(values.ethAddress)) {
    errors.ethAddress = "invalid ETH address";
  }
  if (!values.contributionAmount) {
    errors.contributionAmount = "contribution amount is required";
  } else if (!/^[\d.]+$/.test(values.contributionAmount)) {
    errors.contribution = "contribution must be a number";
  } else if (values.contributionAmount < 0.1) {
    errors.contribution = "minimum contribution is 0.1 Eth";
  }
  // verification
  if (!values.method) {
    errors.method = "verification method is required";
  }
  if (!values.country) {
    errors.country = "country is required";
  }
  if (!values.firstName) {
    errors.firstName = "first name is required";
  }
  if (!values.lastName) {
    errors.lastName = "last name is required";
  }
  if (!values.phone) {
    errors.phone = "phone number is required";
  } else if (!/^[\d]+$/.test(values.phone)) {
    errors.phone = "phone number must contain numbers only";
  }
  if (!values.birthDay) {
    errors.birthDay = "birth day is required";
  }
  if (!values.birthMonth) {
    errors.birthMonth = "birth month is required";
  }
  if (!values.birthYear) {
    errors.birthYear = "birth year is required";
  }
  return errors;
};

export default validate;
