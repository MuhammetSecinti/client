import * as Yup from "yup";

const validations = Yup.object().shape({
  email: Yup.string()
    .email("Gerçerli bir email girin.")
    .required("Zorunlu alan."),
  password: Yup.string()
    .min(5, "Parolanız en az 5 karakter olmalıdır")
    .required(),

});

export default validations;
