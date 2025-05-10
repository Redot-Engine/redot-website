import {
  Icon3dCubeSphere,
  IconBrandGithub,
  IconCamera,
  IconDeviceDesktop,
} from "@tabler/icons-react";
import React from "react";

export interface Highlights {
  readonly header: string;
  readonly description: string;
  readonly icon?: React.ReactNode;
}

export const FEATURES_HIGHLIGHT_LIST: Readonly<Highlights[]> = [
  {
    header: "highlights.sceneDrivenDesign.header",
    description: "highlights.sceneDrivenDesign.description",
    icon: <IconCamera className="h-6 w-6" />,
  },
  {
    header: "highlights.crossPlatform.header",
    description: "highlights.crossPlatform.description",
    icon: <IconDeviceDesktop className="h-6 w-6" />,
  },
  {
    header: "highlights.2D3DEngines.header",
    description: "highlights.2D3DEngines.description",
    icon: <Icon3dCubeSphere className="h-6 w-6" />,
  },
  {
    header: "highlights.openSource.header",
    description: "highlights.openSource.description",
    icon: <IconBrandGithub className="h-6 w-6" />,
  },
];
