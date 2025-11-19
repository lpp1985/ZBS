/* eslint-disable @typescript-eslint/no-explicit-any */
import envConfig from "../configs/env";

// 本地开发模式：模拟云开发SDK
const mockCreateWebApp = () => ({
  utils: {}
});

const mockWedaCloudSDK = {
  initTcb: () => console.log('Mock: initTcb called'),
  setConfig: () => console.log('Mock: setConfig called')
};

const { initTcb, setConfig } = mockWedaCloudSDK;

// 模拟动作键和路由键
const ACTIONS_KEY = {};
const ROUTER_KEY = {};

// 模拟SDK
const sdk = {};

declare global {
  interface Window {
    app?: object;
    $app?: object;
    $page?: object;
    $w?: object;
  }
}

const runtime = window;

let __app = undefined;
export const $w = new Proxy(__app?.__internal__?.$w || {}, {
  get(_, prop: string) {
    if (prop === "$app" || prop === "app") {
      return __app;
    }
    return __app?.__internal__?.$w?.[prop];
  },
});
__app = createGlboalApi();
const app = __app;

function mountAPIs(sdks) {
  Object.keys(sdks).forEach((item) => {
    let action = sdks[item];
    if (!(item in ACTIONS_KEY) && !(item in ROUTER_KEY)) {
      app[item] = action;
    }
  });
  return app;
}
mountAPIs(sdk);

function createGlboalApi() {
  // 使用模拟的createWebApp替代真实的云开发SDK调用
  const webApp = mockCreateWebApp();
  const globalAPI = new Proxy(
    Object.assign(webApp, {
      dataset: {},
      // 添加本地开发所需的模拟方法
      showLoading: ({}) => console.log('Mock: showLoading'),
      hideLoading: () => console.log('Mock: hideLoading'),
      utils: {
        ...webApp.utils,
        // 添加模拟工具方法
        formatDate: (date) => new Date(date).toLocaleString(),
        toast: (msg) => console.log('Mock Toast:', msg)
      },
    }),
    {
      get: (obj, prop) => {
        if (prop === "app" || prop === "$app") {
          return app;
        } else {
          // 对未定义的属性返回模拟函数，避免运行时错误
          if (obj[prop] === undefined) {
            return (...args) => {
              console.log(`Mock API called: ${String(prop)}`, args);
              return Promise.resolve({});
            };
          }
          return obj[prop];
        }
      },
    }
  );
  _injectApp2Runtime(globalAPI);

  return globalAPI;
}

function _injectApp2Runtime(globalAPI, hard = false) {
  runtime.app = hard ? globalAPI : runtime.app || globalAPI;
  runtime.$app = new Proxy(runtime.app, {
    get(obj, prop) {
      return obj ? obj[prop] : undefined;
    },
    set(obj, prop, value) {
      if (obj) {
        return (obj[prop] = value);
      } else {
        return undefined;
      }
    },
  });

  runtime.$w = new Proxy($w || globalAPI?.__internal__?.$w || {}, {
    get(_, prop: string) {
      const $page = runtime.app?.__internal__?.activePage || runtime.$page;

      if ($page?.__internal__?.$w?.[prop]) {
        return $page.__internal__.$w[prop];
      }

      if (_[prop]) {
        return _[prop];
      }

      return null;
    },
  });
}

export function createPageApi(): any {
  const $page = new Proxy(
    {
      __internal__: {
        active: false,
      },
      state: {},
      computed: {},
      handler: {},
      widgets: {},
      dataset: {},
      _dataBinds: {},
    },
    {
      get(obj, prop) {
        return prop === "$page" ? obj : obj[prop];
      },
    }
  );
  return $page;
}

// 本地开发模式下的配置
setConfig({
  isProd: false,  // 设为开发环境
  /** 低码应用ID */
  appID: "weda",
  /** 模拟环境ID */
  envID: "local-dev",
  /** 模拟应用端ID */
  tcbClientId: "local-dev",
  /** 数据源描述对象数组 */
  dataSourceProfiles: [],
  /**
   * 新的dataset变量配置对象
   * key 为页面ID(全局为$global), val 为变量配置数组
   */
  datasetProfiles: {
    $global: {
      state: {},
      params: {},
    },
    home: {
      state: {},
    },
  },
  tcbApiOrigin: "",
  gatewayOrigin: "",
  isPrivate: false,
  beforeDSRequest: (cfg) => {
    if (!cfg.options || !cfg.options.showLoading) return;
    if (app?.showLoading) {
      app.showLoading({});
    }
  },
});
