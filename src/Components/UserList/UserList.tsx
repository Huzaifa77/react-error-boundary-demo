import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface Reminders {
  id: number;
  text: string;
}

export const UserList: React.FC = () => {
  const { data, error, isLoading } = useSWR("/api/remindersList");
  console.log(
    "🚀 ~ file: UserList.tsx:13 ~ d:",
    data.data.reminders,
    error,
    isLoading
  );
  const [reminders, setReminders] = useState<Reminders[]>([]);

  async function fetchData() {
    try {
      const { data } = await axios.get("/api/remindersList");
      setReminders(data.reminders);
    } catch (err) {
      console.log("🚀 ~ file: UserList.tsx:27 ~ fetchData ~ err:", err);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <h1 className="text-3xl font-bold underline">
      <ul>
        {reminders.map(({ id, text }) => (
          <li key={id}>{text}</li>
        ))}
      </ul>
    </h1>
  );
};
