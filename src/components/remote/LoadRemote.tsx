import React, { useEffect, useRef, useState } from 'react';
import Adapter from './Adapter';
export const loadComponent = (scope: string, module: any) => {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    // @ts-ignore
    await __webpack_init_sharing__('default');
    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    // @ts-ignore
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
};
/**
 * useDynamicScript Systemjs
 * @param param0
 * @returns
 */
export const useDynamicScript = ({ url, scope = '' }) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  useEffect(() => {
    if (!url) {
      return;
    }
    if (window[scope] && scope) return setReady(true);

    const element = document.createElement('script');

    element.src = url;
    element.type = 'text/javascript';
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      // console.log(`Dynamic Script Loaded: ${args.url}`);
      if (scope && window[scope]) {
        setReady(true);
      } else if (scope) {
        console.error(`scople load error, Dynamic Script Error: ${url}`);
        setReady(false);
        setFailed(true);
      }
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${url}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      // console.log(`Dynamic Script Removed: ${url}`);
      document.head.removeChild(element);
    };
  }, [url]);

  return {
    ready,
    failed,
  };
};

type Module = {
  name: string;
  module: string;
};
type Props = {
  name?: string;
  id?: string;
  url?: string;
  scope: string;
  module: string | Module;
  ssr?: boolean;
  style?: any;
  fallbackText?: string;
  options?: any;
  RouterCom?: any;
};
type RemoteRoutesProps = {
  url: string;
  scope: string;
  module: string | Module;
  ssr?: boolean;
  RouterCom: React.ElementType;
};

/**
 * 只作为有router的路由的渲染节点。app模块中js加载一次并且router也只加载一次
 * @param param0
 * @returns
 */
export const System = ({ url, scope, module, ssr, style, fallbackText = 'loading', id, options }: Props) => {
  const { ready, failed } = useDynamicScript({
    url: url,
    scope: scope,
  });
  const ref = useRef<any>(null);
  const [mount, setMount] = useState(false);

  const init = async () => {
    const Com = React.lazy(loadComponent(scope, module));
    if (!ssr) {
      ref.current = (
        <React.Suspense fallback={fallbackText}>
          <Com {...options} />
        </React.Suspense>
      );
      setMount(true);
      return;
    }

    ref.current = <Adapter remoteReactScope={scope} importer={loadComponent(scope, module)} options={options} id={id} style={{ ...style }}></Adapter>;
    setMount(true);
  };
  useEffect(() => {
    if (ready && !failed) {
      init();
    }
  }, [ready, failed]);
  if (!ssr) {
  }
  return (
    <>
      {!ready && <h2>Loading dynamic script: {url}</h2>}
      {failed && <h2>Failed to load dynamic script: {url}</h2>}
      {ready && !failed && mount && ref.current}
    </>
  );
};

/** sharendRoutes
 *
 *  how to use?
 * const remoteApps = [
    {
        // "url": "/remote-app/remoteEntry.js", // prod
        "url": "http://localhost:3002/remoteEntry.js", // dev
        "scope": "remote-app",
        "module": "./Routes",
        "ssr": false,
        "style": {},
    }]
 *  remoteApps.map((item, index) => {
        return <RemoteRoutes remoteApps={remoteApps} key={index} {...item} RouterCom={Route} />
    })
 */

export const RemoteRoutes = ({ url, scope, module, RouterCom }: RemoteRoutesProps) => {
  const { ready, failed } = useDynamicScript({
    url: url,
    scope: scope,
  });
  const [Routes, setRoutes] = useState([]);
  const init = async () => {
    const ModuleFun = loadComponent(scope, module);
    const Module = await ModuleFun();
    setRoutes(Module.default);
  };
  useEffect(() => {
    if (ready && !failed) {
      init();
    }
  }, [ready, failed]);
  return Routes.map((r: any, i) => {
    const Com = r.Com;
    return <RouterCom key={i} path={r.path} exact component={Com} />;
  });
};
