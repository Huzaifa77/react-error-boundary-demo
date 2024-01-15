export const ErrorLogger = (error: Error, info: React.ErrorInfo) => {
  console.error(`🚀 ~ ErrorLogger ~ ${error.message}:`, info.componentStack);
};
