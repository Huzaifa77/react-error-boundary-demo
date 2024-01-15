import { useEffect, useState } from "react";
import useSWR from "swr";
// import { useErrorBoundary } from "react-error-boundary";

import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useErrorBoundaryHandler } from "@/hooks";

interface Reminders {
  id: number;
  text: string;
}

export const UserList: React.FC = () => {
  // const { showBoundary } = useErrorBoundary();
  const handleError = useErrorBoundaryHandler();

  const {
    data: todoData,
    error: todoError,
    isLoading: todoLoading,
  } = useSWR("/api/todoList");

  const {
    data: reminderData,
    error: remindersError,
    isLoading: reminderLoading,
  } = useSWR("/api/remindersList");

  const [defaultTab, setDefaultTab] = useState<string>("to-do");
  const [todos, setTodos] = useState<Reminders[]>([]);
  const [reminders, setReminders] = useState<Reminders[]>([]);

  useEffect(() => {
    setReminders(reminderData ? reminderData?.data?.reminders : []);
    setTodos(todoData ? todoData?.data?.todos : []);
  }, [reminderData, todoData]);

  // useEffect(() => {
  //   if (remindersError || todoError) {
  //     const error = remindersError ? remindersError : todoError;
  //     // showBoundary(error);
  //     handleError(error);
  //   }
  // }, [remindersError, todoError]);

  if (remindersError || todoError) {
    const error = remindersError ? remindersError : todoError;
    // showBoundary(error);
    handleError(error);
    throw error;
  }

  return (
    <div className="flex text-center align-middle justify-center font-bold m-2 dark:bg-black">
      <Tabs defaultValue="to-do" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="to-do" onClick={() => setDefaultTab("to-do")}>
            To-do
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            onClick={() => setDefaultTab("completed")}
          >
            Completed
          </TabsTrigger>
        </TabsList>
        <TabsContent value="to-do">
          <Card>
            <CardHeader>
              <CardTitle>Reminders</CardTitle>
              <CardDescription>{defaultTab} list</CardDescription>
            </CardHeader>
            <CardContent>
              {todoLoading ? <Progress value={todoLoading ? 50 : 50} /> : ""}
              <ul>
                {reminders &&
                  todos.map(({ id, text }) => <li key={id}>{text}</li>)}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Reminders</CardTitle>
              <CardDescription>{defaultTab} list</CardDescription>
            </CardHeader>
            <CardContent>
              {reminderLoading ? (
                <Progress value={reminderLoading ? 50 : 50} />
              ) : (
                ""
              )}
              <ul>
                {reminders &&
                  reminders.map(({ id, text }) => <li key={id}>{text}</li>)}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
