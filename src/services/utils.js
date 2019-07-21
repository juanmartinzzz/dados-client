/**
 * Takes object of get parameters, returns string ready to append to end of URL
 */
const serializeParams = queryParameters => {
  const parameters = Object.entries(queryParameters).reduce(
    (accumulator, [key, parameter]) => {
      if (parameter !== undefined) accumulator[key] = parameter;
      return accumulator;
    },
    {}
  );

  let keys = Object.keys(parameters);
  keys.sort();

  if (keys.length > 0) {
    return (
      "?" +
      keys
        .reduce((accumulator, key) => {
          accumulator.push(
            `${key}=${encodeURIComponent(queryParameters[key])}`
          );
          return accumulator;
        }, [])
        .join("&")
    );
  } else {
    return "";
  }
};

export const getRequestUrl = (path, queryParameters) => {
  return `${process.env.REACT_APP_API_URL}${path}${serializeParams(
    queryParameters
  )}`;
};
