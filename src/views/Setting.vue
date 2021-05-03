<template lang="pug">
.view-setting
  SettingItem(label='外观')
    SettingOption(title='外观')
    SettingOption(title='强调色')
    SettingOption(title='高亮显示颜色')
  SettingItem(label='布局')
    SettingOption(title='布局选择')
    SettingOption(title='导航栏设置')
    SettingOption(title='模块禁用')
  SettingItem(label='功能')
    SettingOption(title='歌词')
      SettingOption(title='歌词翻译')
      SettingOption(title='歌词动态背景')
    SettingOption(title='自动缓存歌曲')
    SettingOption(title='语言')
  SettingItem(label='通知')
    SettingOption(title='歌曲更改时')
    SettingOption(title='收到新的消息通知时')
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// import SettingItem from '@/components/SettingItem.vue';
// import SettingOption from '@/components/SettingOption.vue';

@Component({
  components: {
    // SettingItem,
    // SettingOption,
  },
})
export default class Setting extends Vue {}
</script>

<style lang="scss" scoped>
@include b(setting, options) {
  display: flex;
}
</style>
