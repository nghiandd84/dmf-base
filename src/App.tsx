import React from 'react';
import ReactDOM from 'react-dom';
import tw from 'twin.macro';

import './index.scss';
import H1 from 'dmf_ui/typography/H1';

export const App = () => (
  <div css={[tw`max-w-6xl mx-auto`]} tw=" mt-10 px-4">
    <H1 color="primary">Micro frontend App</H1>
  </div>
);
// ReactDOM.render(<App />, document.getElementById('app'));
