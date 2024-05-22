export const query_generator = (q: Record<string, any>) => {
  let query = "?";

  for (const property in q) {
    query += `${property}=${q[property]}&`;
  }
  return query.substring(0, query.length - 1);
};
export const clean = (obj: Record<string, any>) => {
  for (const propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj;
};
