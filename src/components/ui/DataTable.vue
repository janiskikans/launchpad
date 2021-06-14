<template>
  <div class="datatable">
    <table>
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index">
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td v-for="(column, index) in headers" :key="index">
            <better-link
              v-if="isLinkType(column.type)"
              :href="item[column.value]"
              :text="item[column.value]"
              is-external
              has-simple-style
            />
            <span v-else>{{ item[column.value] }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="datatable__footer space-x-2">
      <button @click="onPreviousClick">
        <ion-icon name="arrow-back-outline" class="text-xl" />
      </button>
      <button @click="onNextClick">
        <ion-icon name="arrow-forward-outline" class="text-xl" />
      </button>
    </div>
  </div>
</template>

<script>
import BetterLink from '@components/utils/BetterLink';
import { DATA_TYPE_LINK } from '@helpers/dataTableHelper';

export default {
  name: 'DataTable',

  components: {
    BetterLink,
  },

  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },

  methods: {
    onNextClick() {
      this.$emit('on-next');
    },

    onPreviousClick() {
      this.$emit('on-previous');
    },

    /**
     * @param {string} type
     * @return {boolean}
     */
    isLinkType(type) {
      return type && type === DATA_TYPE_LINK;
    },
  },
};
</script>

<style lang="scss" scoped>
.datatable {
  @apply shadow overflow-hidden border-b border-gray-200 rounded-md;

  table {
    @apply table-auto min-w-full divide-y divide-gray-200;
  }

  thead {
    @apply bg-gray-50;
  }

  th {
    @apply px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider;
  }

  tbody {
    @apply bg-white divide-y divide-gray-200;
  }

  td {
    @apply px-6 py-4 text-gray-600 text-sm;
  }

  &__footer {
    @apply bg-gray-50 text-gray-600 px-4 py-2 border-t border-gray-200;
  }
}
</style>
