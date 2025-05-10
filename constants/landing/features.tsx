import {
  IconDeviceDesktop,
  IconVectorTriangle,
  IconBuildingSkyscraper,
  IconCode,
  IconVectorBezier,
  IconSettings,
  IconLanguage,
  IconPrismLight,
  IconKeyframeAlignVertical,
  IconLayoutList,
  IconApi,
  IconBrandSpeedtest,
} from "@tabler/icons-react";
import React from "react";

export interface Features {
  icon: React.ReactNode;
  label: string;
}

export const FEATURES_LIST: Features[] = [
  {
    icon: <IconDeviceDesktop className="h-4 w-4" />,
    label: "Cross-Platform",
  },
  {
    icon: <IconVectorTriangle className="h-4 w-4" />,
    label: "Node-Based",
  },
  {
    icon: <IconBuildingSkyscraper className="h-4 w-4" />,
    label: "Scene System",
  },
  {
    icon: <IconCode className="h-4 w-4" />,
    label: "Open Source",
  },
  {
    icon: <IconVectorBezier className="h-4 w-4" />,
    label: "Visual Scripting",
  },
  {
    icon: <IconSettings className="h-4 w-4" />,
    label: "Asset Pipelines",
  },
  {
    icon: <IconLanguage className="h-4 w-4" />,
    label: "GDScript Support",
  },
  {
    icon: <IconPrismLight />,
    label: "Physics Engine",
  },
  {
    icon: <IconKeyframeAlignVertical />,
    label: "Animation Tools",
  },
  {
    icon: <IconLayoutList />,
    label: "2D/3D Support",
  },
  {
    icon: <IconApi />,
    label: "Extensible API",
  },
  {
    icon: <IconBrandSpeedtest />,
    label: "Performance Optimization",
  },
];
