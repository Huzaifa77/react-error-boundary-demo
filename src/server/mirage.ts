import { createServer } from "miragejs";
import { Response } from "miragejs";

export const makeServer = ({
  environment = "test",
}: {
  environment: string;
}) => {
  const server = createServer({
    environment,

    timing: 750,

    routes() {
      this.namespace = "api";

      this.get(
        "/todoList",
        () => {
          // Force an error
          return new Response(500);
          // return {
          //   todos: [
          //     { id: 1, text: "Walk the dog" },
          //     { id: 2, text: "Take out the trash" },
          //     { id: 3, text: "Work out" },
          //   ],
          // };
        },
        { timing: 1500 }
      );
      this.get(
        "/remindersList",
        () => {
          // Force an error
          //   return new Response(500);
          return {
            reminders: [
              { id: 1, text: "Completed walking the dog" },
              { id: 2, text: "Completed taking out the trash" },
              { id: 3, text: "Completed working out" },
            ],
          };
        }
        // { timing: 1500 }
      );

      this.namespace = "";
      this.passthrough();
    },
  });

  server.pretender.passthroughRequest = () => {};

  server.logging = false;

  return server;
};
