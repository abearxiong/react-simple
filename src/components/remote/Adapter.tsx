import React, { useEffect, useRef } from 'react';
import { loadComponent } from './LoadRemote';

type Props = {
  id?: string;
  importer: any;
  children?: any;
  remoteReactScope: any;
  newReactDomMoudle?: string;
  newReactModule?: string;
  style?: React.CSSProperties;
  options?: any;
};
const Adapter = ({
  id = Math.random().toString(16).slice(2, 8),
  importer,
  remoteReactScope,
  children,
  newReactDomMoudle = './newReactDom',
  newReactModule = './newReact',
  style,
  options,
}: Props) => {
  const adapterRef = useRef<any>(null);

  const init = (hydrate?: any) => {
    (async () => {
      const newReactDOM: any = loadComponent(remoteReactScope, newReactDomMoudle);
      const newReact: any = loadComponent(remoteReactScope, newReactModule);
      const [r, rd, rc] = await Promise.all([newReact(), newReactDOM(), importer()]);
      const renderMethod = hydrate ? rd.hydrate : rd.render;
      renderMethod((r as typeof React).createElement(rc.default, options, children), adapterRef.current);
    })();
  };
  useEffect(() => {
    init(true);
  }, []);

  return (
    <div
      id={id}
      style={{
        ...style,
      }}
      ref={adapterRef}
    />
  );
};

export default Adapter;
