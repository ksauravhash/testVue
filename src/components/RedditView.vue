<script setup lang="ts">
import { computed, ref } from 'vue';
import CommentComp, { type RedditCommentType } from './CommentComp.vue';
import { decodeHTMLEntities } from '@/utitity/misc';
import ButtonComp from './ButtonComp.vue';


type RedditDataType = [{
  data: {
    children: [{
      data: {

        title: string;
        selftext: string;
        selftext_html?: string;
      }
    }]
  }
}, {
  data: {
    children: RedditCommentType[]
  }
}]

const loading = ref(false);
const redditURL = ref(null);
const redditData = ref<RedditDataType | null>(null);
const error = ref<string | null>(null);



async function fetchData() {
  try {
    error.value= null;
    if (redditURL.value) {
      loading.value = true;
      const resp = await fetch(`${redditURL.value}/.json`);
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      const data = await resp.json();
      redditData.value = data;
    } else {
      error.value = "Invalid URL.";
    }
  } catch {
    error.value = 'Some error occured.';
  } finally {
    loading.value = false;
  }
}

const descriptionDOM = computed(() => {
  if (redditData.value) {
    const base = redditData.value[0].data.children[0].data;
    if (base.selftext_html)
      return decodeHTMLEntities(base.selftext_html);
  }

  return "";
})

</script>

<template>
  <h2>Reddit post</h2>
  <div class="inputBox">
    <input class="input" v-model="redditURL" type="text" />
    <ButtonComp @handleClick="fetchData">Load</ButtonComp>
  </div>
  <div v-if="loading" class="loading">Loading...</div>
  <template v-else>
    <p v-if="error || !redditData" class="error">{{ error }}</p>
    <div class="redditContainer" v-else>
      <h3>{{ redditData[0].data.children[0].data.title }}</h3>

      <div v-html="descriptionDOM" v-if="descriptionDOM"></div>
      <div v-else>{{ redditData?.[0].data.children[0].data.selftext }}</div>
      <hr/>
      <div class="commentsContainer">
        <CommentComp v-for="item of redditData[1].data.children" :data="item.data" :key="item.data.id"></CommentComp>
      </div>
    </div>
  </template>
</template>


<style scoped>
.commentsContainer {
  max-width: 800px;
  margin: auto;
}

.redditContainer {
  max-width: 800px;
  margin: auto;
}

.redditContainer>h3 {
  text-align: center;
}

.inputBox {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.input {
  padding: 10px;
  font-size: 1.2em;
  border-radius: 5px;
  border: 1px solid #333;
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.loading, .error {
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
}

.error {
  color: red;
}

hr {
border-bottom: none;
color: #eee;
}
</style>