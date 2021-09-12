<template>
  <div class="datatable">
    <table>
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index">
            {{ header.text }}
          </th>
          <th v-if="hasActions"></th>
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
            <span v-else class="capitalize">{{ item[column.value] }}</span>
          </td>
          <td v-if="hasActions">
            <dropdown title="Actions" :items="actions" @on-item-clicked="onActionClicked($event, item.id)" />
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
import { DATA_TYPE_LINK, ACTION_DELETE, ACTION_EDIT } from '@helpers/dataTableHelper';
import Dropdown from '@components/ui/Dropdown';

export default {
  name: 'DataTable',

  components: {
    BetterLink,
    Dropdown,
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
    hasDelete: {
      type: Boolean,
      required: false,
      default: false,
    },
    hasEdit: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      actions: [],
    };
  },

  computed: {
    /**
     * @return {boolean}
     */
    hasActions() {
      return this.hasDelete || this.hasEdit;
    },
  },

  mounted() {
    this.initActions();
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

    initActions() {
      if (this.hasEdit) {
        this.actions.push({ title: 'Edit', value: ACTION_EDIT });
      }

      if (this.hasDelete) {
        this.actions.push({ title: 'Delete', value: ACTION_DELETE });
      }
    },

    /**
     * @param {string} action
     * @param {string} id
     */
    onActionClicked(action, id) {
      if (action === ACTION_EDIT) {
        this.$emit('on-item-edit', id);
      }

      if (action === ACTION_DELETE) {
        this.$emit('on-item-delete', id);
      }
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
