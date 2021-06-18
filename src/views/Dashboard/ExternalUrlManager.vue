<template>
  <div>
    <div class="shadow rounded-md mb-4">
      <button
        class="text-white bg-gray-500 hover:bg-gray-400 py-1.5 px-2.5 rounded-md cursor-pointer focus:outline-none"
        @click="showAddLinkModal"
      >
        Add Link
      </button>
    </div>

    <data-table
      v-if="urls.length"
      :headers="tableHeaders"
      :items="urls"
      @on-next="onNextPage"
      @on-previous="onPreviousPage"
    />

    <modal v-if="isAddLinkModalVisible" @close-modal="closeAddLinkModal">
      <template v-slot:header>
        <span class="text-xl">Add a New Link</span>
      </template>
      <template v-slot:body>
        <add-link-form @on-link-added="onNewLinkAdded" />
      </template>
    </modal>
  </div>
</template>

<script>
import { getUrls } from '@api/launchpadApi/urlApi';
import DataTable from '@components/ui/DataTable';
import { DATA_TYPE_LINK } from '@helpers/dataTableHelper';
import axios from 'axios';

export default {
  name: 'ExternalUrlManager',

  components: {
    DataTable,
    Modal: () => import('@components/ui/Modal'),
    AddLinkForm: () => import('@components/dashboard/AddLinkForm'),
  },

  data() {
    return {
      urls: [],
      paginationUrls: [],
      tableHeaders: [
        { text: 'ID', value: 'id' },
        { text: 'Launch ID', value: 'launch_id' },
        { text: 'Type', value: 'type' },
        { text: 'Title', value: 'title' },
        { text: 'Link', value: 'url', type: DATA_TYPE_LINK },
      ],
      isAddLinkModalVisible: false,
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    loadData() {
      getUrls().then(response => {
        this.urls = response.data.data;
        this.paginationUrls = response.data.links;
      });
    },

    onNextPage() {
      if (!this.paginationUrls.next) {
        return;
      }

      axios.get(this.paginationUrls.next).then(response => {
        this.urls = response.data.data;
        this.paginationUrls = response.data.links;
      });
    },

    onPreviousPage() {
      if (!this.paginationUrls.prev) {
        return;
      }

      axios.get(this.paginationUrls.prev).then(response => {
        this.urls = response.data.data;
        this.paginationUrls = response.data.links;
      });
    },

    showAddLinkModal() {
      this.isAddLinkModalVisible = true;
    },

    closeAddLinkModal() {
      this.isAddLinkModalVisible = false;
    },

    onNewLinkAdded() {
      this.isAddLinkModalVisible = false;
      this.loadData();
    },
  },
};
</script>
