const createEventEmitter = () => {
  let listeners = [];

  return {
    on: (name, listener) => {
      listeners.push({ name, listener });
    },
    emit: (name, data) => {
      listeners.filter(listener => listener.name === name).forEach(({ listener }) => listener(data));
    }
  };
};

export default createEventEmitter;
