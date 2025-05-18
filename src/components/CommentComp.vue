<script setup lang="ts">
import { computed, ref } from 'vue';
import ButtonComp from './ButtonComp.vue';
import { decodeHTMLEntities } from '@/utitity/misc';

export type RedditCommentType = {
  data: {
    author: string;
    author_flair_type: string;
    body: string;
    body_html?: string;
    replies: {
      data: {
        children: RedditCommentType[]
      }
    } | "";
    id: string;
  }
}

const showChildNode = ref(false);


const body_html = computed(() => {
  return decodeHTMLEntities(props.data.body_html || "");
})


const props = defineProps<RedditCommentType>();

</script>

<template>

  <div class="commentBox">
    <span class="authorName">{{ data.author }}</span>
    <template v-if="data.author_flair_type === 'richtext' || data.body_html">
      <div class="comment" v-html="body_html"></div>
    </template>
    <div v-else-if="data.author_flair_type === 'text'" class="comment">
      {{ props.data.body }}
    </div>
    <template v-if="data.replies">
      <ButtonComp @handleClick="showChildNode = !showChildNode" charButton>{{showChildNode ? '-' : '+'}}</ButtonComp>
    </template>
    <template v-if="showChildNode && data.replies">
      <CommentComp v-for="post in data.replies.data.children" :data="post.data" :key="post.data.id"></CommentComp>
    </template>

  </div>

</template>

<style>
.comment {
  color: #333;
  max-width: 800px;
  border-radius: 5px;
  text-wrap: wrap;
  background-color: #f4f4f4;
  padding: 5px;
  margin: 10px auto;
}

.commentBox {
  border: 1px solid #3333334b;
  margin: 20px;
  padding: 10px;
  border-radius: 5px;
  background-color: #fefefe;

}

.comment>.md>blockquote {
  border-left: 20px solid #ddd;
}

.comment pre {
  overflow-x: scroll;
  padding: 10px;
  background-color: #ddd;
  border-radius: 5px;
}

.authorName {
  color: #000;
  font-weight: bold;
}
</style>