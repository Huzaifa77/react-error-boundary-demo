import { useErrorBoundary } from "react-error-boundary";

export const useErrorBoundaryHandler = () => {
  const { showBoundary } = useErrorBoundary();

  const hanldeError = (error: unknown) => {
    showBoundary(error);
  };

  return hanldeError;
};
