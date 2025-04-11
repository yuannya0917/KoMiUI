import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Alert, { AlertType } from './components/Alert/alert'
import { buildTimeValue } from '@testing-library/user-event/dist/utils';
import { format } from 'path';
function App() {
  const a = '123'
  if (a === '123') {

  }
  return (
    <div className="App">
      <header className="App-header">
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
