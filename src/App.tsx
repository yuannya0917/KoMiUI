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
import { Input } from './components/Input/input';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Select } from './components/Select/select';
import { Option } from './components/Select/option';


function App() {
  const[show,setShow]=useState(false)
  const nodeRef=useRef(null)
  const nodeRef1=useRef(null)
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon="xmark"></Icon>
        <Select placeholder='hello'>
          <Option value='banana'>香蕉</Option>
          <Option value='watermelon'>西瓜</Option>
          <Option value='strawberry'>草莓</Option>
          <Option value='nihao' disabled>hello</Option>
        </Select>
        <Input placeholder='holder' icon={faCoffee} size='lg'></Input>
        <Input placeholder='holder' append='append' size='sm'></Input>
        <Input placeholder='holder' prepend='preappend'></Input>
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

         <Menu onSelect={(index) => { alert(index) }} mode='vertical'>
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
        <Alert type='success' title='this is success!'></Alert>
        <Alert type='danger' title='this is danger!'></Alert>
        <Alert type='warning' title='this is warning!' closable={false}></Alert>
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
