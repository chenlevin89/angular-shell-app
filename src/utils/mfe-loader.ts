type Scope = unknown;
declare const __webpack_share_scopes__: {default: Scope};
declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
const loadedScriptMapping = {};
let webpackInitSharing = false;

export async function loadMicroFrontendModule({remoteName, modulePath}: {remoteName: string, modulePath: string}): Promise<any> {
  const container = (window as any)[remoteName];
  const moduleFunc = await (container.get(modulePath) as Promise<any>);
  return moduleFunc();
}

export async function loadRemoteEntryScript({path, remoteName}: {path: string, remoteName: string}): Promise<void> {
  await loadScript(path);
  if (!webpackInitSharing) {
    await __webpack_init_sharing__('default');
    webpackInitSharing = true
  }
  const container = (window as any)[remoteName];
  await container.init(__webpack_share_scopes__.default)
}

function loadScript(path: string): Promise<boolean> {
  return new Promise(res => {
    if (loadedScriptMapping[path]) {
      res(true);
      return;
    }
    const script = document.createElement('script');
    script.onload = () => {
      loadedScriptMapping[path] = true;
      res(true)
    };
    script.src = path;
    document.body.appendChild(script);
  });
}
