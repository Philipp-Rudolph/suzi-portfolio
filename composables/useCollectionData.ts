import { computed } from 'vue';
import type { Collections } from '@nuxt/content';

export async function useCollectionData(
  collectionName: keyof Collections
) {
  const { data } = await useAsyncData(collectionName, () =>
    queryCollection(collectionName).all()
  );

  const collectionData = computed(() => {
    const items = data.value;

    if (!items || items.length === 0) {
      console.warn(`useCollectionData: ${collectionName} has no entries.`);
      return null;
    }

    if (items.length > 1) {
      return items;
    }

    return items[0];
  });

  return {
    data: collectionData,
    raw: data,
  };
}
