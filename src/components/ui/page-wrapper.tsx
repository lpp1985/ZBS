import * as React from "react";
import querystring from "query-string";

// 完全移除云开发SDK依赖，使用纯本地模拟实现
// 模拟base$W对象
const mockBase$W = {
  app: {
    __internal__: {},
  },
  // 模拟常用API方法
  showLoading: (options = {}) => {
    console.log('Mock $w.showLoading:', options);
  },
  hideLoading: () => {
    console.log('Mock $w.hideLoading');
  },
  showToast: (options = {}) => {
    console.log('Mock $w.showToast:', options);
  },
  // 代理处理未定义的属性
  __proto__: new Proxy({}, {
    get: (_, prop) => {
      console.log(`Mock $w.${String(prop)} called`);
      return () => Promise.resolve({});
    }
  })
};

// 模拟createPageApi函数
const mockCreatePageApi = () => {
  return {
    __internal__: {
      packageName: "",
      $w: mockBase$W,
    },
    id: "",
    uuid: "",
    dataset: null,
  };
};
const mockCreateDataset = (id: string) => {
  return {
    // 模拟数据集的基本功能
    state: {},
    params: {},
    // 模拟方法
    setData: (data: any) => {
      console.log(`Mock dataset setData for ${id}:`, data);
      return Promise.resolve();
    },
    getData: () => {
      console.log(`Mock dataset getData for ${id}`);
      return Promise.resolve({});
    }
  };
};

const mockExtraApi = {
  setParams: (id: string, params: any) => {
    console.log(`Mock EXTRA_API.setParams for ${id}:`, params);
  }
};

export function PageWrapper({
  id,
  Page,
  ...props
}: {
  id: string;
  Page: React.FunctionComponent<{ $w: typeof mockBase$W }>;
}) {
  const $page = React.useMemo(() => {
    const $page = mockCreatePageApi();
    const dataset = mockCreateDataset(id);
    Object.assign($page, {
      __internal__: {
        ...$page.__internal__,
        packageName: "",
        $w: new Proxy(mockBase$W, {
          get(obj, prop: string) {
            /**
             * 使用当前的实例进行覆盖
             */
            if (prop === "$page" || prop === "page") {
              return $page;
            }

            return obj[prop];
          },
        }),
      },
      id,
      uuid: id,
      dataset,
    });

    return $page;
  }, [id]);

  const pageCodeContextRef = React.useRef($page);
  pageCodeContextRef.current = $page;

  React.useEffect(() => {
    const query =
      querystring.parse((location.search || "").split("?")[1] || "") || {};

    mockExtraApi.setParams(id, query || {});
    if (mockBase$W.app && mockBase$W.app.__internal__) {
      mockBase$W.app.__internal__.activePage = pageCodeContextRef.current;
    }
    return () => {
      if (pageCodeContextRef.current.__internal__) {
        pageCodeContextRef.current.__internal__.active = false;
      }
    };
  }, [id]);

  return <Page {...props} $w={$page.__internal__.$w || mockBase$W} />;
}
