import { ref, reactive, watch } from "vue";
import { getSearch } from "@/apis";

export default function useSearch() {
  const keyword = ref('');
  const result = reactive({

  })

  const fetchSearchResult = () => {
    getSearch(keyword.value)
  }

  watch(keyword, fetchSearchResult)

  return {
    keyword,
    result
  }
}