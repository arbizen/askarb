import styled from "styled-components";
import { useState } from "react";
const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin-top: 25px;
`;
const Tab = styled.div`
  color: #fff;
  padding: 10px;
  margin-left: 20px;
  text-transform: uppercase;
  cursor: pointer;
  color: grey;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  ${(props) =>
    props.active &&
    `
    border-bottom: 2px solid #fff;
    color: #fff;
    &:hover {
      background: transparent;
    }
  `}
  @media only screen and (max-width: 600px) {
    cursor: default;
  }
`;

export function TabItem({ onTabClick, active, children }) {
  return (
    <Tab active={active} onClick={onTabClick}>
      {children}
    </Tab>
  );
}

export function Tabs({ children }) {
  return <TabsContainer>{children}</TabsContainer>;
}

export function NavigationStack({ children, tabs }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <Tabs>
        {tabs &&
          tabs.map((tab, i) => (
            <TabItem
              active={activeTab === i}
              key={i}
              onTabClick={() => setActiveTab(i)}
            >
              {tab.name}
            </TabItem>
          ))}
      </Tabs>
      {children(activeTab)}
    </>
  );
}
