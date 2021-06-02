// NodeJS.Timeout(노드환경), number(브라우저)를 쓰게되면 플랫폼 종속적이게 됨.
// ReturnType<typeof setTimeout>을 쓰면 브라우저, 노드 두 곳에서 작동할 것으로 예상

const debounce = (callback: Function, ms = 1000) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(null, args);
    }, ms);
  };
};

export default debounce;
