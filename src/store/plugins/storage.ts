import { isArray } from 'lodash-es';
import { Store } from 'vuex';

interface IStorageConfig<T> {
  model?: string[];
  mutation?: { model?: string; type: string | string[]; key: string; ext: (store: T) => any }[];
}

export default <S>(options: IStorageConfig<S>) =>
  (store: Store<any>) => {
    store.subscribe((mutation, state) => {
      if (options.model) {
        const [model] = options.model.filter((m) => mutation.type.indexOf(`${m}/`) !== -1);

        if (model) localStorage.setItem(model, JSON.stringify(state[model]));
      }

      if (options.mutation) {
        const [match] = options.mutation.filter((m) =>
          isArray(m.type)
            ? m.type.some((t) => mutation.type === (m.model ? `${m.model}/${t}` : t))
            : mutation.type === (m.model ? `${m.model}/${m.type}` : m.type),
        );

        if (match?.key) localStorage.setItem(match.key, JSON.stringify(match.ext(state)));
      }
    });
  };
