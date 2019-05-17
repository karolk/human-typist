import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HumanTypist } from './src/HumanTypist'

const Application = () => (
  <>
    <HumanTypist text="Save me from drowning in the sea" render={(text, complete) => (
      <div>
        <p>{text}</p>
        {complete && <HumanTypist text="Beat me up on the beach" render={(text) => <p>{text}</p>} />}
      </div>
    )}
    />
  </>
)

ReactDOM.render(
  <Application />,
  document.getElementById('root') as HTMLElement
);  