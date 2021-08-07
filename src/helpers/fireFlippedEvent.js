const createCustomEvent = (eventName, additionalData) => {
  if (window) {
    return new CustomEvent(eventName, {
      detail: { additionalData },
    });
  }
  return null;
};

export default function fireFlipEvent(additionalData) {
  const flipEvent = createCustomEvent("flipped", {
    ...additionalData,
  });
  document.dispatchEvent(flipEvent);
}
