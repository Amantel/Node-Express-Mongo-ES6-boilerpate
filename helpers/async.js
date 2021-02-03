exports.to = function to(promise) {
  return promise
    .then((data) => [null, data]).catch((err) => [(err)]);
};

exports.TE = function TE(errorObj, log) { // TE stands for Throw Error
  if (log === true) {
    console.error(errorObj);
  }
  throw new Error(errorObj.error_text);
};

exports.delayAndGetRandom = (ms) => new Promise((resolve) => setTimeout(
  () => {
    const val = Math.trunc(Math.random() * 100);
    resolve(val);
  }, ms
));
