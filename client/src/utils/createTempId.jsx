export const createTempId = () =>
  `temp-${Date.now()}-${Math.random().toString(36).slice(2)}`;
