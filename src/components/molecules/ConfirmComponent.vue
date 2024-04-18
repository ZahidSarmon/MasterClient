<template>
  <div class="modal fade" id="modal-confirm">
    <div class="modal-dialog">
      <div :class="'modal-content ' + props.type">
        <div class="modal-header" style="border: 0;">
          <h4 class="modal-title header-title">{{ props.title }}</h4>
        </div>
        <div class="modal-body">
          <div class="row" v-if="props.isSubscription">
            <div class="col">
              <div class="custom-control custom-checkbox">
                <input class="custom-control-input" type="checkbox" id="subsDeleteId" v-model="data.isSubsDelete" :checked="false">
                <label for="subsDeleteId" class="custom-control-label" style="cursor: pointer;">{{ props.subscriptionDeleteTitle }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer" style="border: 0;">
          <button type="button" 
            style="min-width: 3.5rem;" class="btn btn-sm bg-gradient-danger" data-dismiss="modal" @click="close()">
            <i class="fas fa-times"></i> {{ $t('no') }}
          </button>
          <button type="button" style="min-width: 3.5rem;" class="btn btn-sm bg-gradient-success" @click="$emit('yes',data)">
            <i class="fas fa-check"></i> {{ $t('yes') }}
          </button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import modal from '../common/modalManage';

export default defineComponent({
  props: ['title', 'type','isSubscription','subscriptionDeleteTitle'],
  emits: ['yes', 'no'],
  setup(props, ctx) {

    const data = ref({
      isSubsDelete:false
    });

    function close() {
      modal.Close('modal-confirm');
    } 
    return {
      props, ctx, close,data
    }
  },
});

</script>

<style>
.header-title {
  font-size: larger;
  font-weight: 400;
}
</style>