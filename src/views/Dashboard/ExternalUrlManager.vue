<template>
  <div class="space-y-4">
    <div class="bg-white shadow rounded-md p-4">
      <button @click="showAddLinkModal">Add Link</button>
    </div>

    <data-table
      v-if="urls.length"
      :headers="tableHeaders"
      :items="urls"
      @on-next="onNextPage"
      @on-previous="onPreviousPage"
    />

    <modal v-if="isAddLinkModalVisible" @close-modal="isAddLinkModalVisible = false">
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
    AddLinkForm: () => import('@components/dashboard/addLinkForm'),
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

    onNewLinkAdded() {
      this.isAddLinkModalVisible = false;
      this.loadData();
    },
  },
};
</script>
