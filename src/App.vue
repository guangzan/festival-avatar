<script setup>
import { ref } from 'vue'
import { Button, Uploader, Toast } from 'vant'
import html2canvas from 'html2canvas'
import { saveAs } from 'file-saver'
import { Icon } from 'vant'
// import downloadjs from 'downloadjs'

import Congratulate from './components/Congratulate.vue'
import Blessing from './components/Blessing.vue'

const base64 = ref('')
const fileList = ref([])
const downloading = ref(false)
const showFireworks = ref(false)
const selectedId = ref('item-1')

const afterRead = file => buildBase64(file.file)
const beforeRead = () => {}

const buildBase64 = file => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    base64.value = reader.result
  }
}

const handleSelect = e => {
  selectedId.value = e.currentTarget.id
  // Toast.success('选择成功')
}

const handleSave = () => {
  if (fileList.value.length === 0) {
    Toast.fail('请先上传头像')
    return
  }

  downloading.value = true

  html2canvas(document.querySelector(`#${selectedId.value}`), {
    scale: 4,
    allowTaint: true,
    dpi: window.devicePixelRatio * 8,
  }).then(canvas => {
    // downloadjs(canvas.toDataURL(), '头像.png', 'image/png')
    saveAs(canvas.toDataURL(), 'image.jpg')

    // const dataUrl = canvas.toDataURL()
    // const a = document.createElement('a')
    // a.download = 'avatar.png'
    // a.href = dataUrl
    // a.click()

    downloading.value = false
    Toast.success('保存成功')

    showFireworks.value = true
    setTimeout(() => {
      showFireworks.value = false
    }, 3000)
  })
}

const handleDelete = () => {
  base64.value = ''
  fileList.value = []
}

const getImageUrl = name => {
  return new URL(`./assets/${name}.png`, import.meta.url).href
}
</script>

<template>
  <Blessing></Blessing>
  <div
    class="uploader-wrap"
    :style="{ marginTop: fileList.length === 0 ? '220px' : '80px' }"
  >
    <Uploader
      v-model="fileList"
      preview-size="120px"
      class="uploader"
      :deletable="true"
      :max-count="1"
      :after-read="afterRead"
      :before-delete="handleDelete"
    />
  </div>

  <div class="preview-list">
    <div
      class="preview-item"
      v-if="fileList.length !== 0"
      v-for="(num, index) in 6"
      :id="`item-${num}`"
      :key="index"
      @click="handleSelect"
    >
      <img
        class="preview-item__img"
        :src="base64"
        alt="avatar"
        v-show="base64 !== ''"
      />
      <img
        class="preview-item__modification"
        :src="getImageUrl(num)"
        alt="avatar"
      />
      <Icon
        name="arrow-down"
        color="#FFD661"
        class="icon-active"
        size="30"
        v-show="selectedId.slice(-1) === (index += 1).toString()"
      />
    </div>
  </div>

  <Button
    v-if="fileList.length !== 0"
    :loading="downloading"
    @click="handleSave"
    type="primary"
    loading-text="保存中..."
    block
    color="#FA9935"
    >保存</Button
  >

  <Congratulate v-show="showFireworks"></Congratulate>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

img {
  border: none;
  outline: none;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

body {
  background-image: url('./assets/bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

#app {
  padding: 0 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.uploader-wrap {
  display: flex;
  justify-content: center;
  transition: 0.3s margin;
}

.van-uploader__preview {
  margin: 0;
  border: 4px solid #fff;
  border-radius: 6px;
}

#item-1,
#item-6 {
  border-radius: 6px;
  img {
    border: 4px solid #fff;
    border-radius: 6px;
  }
}

.preview-list {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  row-gap: 26px;
  column-gap: 8px;
  margin: 40px 0 60px;
}

.preview-item {
  justify-self: center;
  position: relative;
  width: 100px;
  height: 100px;
  background-color: #fff;
  img {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .icon-active {
    position: absolute;
    top: -28px;
    left: 33px;
  }
}
</style>
