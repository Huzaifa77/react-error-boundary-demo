import { useErrorBoundary, FallbackProps } from "react-error-boundary";
import { RxRocket } from "react-icons/rx";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export const ErrorBoundaryComponent = (props: FallbackProps) => {
  const { error } = props;
  const { resetBoundary } = useErrorBoundary();

  return (
    <Alert>
      <RxRocket className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
      <Button onClick={resetBoundary}>Try again</Button>
    </Alert>
  );
};
