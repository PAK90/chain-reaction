const createCustomEvent = (eventName, additionalData) => {
  if (window) {
    return new CustomEvent(eventName, {
      detail: { additionalData },
    });
  }
  return null;
};

export default function fireFlipEvent(name, additionalData) {
  const flipEvent = createCustomEvent(name, {
    ...additionalData,
  });
  document.dispatchEvent(flipEvent);
}
