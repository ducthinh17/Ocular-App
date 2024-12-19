import React, { FC } from "react";
import { Box, Header, Text } from "zmp-ui";
import { useRecoilValueLoadable } from "recoil";
import { userState } from "../../state";
import logo from "../../static/logo.png";
import appConfig from "../../../app-config.json";
import { getConfig } from "../../utils/config";

export const Welcome: FC = () => {
  const user = useRecoilValueLoadable(userState);

  return (
    <Header
      className="bg-gradient-to-r from-[rgb(215,250,255)] to-[rgb(115,174,223)] app-header no-border pl-4 flex-none pb-[6px]"
      showBackIcon={false}
      title={
        (
          <Box flex alignItems="center" className="w-full">
            {/* Left: Logo */}
            <Box className="flex items-center">
              <img
                className="w-17 h-10 mr-1"
                src={getConfig((c) => c.template.headerLogo) || logo}
                alt="Logo"
              />
            </Box>
            {/* Right: User Info */}

            <Box className="flex items-center">
              {user.state === "hasValue" ? (
                <Text size="xxSmall" className="text-[rgb(97,101,102)] mt-3">
                  Welcome, {user.contents.name}!
                </Text>
              ) : (
                <Text>...</Text>
              )}
            </Box>
          </Box>
        ) as unknown as string
      }
    />


  );
};
