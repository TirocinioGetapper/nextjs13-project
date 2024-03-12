import { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  name: yup
    .string()
    .min(3, "Il nome deve avere almeno 3 caratteri")
    .max(50, "Limite massimo 50 caratteri!")
    .required("Campo richiesto!"),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  birthday: yup.date().required(),
  privacyAccepted: yup
    .bool()
    .oneOf([true], "You must accept privacy condition to continue!")
    .required(),
});

type SignupFormData = {
  name: string;
  email: string;
  password: string;
  birthday: Date;
  privacyAccepted: boolean;
};

export const useSignupForm = () => {
  const formData = useForm<SignupFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      birthday: new Date(),
      privacyAccepted: false,
    },
  });
  const {
    handleSubmit,
    formState: { isValid, isSubmitted },
  } = formData;
  const submitDisabled = isSubmitted && !isValid;

  const triggerSubmit = useMemo(
    () =>
      handleSubmit((data) => {
        console.log(data.email);
      }),
    [handleSubmit],
  );

  return {
    formData,
    triggerSubmit,
    submitDisabled,
  };
};
