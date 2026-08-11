import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'

import ReloadPrompt from './components/ReloadPrompt.vue'

export default {
    extends: DefaultTheme,
    Layout: () => h(DefaultTheme.Layout, null, {
        'layout-bottom': () => h(ReloadPrompt),
    }),
} satisfies Theme
