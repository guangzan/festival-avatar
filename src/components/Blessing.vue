<script setup>
import { ref } from 'vue'
const show = ref(true)
</script>

<template>
  <van-dialog
    v-model:show="show"
    title="Hi，国庆节快乐"
    theme="round-button"
    confirmButtonText="好"
  >
    <div class="blessing">
      <ol>
        <li>👀 上传头像</li>
        <li>🎨 选择一个模板</li>
        <li>🎉 保存新头像</li>
      </ol>
      <p>——来自 <a href="https://www.cnblogs.com/guangzan/">@guangzan</a></p>
    </div>
  </van-dialog>
</template>

<style lang="scss">
.blessing {
  padding: 20px;
  h4 {
    margin-bottom: 16px;
  }
  p {
    margin: 4px 0;
    font-size: 12px;
    color: #666;
    text-align: right;
  }
  ol {
    margin-left: 20px;
    list-style: auto;
    li {
      margin-bottom: 4px;
    }
  }
  a {
    color: #b8251b;
  }
}
</style>
