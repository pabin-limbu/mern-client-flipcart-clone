export default (query) => {
  if (query) {
    const queryString = query.split("?")[1];
    if (queryString.length > 0) {
      const params = queryString.split("&");
      const paramsObject = {};
      params.forEach((param) => {
        const keyValue = param.split("=");
        paramsObject[keyValue[0]] = keyValue[1]; // obj.property is done for static value but obj[property[0]] is done for dynamic value.
      });
      return paramsObject;
    }
  } else {
    const paramsObject = {};
    return paramsObject;
  }
};
