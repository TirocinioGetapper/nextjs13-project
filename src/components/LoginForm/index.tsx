import React, { memo } from "react";
import { FormProvider } from "react-hook-form";
import { useLoginForm } from "./index.hooks";
import { Button, Stack } from "@mui/material";
import { FormTextField } from "@/components/_form/FormTextField";
import { FormPassword } from "@/components/_form/FormPassword";

type LoginFormProps = {};

export const LoginForm = memo(({}: LoginFormProps) => {
  const { formData, triggerSubmit, submitDisabled } = useLoginForm();

  return (
    <FormProvider {...formData}>
      <form onSubmit={triggerSubmit}>
        <Stack spacing={3}>
          <FormTextField name="email" label="Email *" />
          <FormPassword name="password" label={"Password *"} hidden={true} />
          <Button variant="contained" type="submit" disabled={submitDisabled}>
            Login
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
});
LoginForm.displayName = "LoginForm";
