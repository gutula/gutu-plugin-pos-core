import {
  defineAdminNav,
  defineCommand,
  definePage,
  defineWorkspace,
  type AdminContributionRegistry
} from "@platform/admin-contracts";

import { BusinessAdminPage } from "./admin/main.page";

export const adminContributions: Pick<AdminContributionRegistry, "workspaces" | "nav" | "pages" | "commands"> = {
  workspaces: [
    defineWorkspace({
      id: "pos",
      label: "POS",
      icon: "receipt",
      description: "Store sessions, cashier posture, and offline-tolerant receipt execution.",
      permission: "pos.sessions.read",
      homePath: "/admin/business/pos",
      quickActions: ["pos-core.open.control-room"]
    })
  ],
  nav: [
    defineAdminNav({
      workspace: "pos",
      group: "control-room",
      items: [
        {
          id: "pos-core.overview",
          label: "Control Room",
          icon: "receipt",
          to: "/admin/business/pos",
          permission: "pos.sessions.read"
        }
      ]
    })
  ],
  pages: [
    definePage({
      id: "pos-core.page",
      kind: "dashboard",
      route: "/admin/business/pos",
      label: "POS Control Room",
      workspace: "pos",
      group: "control-room",
      permission: "pos.sessions.read",
      component: BusinessAdminPage
    })
  ],
  commands: [
    defineCommand({
      id: "pos-core.open.control-room",
      label: "Open POS Core",
      permission: "pos.sessions.read",
      href: "/admin/business/pos",
      keywords: ["pos core","pos","business"]
    })
  ]
};
