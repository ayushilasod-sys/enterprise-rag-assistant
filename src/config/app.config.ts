export default () => ({
  topK: Number(process.env.TOP_K ?? 5),
  chunkSize: Number(process.env.CHUNK_SIZE ?? 100),

  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    chatModel: process.env.OPENAI_CHAT_MODEL,
    embeddingModel: process.env.OPENAI_EMBEDDING_MODEL,
  },

  pinecone: {
    apiKey: process.env.PINECONE_API_KEY,
    index: process.env.PINECONE_INDEX,
  },
});
