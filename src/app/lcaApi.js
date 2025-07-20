// using this file for mocking API calls (Because i don't have apis to test)

export const fetchLCAData = () =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          originalLCA: 150,
          optimizedLCA: 120,
          reason:
            "Replaced foam type X with foam type Y, reducing material emissions",
        }),
      5000
    )
  );

export const submitReviewDecision = (status) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      Math.random() > 0.2 ? resolve() : reject();
    }, 800)
  );
