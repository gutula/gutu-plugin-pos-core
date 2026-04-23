import { defineUiSurface } from "@platform/ui-shell";

import { BusinessAdminPage } from "./admin/main.page";

export const uiSurface = defineUiSurface({
  embeddedPages: [
    {
      shell: "admin",
      route: "/admin/business/pos",
      component: BusinessAdminPage,
      permission: "pos.sessions.read"
    }
  ],
  widgets: []
});
