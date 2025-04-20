import React, { useState ,useRef} from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Alert, { AlertType } from './components/Alert/alert'
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Tabs from './components/Tabs/tabs';
import TabsItem from './components/Tabs/tabsItem';
import { buildTimeValue } from '@testing-library/user-event/dist/utils';
import { format } from 'path';
import Icon from './components/Icon/icon';
import Transition from './components/Transition/transition';


function App() {
  const[show,setShow]=useState(false)
  const nodeRef=useRef(null)
  const nodeRef1=useRef(null)
  return (
    <div className="App">
      <header className="App-header">
        <Tabs type='line'>
            <TabsItem label='LineTab1'>This is Tab1</TabsItem>
            <TabsItem label='LineTab2'>This is Tab2</TabsItem>
            <TabsItem label='LineTab3' disabled>This is Tab3</TabsItem>
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
        <Button size={'lg'} btnType={'primary'}>Large Primary</Button>
        <Button size={'sm'} btnType={'danger'}>Small Primary</Button>
        <Button btnType={'link'} href="https://www.bilibili.com/" target="_blank">Bilibili Link</Button>
        <Button btnType={'link'} disabled>Disabled Link</Button>
        <Alert type={AlertType.Success} title='this is success!'></Alert>
        <Alert type={AlertType.Danger} title='this is danger!'></Alert>
        <Alert type={AlertType.Warning} title='this is warning!' closable={false}></Alert>
        <Alert
          description="this is a long description"
          onClose={function noRefCheck() { }}
          title="Title"
        />

        <Button size='lg' onClick={()=>{setShow(!show)}}> Toggle</Button>
        <Transition
          in={show}
          timeout={300}
          animation='zoom-in-left'
          nodeRef={nodeRef}
          unmountOnExit={true}
        >
          <div ref={nodeRef}>
            <p >
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            </div>
        </Transition>
        <Transition
          in={show}
          timeout={300}
          animation='zoom-in-top'
          nodeRef={nodeRef1}
        >
          <div ref={nodeRef1}>
            <Button btnType='primary' size="lg">A lg Buttion</Button>
          </div>

        </Transition>
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
