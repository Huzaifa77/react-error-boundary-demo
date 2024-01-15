import { ErrorBoundary } from "react-error-boundary";

import "./App.css";
import { UserList } from "@/Components";
import { SWRConfig } from "swr";
import { swrConfig } from "@/configs";
import { ErrorLogger } from "@/utils";
import { ErrorBoundaryComponent } from "@/Components";
import { Suspense, useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

function App() {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorBoundaryComponent}
      onError={ErrorLogger}
    >
      <SWRConfig value={swrConfig}>
        <Suspense fallback={<Progress value={progress} />}>
          <UserList />
        </Suspense>
      </SWRConfig>
    </ErrorBoundary>
  );
}

export default App;
