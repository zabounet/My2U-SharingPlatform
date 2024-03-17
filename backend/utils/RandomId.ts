// Just for fun
const uniqid = () => {
  const first = (Date.now() + Math.random()) * Math.random();
  const sec = (first / 0o32343 + Math.random()) * 0x3e2433;
  const final = sec.toString(16).replace(/\./g, "").padEnd(10, Math.random().toString(16).replace(/\./g, ""));
  return final
};
export default uniqid;
