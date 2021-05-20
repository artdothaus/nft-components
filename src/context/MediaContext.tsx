import React, { useContext, createContext } from "react";
import {
  NetworkIDs,
  Networks,
  NFTFetchConfiguration,
} from "@zoralabs/nft-hooks";
import { merge } from "merge-anything";

import { Strings } from "../constants/strings";
import { Style } from "../constants/style";
import { ThemePresetNames, THEME_PRESETS } from "../constants/style-presets";

export type ThemeType = typeof Style;

export type MediaContextType = {
  style: ThemeType;
  networkId: NetworkIDs;
  showBids: boolean;
  strings: typeof Strings;
};

export const MediaContext = createContext<MediaContextType>({
  networkId: Networks.MAINNET,
  showBids: true,
  style: Style,
  strings: Strings,
});

type MediaContextConfigurationProps = {
  networkId?: NetworkIDs;
  children: React.ReactNode;
  style?: any;
  showBids?: boolean;
  strings?: any;
  themePreset?: ThemePresetNames;
};

export const MediaConfiguration = ({
  networkId = Networks.MAINNET,
  style = {},
  children,
  strings = {},
  themePreset,
  showBids,
}: MediaContextConfigurationProps) => {
  const superContext = useContext(MediaContext);

  const themePresetValue = themePreset ? THEME_PRESETS[themePreset] : undefined;
  console.log({themePresetValue})

  let newContext = {
    style: merge(
      themePreset
        ? merge(superContext.style, themePresetValue)
        : superContext.style,
      style
    ),
    strings: merge(superContext.strings, strings),
    networkId,
    showBids: showBids === undefined ? superContext.showBids : showBids,
  };

  return (
    <MediaContext.Provider value={newContext}>
      <NFTFetchConfiguration networkId={networkId}>
        {children}
      </NFTFetchConfiguration>
    </MediaContext.Provider>
  );
};
