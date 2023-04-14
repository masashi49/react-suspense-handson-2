// const dataMap: Map<string, unknown> = new Map();

// export function useData<T>(cacheKey: string, fetch: () => Promise<T>): T {
//   const cachedData = dataMap.get(cacheKey) as T | undefined;
//   if (cachedData === undefined) {
//     throw fetch().then((d) => dataMap.set(cacheKey, d));
//   }
//   return cachedData;
// }

type LoadableState<T> =
  | {
      status: "pending";
      promise: Promise<T>;
    }
  | {
      status: "fulfilled";
      data: T;
    }
  | {
      status: "rejected";
      error: unknown;
    };

export class Loadable<T> {
  #state: LoadableState<T>;
  constructor(promise: Promise<T>) {
    this.#state = {
      status: "pending",
      promise: promise.then(
        (data) => {
          this.#state = {
            status: "fulfilled",
            data,
          };
          return data;
        },
        (error) => {
          this.#state = {
            status: "rejected",
            error,
          };
          throw error;
        }
      ),
    };
  }

  static newAndGetPromise<T>(promise: Promise<T>): [Loadable<T>, Promise<T>] {
    const result = new Loadable(promise);
    if (result.#state.status !== "pending") {
      throw new Error("Unreachable");
    }
    return [result, result.#state.promise];
  }

  getOrThrow(): T {
    switch (this.#state.status) {
      case "pending":
        throw this.#state.promise;
      case "fulfilled":
        return this.#state.data;
      case "rejected":
        throw this.#state.error;
    }
  }
}

const dataMap: Map<string, Loadable<unknown>> = new Map();

export function useData<T>(cacheKey: string, fetch: () => Promise<T>): T {
  const cachedData = dataMap.get(cacheKey) as Loadable<T> | undefined;
  if (cachedData === undefined) {
    const [loadable, promise] = Loadable.newAndGetPromise(fetch());
    dataMap.set(cacheKey, loadable);
    throw promise;
  }
  return cachedData.getOrThrow();
}
