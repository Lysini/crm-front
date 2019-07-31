import React from "react";

import HomeRouting from '@components/HomeRouting'
import LoginView from '@views/Login'
import RemindPasswordView from '@views/RemindPassword'
import SendProblemView from '@views/SendProblem'


export const routes = [
  { path: "/", exact: true, name: "Home Routing", component: () => <HomeRouting /> },
  { path: "/app", name: "Home Routing", component: () => <HomeRouting /> },
  { path: "/log-in",  name: "Login", component: () => <LoginView /> },
  { path: "/remind-password", name: "Remind password", component: () => <RemindPasswordView /> },
  { path: "/send-problem", name: "Send problem", component: () => <SendProblemView /> },
];
