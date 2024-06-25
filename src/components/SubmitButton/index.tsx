import { PropsWithChildren, useEffect, useState } from "react";

import { Button, FormInstance } from "antd";

type SubmitButtonProps = PropsWithChildren & {
  form: FormInstance;
  fields: any;

  isSubmitting?: boolean;
  isDisabled?: boolean;
};

export function SubmitButton({
  form,
  fields,
  isSubmitting,
  children,
}: SubmitButtonProps) {
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    async function formValidation() {
      try {
        await form.validateFields();
        setIsDisabled(false);
      } catch (error) {
        setIsDisabled(true);
      }
    }

    formValidation();
  }, [form, fields]);

  return (
    <Button
      type="primary"
      htmlType="submit"
      loading={isSubmitting}
      disabled={isDisabled}
      style={{ boxShadow: "none" }}
    >
      {children}
    </Button>
  );
}
