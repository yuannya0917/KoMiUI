import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Alert, { AlertType } from './components/Alert/alert'
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Tabs from './components/Tabs/tabs';
import TabsItem from './components/Tabs/tabsItem';
import { buildTimeValue } from '@testing-library/user-event/dist/utils';
import { format } from 'path';
function App() {
  const a = '123'
  if (a === '123') {

  }
  return (
    <div className="App">
      <header className="App-header">
        <Tabs type='line'>
            <TabsItem label='LineTab1'>This is Tab1</TabsItem>
            <TabsItem label='LineTab2'>This is Tab2</TabsItem>
            <TabsItem label='LineTab3' disabled={true}>This is Tab3</TabsItem>
       </Tabs>
       <Tabs type='card'>
            <TabsItem label='CardTab1'>This is Tab1</TabsItem>
            <TabsItem label='Cardtab2'>This is Tab2</TabsItem>
            <TabsItem label='Cardtab3' disabled={true}>This is Tab3</TabsItem>
       </Tabs>
         <Menu onSelect={(index) => { alert(index) }} mode="vertical">
          <MenuItem>cool link</MenuItem>
          <MenuItem disabled>cool link2</MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>dropdown1</MenuItem>
            <MenuItem>dropdown2</MenuItem>
          </SubMenu>
          <MenuItem>cool link3</MenuItem>
        </Menu> 
        <Menu onSelect={(index)=>{alert(index)}}>
          <MenuItem>cool link</MenuItem>
          <MenuItem disabled>cool link2</MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>dropdown1</MenuItem>
            <MenuItem>dropdown2</MenuItem>
          </SubMenu>
          <MenuItem>cool link3</MenuItem>
        </Menu>
        <Button className="custom" onClick={() => { alert('123') }}>Hello</Button>
        <Button disabled>Disabled Button</Button>
        <Button size={ButtonSize.Large} btnType={ButtonType.Primary}>Large Primary</Button>
        <Button size={ButtonSize.Small} btnType={ButtonType.Danger}>Small Primary</Button>
        <Button btnType={ButtonType.Link} href="https://www.bilibili.com/" target="_blank">Bilibili Link</Button>
        <Button btnType={ButtonType.Link} disabled>Disabled Link</Button>
        <Alert type={AlertType.Success} title='this is success!'></Alert>
        <Alert type={AlertType.Danger} title='this is danger!'></Alert>
        <Alert type={AlertType.Warning} title='this is warning!' closable={false}></Alert>
        <Alert
          description="this is a long description"
          onClose={function noRefCheck() { }}
          title="Title"
        />

        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
