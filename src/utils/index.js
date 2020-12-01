//数值转化函数
export function convart(num, keep) {
  const size = ["", "万", "亿", "万亿"];
  let count = 0;
  return (function handle() {
    num = num / 10000;
    if (num >= 1) {
      count++;
      return handle();
    } else {
      return `${(num * 10000).toFixed(keep)} ${size[count]}`;
    }
  })();
}

//图片懒加载
export function lazyLoad(targetClassName) {
  const lazyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        entry.target.classList.remove("lazy-image");
        entry.target.src = entry.target.dataset.src;
        lazyObserver.unobserve(entry.target);
      }
    });
  });
  document.querySelectorAll(targetClassName).forEach(ele => {
    lazyObserver.observe(ele);
  });
}

//防抖函数
//触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
export function debounce(fn, wait) {
  let timer;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      //使用apply将this指向调用者, 否则会指向window
      fn.apply(this, args);
      timer = null;
    }, wait);
  };
}

//节流函数
//高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率
export function throttle(fn, wait) {
  let timer;
  return function(...args) {
    if (timer) return;
    timer = setTimeout(() => {
      //使用apply将this指向调用者, 否则会指向window
      fn.apply(this, args);
      timer = null;
    }, wait);
  };
}

//设置localstorage
export const setLocalStorage = (key, value) => {
  return localStorage.setItem(key, value);
};
//获取localstorage
export const getLocalStorage = key => {
  return localStorage.getItem(key);
};
//移除localstorage
export const removeLocalStorage = key => {
  return localStorage.removeItem(key);
};
//清除所有localstorage
export const removeAll = () => localStorage.clear();

//数组切片
export function arrSlice(arr, length) {
  const newArr = [];
  for (let i = 0; i <= arr.length - 1; i += length) {
    newArr.push(arr.slice(i, i + length));
  }
  return newArr;
}
