import React, { useState } from "react";
import "./SwapWidget.css";
import styled from "styled-components";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Flex from "../Flex";
import * as Switch from "@radix-ui/react-switch";
import { Combobox } from "@headlessui/react";
import OptionsPane from "./OptionsPane";
import { ArrowRight } from "lucide-react";

const Body = styled.div<{ showRoutes: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  width: 100%;
  min-height: 36rem;
  max-width: 30rem;
  border: 1px solid #2f333c;
  align-self: flex-start;

  z-index: 1;

  @media screen and (min-width: ${({ theme }) => theme.bpLg}) {
    position: sticky;
    top: 24px;
  }

  box-shadow: ${({ theme }) =>
    theme.mode === "dark"
      ? "10px 0px 50px 10px rgba(26, 26, 26, 0.9);"
      : "10px 0px 50px 10px rgba(211, 211, 211, 0.9);;"};

  border-radius: 16px;
  text-align: left;
`;

const OverlayBody = styled(Body)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  grid-row-gap: 36px;
  margin: 10px auto 40px;
  position: relative;
  top: 36px;

  h1 {
    font-weight: 500;
  }

  @media screen and (min-width: ${({ theme }) => theme.bpMed}) {
    top: 0px;
  }

  @media screen and (max-width: ${({ theme }) => theme.bpMed}) {
    flex-direction: column;
    display: flex;
  }
`;

const Routes = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 16px;
  text-align: left;
  overflow-y: scroll;
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
  align-self: stretch;
  max-width: 30rem;
  border: 1px solid #2f333c;

  & > *:first-child {
    margin-bottom: -6px;
  }

  box-shadow: ${({ theme }) =>
    theme.mode === "dark"
      ? "10px 0px 50px 10px rgba(26, 26, 26, 0.9);"
      : "10px 0px 50px 10px rgba(211, 211, 211, 0.9);"};

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  z-index: 1;
  position: relative;

  & > * {
    margin: 0 auto;
  }

  @media screen and (min-width: ${({ theme }) => theme.bpLg}) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 24px;

    & > * {
      flex: 1;
      margin: 0;
    }
  }
`;

const TokenSelectBody = styled.div`
  display: grid;
  grid-column-gap: 8px;
  grid-template-columns: 5fr 1fr 5fr;
`;

const FormHeader = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 4px;
  margin-left: 4px;
`;

const SelectWrapper = styled.div`
  border: ${({ theme }) =>
    theme.mode === "dark" ? "2px solid #373944;" : "2px solid #c6cae0;"};
  border-radius: 16px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: ${({ theme }) => theme.bpMed}) {
    & input {
      font-size: 16px;
    }
  }
`;

const SwapWrapper = styled.div`
  margin-top: auto;
  min-height: 40px;
  width: 100%;
  display: flex;
  gap: 4px;
  flex-wrap: wrap;

  & > button {
    flex: 1;
  }
`;

const SwapUnderRoute = styled(SwapWrapper)`
  margin-top: 16px;
  @media screen and (min-width: ${({ theme }) => theme.bpMed}) {
    display: none;
  }
`;

const ConnectButtonWrapper = styled.div`
  min-height: 40px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  & button {
    width: 100%;
    text-align: center !important;
  }

  & > div {
    width: 100%;
  }
`;

const SwitchRoot = styled(Switch.Root)`
  all: unset;

  width: 42px;
  height: 25px;
  background-color: grey;
  border-radius: 9999px;
  position: relative;
  box-shadow: 0 2px 10px var(--blackA7);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

const SwitchThumb = styled(Switch.Thumb)`
  display: block;
  width: 21px;
  height: 21px;
  background-color: white;
  border-radius: 9999px;
  box-shadow: 0 2px 2px var(--blackA7);
  transition: transform 100ms;
  transform: translateX(2px);
  will-change: transform;

  [data-state="checked"] {
    transform: translateX(19px);
  }
`;

const ComboboxInput = styled(Combobox.Input)`
  border: 1px solid #2f333c;
  border-radius: 16px;
  background-color: #2f333c;
  outline: none;
  padding: 16px;
  color: #fff;
`;

const chain = [
  "Ethereum",
  "Binance Smart Chain",
  "Polygon",
  "Avalanche",
  "Fantom",
];

export interface SwapWidgetProps {
  label: string;
}

const SwapWidget = ({ label }: SwapWidgetProps) => {
  const [isPrivacyEnabled, setIsPrivacyEnabled] = useLocalStorage(
    "llamaswap-isprivacyenabled",
    false
  );

  const [selectedChain, setSelectedChain] = useState(chain[0]);
  const [query, setQuery] = useState("");

  const filteredChain =
    query === ""
      ? chain
      : chain.filter((chain) => {
          return chain.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <BodyWrapper>
      <Body showRoutes={false}>
        <FormHeader>
          <Flex>
            <div>Chain</div>
            <div
              style={{
                flexGrow: 1,
              }}
            />
            {/* <Tooltip>
              Redirect requests through the DefiLlama Server to hide your IP
              address
            </Tooltip> */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div>Hide IP</div>
              <SwitchRoot>
                <SwitchThumb />
              </SwitchRoot>
            </div>
          </Flex>
        </FormHeader>
        <Combobox value={selectedChain} onChange={setSelectedChain}>
          <ComboboxInput
            onChange={(event: any) => setQuery(event.target.value)}
          />
        </Combobox>
        <SelectWrapper>
          <FormHeader>Select Tokens</FormHeader>
          <TokenSelectBody>
            <Combobox value={selectedChain} onChange={setSelectedChain}>
              <ComboboxInput
                onChange={(event: any) => setQuery(event.target.value)}
              />
            </Combobox>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowRight size={16} />
            </div>
            <Combobox value={selectedChain} onChange={setSelectedChain}>
              <ComboboxInput
                onChange={(event: any) => setQuery(event.target.value)}
              />
              {filteredChain && (
                <OverlayBody showRoutes={false}>
                  <OptionsPane filteredValues={filteredChain} />
                </OverlayBody>
              )}
            </Combobox>
            {/* <TokenSelect
              tokens={tokensInChain.filter(
                ({ address }) => address !== finalSelectedToToken?.address
              )}
              token={finalSelectedFromToken}
              onClick={onFromTokenChange}
              selectedChain={selectedChain}
            /> */}
          </TokenSelectBody>
        </SelectWrapper>
      </Body>
    </BodyWrapper>
  );
};

export default SwapWidget;
