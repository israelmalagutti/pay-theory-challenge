import { PropsWithChildren } from "react";

import { Button } from "antd";

type SubmitButtonProps = PropsWithChildren & {
  isSubmitting?: boolean;
  isDisabled?: boolean;
};

export function SubmitButton({
  isSubmitting,
  isDisabled,
  children,
}: SubmitButtonProps) {
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
