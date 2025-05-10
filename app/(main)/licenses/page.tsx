"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Start } from "@/components/sections/landing/Start";
import { LicenseContent } from "@/components/licenses/LicenseContent";
import { SectionHero } from "@/components/shared/SectionHero";

const LICENSES_URL =
  "https://raw.githubusercontent.com/Redot-Engine/redot-engine/refs/heads/master/";
const LICENSE_TYPES = ["LICENSE", "COPYRIGHT", "LOGO_LICENSE"];

export default function License() {
  const [licenses, setLicenses] = useState<{ [key: string]: string | null }>({
    LICENSE: null,
    COPYRIGHT: null,
    LOGO_LICENSE: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const responses = await Promise.all(
          LICENSE_TYPES.map(async (type) => {
            const url = `${LICENSES_URL}${type}.txt`;
            try {
              const response = await axios.get(url);
              return { [type]: response.data };
            } catch (innerError) {
              console.error(`Error fetching ${type}:`, innerError);
              return { [type]: null };
            }
          })
        );

        setLicenses(Object.assign({}, ...responses));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching licenses:", error);
        setIsLoading(false);
      }
    };

    fetchLicenses();
  }, []);

  return (
    <div>
      <SectionHero section="licenses" />
      <div className="mt-24 flex flex-col gap-8 px-5 lg:px-40">
        {LICENSE_TYPES.map((type) => (
          <LicenseContent
            key={type}
            type={type}
            content={licenses[type]}
            isLoading={isLoading}
          />
        ))}
      </div>
      <Start />
    </div>
  );
}
