// eslint-disable-next-line no-unused-vars
  let $private = {
    setSession: function (n, e) {
      sessionStorage.setItem('n', n);
      sessionStorage.setItem('e', e);
    }
    , getSession: function () {
      let n = sessionStorage.getItem('n');
      let e = sessionStorage.getItem('e');
      return {n, e}
    }
  };
