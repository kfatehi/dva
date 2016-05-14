export default function uuid() {
  let r = (s) => {
    let p = (Math.random().toString(16)+"000000000").substr(2,8);
    return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p;
  };
  return r() + r(1) + r(1) + r();
};
