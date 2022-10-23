import {loadRemoteEntryScript} from './utils/mfe-loader';

// fetch('https://micro-frontend-server/configuration');

getMfeConfiguration()
  .then(configuration => {
    const promises$ = configuration.map(curr => loadRemoteEntryScript({...curr}));
    Promise.all(promises$).then(_ => import('./bootstrap'))
  });


function getMfeConfiguration(): Promise<any[]> {
  const mfeConfigurations = [
    {
      path: 'https://local.supersonicads.com/demand/remoteEntry.js',
      remoteName: 'demandPlatform'
    },
    // {
    //   path: 'http://localhost:8080/remoteEntry.js',
    //   remoteName: 'analyticsRemote'
    // },
    // {
    //   path: 'http://localhost:9000/remoteEntry.js',
    //   remoteName: 'adQualityRemote'
    // },
  ];
  return new Promise(res => {
    setTimeout(() => {
      res(mfeConfigurations)
    }, 100);
  });
}
